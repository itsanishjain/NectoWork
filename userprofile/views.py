from django.http import request
from rest_framework import response, status
from rest_framework import permissions
from rest_framework.decorators import authentication_classes, permission_classes
from rest_framework.response import Response
from rest_framework import generics
from rest_framework.permissions import IsAuthenticated

from knox.models import AuthToken
from knox.auth import TokenAuthentication
from .models import ServiceProvider, User
from .serializers import UserSerializer, ComapanySerializer, ServiceProviderSerializer,RegisterSerializer, LoginSerializer

from django.utils.http import urlsafe_base64_encode, urlsafe_base64_decode
from django.utils.encoding import force_bytes, force_text
from utils import verify_otp, TokenGenerator, is_mail, drop_mail, send_sms

# import django render
from django.shortcuts import render

import os
from dotenv import load_dotenv

load_dotenv()
account_token = TokenGenerator()


def home(request):
    return render(request,"activation.html",{"OTP":"123456"})



class GetUserView(generics.GenericAPIView):
    #add permission is auth and auth to be authtoken
    permission_classes = [IsAuthenticated]
    authentication_classes = [TokenAuthentication]
    
    # queryset = User.objects.get(user=request.user)
    # serializer_class = UserSerializer

    def get(self,request):
        serializer = UserSerializer(request.user)
        return Response(serializer.data)


class RegisterDetail(generics.GenericAPIView):
    serializer_class = RegisterSerializer

    def post(self, request, *args, **kwargs):
        print(request.data)
        email_user = User.objects.filter(email=request.data['email']).first()
        phone_user = User.objects.filter(phone=request.data['phone']).first()
        if (email_user and not email_user.is_superuser) or phone_user:
            return response.Response(
                {"message": "User with that email or phone number already exists"},
                status=status.HTTP_400_BAD_REQUEST)
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.save()
        try:
            invite = kwargs['invite']
            invitee_user = User.objects.filter(invite_code=invite).first()
            if invitee_user:
                user.invited_by = invitee_user
                user.save()
        except Exception as e:
            print(e, "NOT INVITED")
        return Response(
            {
                "user": RegisterSerializer(user, context=self.get_serializer_context()).data,
                "token": AuthToken.objects.create(user)[1],
            }
        )


class LoginDetail(generics.GenericAPIView):
    serializer_class = LoginSerializer

    def post(self, request, *args, **kwargs):
        print(request.data)
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.validated_data
        return Response(
            {
                "user": UserSerializer(user, context=self.get_serializer_context()).data,
                "token": AuthToken.objects.create(user)[1]
            }
        )


class VerifyOTP(generics.GenericAPIView):
    serializer_class = RegisterSerializer

    def post(self, request):
        user = User.objects.filter(otp=request.data['otp']).first()
        if user:
            otp = user.otp
            otp_token = user.otp_token
            if verify_otp(otp, otp_token):
                user.is_verified = True
                user.save()
                return Response(
                    {
                        "user": UserSerializer(user, context=self.get_serializer_context()).data,
                        "token": AuthToken.objects.create(user)[1],
                    }
                )

        return Response(
            {"message": "Invalid OTP"},
            status=status.HTTP_401_UNAUTHORIZED)


class ForgetPassword(generics.GenericAPIView):
    def post(self, request):
        user = User.objects.filter(username=request.data['username']).first()
        if user:
            uid = urlsafe_base64_encode(force_bytes(user.pk))
            forget_password_token = account_token.make_token(user)
            if is_mail(user.username):
                drop_mail(f"Reset your {os.environ['APP_NAME']} password", 'forget_password.html',
                          user, uid=uid, token=forget_password_token, domain=os.environ['FRONTEND_URL'])
            else:
                print("NOT EMAIL THEN SEND SMS")
                reset_password_link = f'{os.environ["FRONTEND_URL"]}/{uid}{forget_password_token}'
                send_sms(f'{user.country_code}{user.phone}',
                         reset_password_link=reset_password_link)
            return response.Response("DONE")

        else:
            return response.Response({"message": "no user found"}, status=status.HTTP_400_BAD_REQUEST)


class VerifyForgetPasswordToken(generics.GenericAPIView):
    def post(self, request, *args, **kwargs):
        uid = kwargs['uid']
        token = kwargs['token']
        new_password = request.data['password']

        uid = force_text(urlsafe_base64_decode(uid))
        user = User.objects.get(id=uid)
        if user and account_token.check_token(user, token):
            print("VerifyForgetPasswordToken: post PASSWORD CHANGED")
            user.set_password(new_password)
            user.save()
        else:
            print("VerifyForgetPasswordToken: post PASSWORD NOT CHANGED")
            return response.Response({"message": "invalid link"}, status=status.HTTP_400_BAD_REQUEST)
        return response.Response("DONE")






class CompanyView(generics.ListCreateAPIView):
    queryset = ServiceProvider.objects.all()
    serializer_class = ComapanySerializer


class ServiceProviderView(generics.GenericAPIView):
    permission_classes = [IsAuthenticated]
    authentication_classes = [TokenAuthentication]

    def post(self,request,*args,**kwargs):
        print(request.data)
        return Response("Hi")



