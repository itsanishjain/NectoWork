from django.db import models
from django.conf import settings
from django.contrib.auth.models import AbstractUser
# Create your models here.

choices = (('sp','sp'),('bp','bp'))

class User(AbstractUser):
    avatar = models.FileField(upload_to='profile',blank=True,null=True)
    email = models.EmailField(null=True,blank=True)
    phone = models.CharField(max_length=12,null=True,blank=True)
    country_code = models.CharField(max_length=5,null=True,blank=True)
    otp = models.CharField(max_length=6,null=True,blank=True)
    otp_token = models.CharField(max_length=256,null=True,blank=True)
    is_verified = models.BooleanField(default=False,help_text = "Designates whether the user has completed verification or not.")
    type = models.CharField(choices=choices,max_length=10,default='bp')
    
    def __str__(self):
        return self.username


class Company(models.Model):
    name = models.CharField(max_length=100,null=True,blank=True)
    social = models.TextField(null=True,blank=True)
    location = models.CharField(max_length=100,null=True,blank=True)
    logo = models.FileField(upload_to='company',blank=True,null=True)

    def __str__(self):
        return self.name


class Billing(models.Model):
    user = models.OneToOneField(settings.AUTH_USER_MODEL,on_delete=models.CASCADE,blank=True,null=True)
    gst_no = models.CharField(max_length=100,null=True,blank=True)
    account_no = models.CharField(max_length=100,null=True,blank=True)
    ifsc_code = models.CharField(max_length=100,null=True,blank=True)
    bank_name = models.CharField(max_length=100,null=True,blank=True)
    def __str__(self):
        return self.user.username


class ServiceProvider(models.Model):
    user = models.OneToOneField(settings.AUTH_USER_MODEL,on_delete=models.CASCADE,null=True,blank=True,related_name="service_provider")
    about = models.TextField(null=True,blank=True)
    company = models.ForeignKey(Company,on_delete=models.CASCADE,null=True,blank=True)
    billing = models.ForeignKey(Billing,on_delete=models.CASCADE,null=True,blank=True)

    def __str__(self):
        return f"Service Provider {self.user.username}"






