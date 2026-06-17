from django.apps import AppConfig


class MonitorAppConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'monitor_app'

    def ready(self):

        import os

        if os.environ.get(
            'RUN_MAIN'
        ) == 'true':

            from .scheduler import start

            start()