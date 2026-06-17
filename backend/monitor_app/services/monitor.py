import time
import requests

from monitor_app.models import (
    MonitoredURL,
    HealthCheck
)


def check_all_urls():

    urls = MonitoredURL.objects.all()

    for url_obj in urls:

        try:

            start_time = time.time()

            response = requests.get(
                url_obj.url,
                timeout=10
            )

            response_time = (
                time.time() - start_time
            ) * 1000

            HealthCheck.objects.create(
                monitored_url=url_obj,
                status_code=response.status_code,
                response_time=response_time,
                is_up=response.status_code < 400
            )

        except Exception:

            HealthCheck.objects.create(
                monitored_url=url_obj,
                status_code=None,
                response_time=None,
                is_up=False
            )