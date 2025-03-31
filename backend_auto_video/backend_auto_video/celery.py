# myproject/celery.py
import os
from celery import Celery

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'backend_auto_video.settings')

app = Celery('backend_auto_video')
app.config_from_object('django.conf:settings', namespace='CELERY')
app.autodiscover_tasks()
