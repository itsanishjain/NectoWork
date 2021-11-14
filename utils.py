import uuid
from twilio.base import domain;
from twilio.rest import Client
from django.template.loader import render_to_string
from django.utils.html import strip_tags
from django.core.mail import send_mail
from datetime import datetime
from django.utils.dateparse import parse_date

from django.contrib.auth.tokens import PasswordResetTokenGenerator
import six
from django.conf import settings
import pyotp
import re   
import os
import threading
from dotenv import load_dotenv

load_dotenv()

class TokenGenerator(PasswordResetTokenGenerator):
    def _make_hash_value(self, user, timestamp):
        return (
            six.text_type(user.pk) + six.text_type(timestamp) +
            six.text_type(user.is_active)
        )


# For sending Email in different Thread
class EmailThreading(threading.Thread):
    def __init__(self,subject,plain_message,EMAIL_HOST_USER,recipient_mail,message):
        self.subject = subject
        self.plain_message = plain_message
        self.EMAIL_HOST_USER = EMAIL_HOST_USER
        self.recipient_mail = recipient_mail
        self.message = message
        threading.Thread.__init__(self)
    
    def run(self):
        send_mail(self.subject,self.plain_message,self.EMAIL_HOST_USER,[self.recipient_mail],html_message=self.message)


class SmsThreading(threading.Thread):
    def __init__(self,phone_number,OTP,reset_password_link):
        self.phone_number = phone_number
        self.OTP = OTP
        self.reset_password_link = reset_password_link

    def run(self):
        client = Client(os.getenv('TWILIO_ACCOUNT_SID'), os.getenv('TWILIO_AUTH_TOKEN'))
        if self.OTP:
            message = client.messages.create(body=f'Your Phone verification OTP is:{self.OTP} ', from_=os.environ['FROM_'], to=self.phone_number)
        else:
            message = client.messages.create(body=f"Reset your {os.environ['APP_NAME']} password {self.reset_password_link} ", from_=os.environ['FROM_'], to=self.phone_number)


def generate_invite_code():
    code = str(uuid.uuid4()).replace("-","")[:12]
    return code


# set the time for OTP Token Expire in secs
otp_expires_in = int(os.environ['OTP_EXPIERS']) 

def generate_otp():
    secret = pyotp.random_base32()
    totp = pyotp.TOTP(secret, interval=otp_expires_in)
    OTP = totp.now()
    return {"OTP": OTP, "OTP_TOKEN": secret}



def verify_otp(otp,otp_token):
    totp = pyotp.TOTP(otp_token, interval=otp_expires_in)
    verify = totp.verify(otp)
    return verify


def is_mail(username):
    email_regex = '^[a-z0-9]+[\._]?[a-z0-9]+[@]\w+[.]\w{2,3}$'  
    if(re.search(email_regex,username)):   
        return True
    else:
        return False


def drop_mail(subject,template_name,recipient_mail, OTP=None,user=None,uid=None,token=None,domain=None):
    context = {'user': user, 'OTP': OTP,'domain':os.environ['APP_NAME']}
    if uid and token and domain:
        context['uid'] = uid
        context['token'] = token
        context['domain'] = domain

    message = render_to_string(template_name, context)
    try:
        plain_message = strip_tags(message)
        # send_mail(subject, plain_message, settings.EMAIL_HOST_USER,
        #           [recipient_mail], html_message=message)
        EmailThreading(subject,plain_message,settings.EMAIL_HOST_USER,recipient_mail,message).start()        
        return True
        
    except Exception as e:
        return False


# For sending SMS OTP
def send_sms(phone_number,OTP=None,reset_password_link=None):
    try:
        if OTP:
            SmsThreading(phone_number,OTP,None).run()
            return True
        elif reset_password_link:
            SmsThreading(phone_number,None,reset_password_link).run()
            return True
    except Exception as e:
        print(phone_number)
        print("ERROR IN SENDING SMS",e)
        return False








