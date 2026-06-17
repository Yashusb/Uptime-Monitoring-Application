from django.db import models


class MonitoredURL(models.Model):
    url = models.URLField(unique=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.url


class HealthCheck(models.Model):
    monitored_url = models.ForeignKey(
        MonitoredURL,
        on_delete=models.CASCADE,
        related_name="checks"
    )

    status_code = models.IntegerField(
        null=True,
        blank=True
    )

    response_time = models.FloatField(
        null=True,
        blank=True
    )

    is_up = models.BooleanField(default=False)

    checked_at = models.DateTimeField(
        auto_now_add=True
    )

    def __str__(self):
        return f"{self.monitored_url.url} - {self.status_code}"
