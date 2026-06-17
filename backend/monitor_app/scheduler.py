from apscheduler.schedulers.background import (
    BackgroundScheduler
)

from monitor_app.services.monitor import (
    check_all_urls
)


def start():

    scheduler = BackgroundScheduler()

    scheduler.add_job(
        check_all_urls,
        "interval",
        minutes=1
    )

    scheduler.start()

    print("Scheduler Started...")