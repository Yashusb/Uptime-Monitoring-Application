from django.contrib import admin
from .models import MonitoredURL, HealthCheck

admin.site.register(MonitoredURL)
admin.site.register(HealthCheck)
