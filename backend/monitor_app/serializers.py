from rest_framework import serializers
from .models import MonitoredURL


class MonitoredURLSerializer(serializers.ModelSerializer):
    class Meta:
        model = MonitoredURL
        fields = "__all__"