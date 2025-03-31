from celery import Celery

celery_app = Celery(
    "tasks",
    broker="redis://localhost:6379/0",  # Change to Redis URL if needed
    backend="redis://localhost:6379/0",
    include=["tasks"],
)

celery_app.conf.update(
    task_serializer="json",
    accept_content=["json"],
    result_expires=3600,
    broker_connection_retry_on_startup=True
)
