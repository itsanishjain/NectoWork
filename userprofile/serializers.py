from rest_framework import serializers
from .models import Billing, Company, ServiceProvider, User
from utils import generate_otp, is_mail, drop_mail, send_sms



class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = "__all__"



class RegisterSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = "__all__"

    def create(self, validated_data):
        user = User.objects.create_user(validated_data['username'], password=validated_data['password'])

        otp = generate_otp()
        user.otp = otp['OTP']
        user.otp_token = otp['OTP_TOKEN']

        user.first_name = validated_data['first_name']
        user.last_name = validated_data['last_name']
        user.type = validated_data['type']

        if validated_data['email'] != '':
            user.email = validated_data['email']

        if validated_data['phone'] != '':
            user.phone = validated_data['phone']
            user.country_code = validated_data['country_code']

        if is_mail(user.username):
            user.email = user.username
            user.save()
            if drop_mail("Please Verify", "activation.html", recipient_mail=user.username, OTP=otp
                         ['OTP'], user=user.first_name):
                print("EMAIL SENT")

        elif(validated_data['phone'] != ''):
            print("NOT VALID EMAIL SO ITS PHONE NO")
            user.phone = validated_data['phone']
            user.save()
            if send_sms(f'{user.country_code}{user.phone}', OTP=otp['OTP'],):
                print("OTP SENDS")

        return user


class LoginSerializer(serializers.Serializer):
    username = serializers.CharField()
    password = serializers.CharField()

    def validate(self, data):
        email_user = User.objects.filter(email=data['username']).first()
        phone_user = User.objects.filter(phone=data['username']).first()
        user = None
        if email_user:
            user = email_user
        elif phone_user:
            user = phone_user
        if user:
            if user.check_password(data['password']) and user.is_active:
                return user
        raise serializers.ValidationError("Incorrect Credentials")






class ComapanySerializer(serializers.ModelSerializer):
    class Meta:
        model = Company
        fields = "__all__"


class BillingSerializer(serializers.ModelSerializer):
    class Meta:
        model = Billing
        fields = "__all__"


class ServiceProviderSerializer(serializers.ModelSerializer):
    company = ComapanySerializer( many=True)
    billing = BillingSerializer( many=True)
    class Meta:
        model = ServiceProvider
        fields = ['about','company','billing','user']

    # custom create menthod for billing and company
    def create(self, validated_data):
        service_provider = ServiceProvider.objects.create(user=validated_data['user'])
        company_data = validated_data['company']
        billing_data = validated_data['billing']
        for company in company_data:
            new_company = Company.objects.create(**company)
            service_provider.company = new_company 

        for billing in billing_data:
            new_billing = Billing.objects.create(user=service_provider.user, **billing)
            service_provider.billing = new_billing
        return service_provider


   

# {
#     "about": "hiii",
#     "company": [{"name" : "facebook" }],
#     "billing": [{"gst_no" : "1"}],
#     "user": 1
# }