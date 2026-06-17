from rest_framework import generics
from rest_framework.response import Response
from rest_framework.views import APIView

from .models import (
    MonitoredURL,
    HealthCheck
)

from .serializers import MonitoredURLSerializer


class URLListCreateView(generics.ListCreateAPIView):
    queryset = MonitoredURL.objects.all()
    serializer_class = MonitoredURLSerializer


class StatusView(APIView):

    def get(self, request):

        data = []

        urls = MonitoredURL.objects.all()

        for url in urls:

            latest = (
                HealthCheck.objects
                .filter(monitored_url=url)
                .order_by("-checked_at")
                .first()
            )

            if latest:

                data.append({
                    "url": url.url,
                    "status": "UP" if latest.is_up else "DOWN",
                    "status_code": latest.status_code,
                    "response_time": latest.response_time,
                    "checked_at": latest.checked_at
                })

        return Response(data)