from django.urls import path
from knox.views import LogoutView
from .views import RegisterDetail, LoginDetail, VerifyOTP, ForgetPassword, VerifyForgetPasswordToken,CompanyView,ServiceProviderView

from . import views
# base_url = "http://localhost:8000/api/user/"

app_name = 'userprofile'

urlpatterns = [
    path('', views.GetUserView.as_view()),

    path('register', RegisterDetail.as_view()),
    path('login', LoginDetail.as_view()),
    path('verify-otp', VerifyOTP.as_view()),
    path('logout', LogoutView.as_view(), name='knox_logout'),
    path('register/<str:invite>', RegisterDetail.as_view()),
    path('forget-password', ForgetPassword.as_view()),
    path('verify-forget-password/<str:uid>/<str:token>',
         VerifyForgetPasswordToken.as_view()),

    path('company',CompanyView.as_view()),
    path('service-provider',ServiceProviderView.as_view()),


]
