from django.contrib import admin
from .models import ApplicationRequest,Reviewers
# Register your models here.

admin.site.register(ApplicationRequest)
admin.site.register(Reviewers)