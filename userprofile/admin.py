from django.contrib import admin
from .models import User,ServiceProvider,Company,Billing

admin.site.register(User)
admin.site.register(ServiceProvider)   
admin.site.register(Company)
admin.site.register(Billing)
