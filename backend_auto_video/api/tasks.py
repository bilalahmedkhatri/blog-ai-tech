# yourapp/tasks.py
from celery import shared_task
from django.core.mail import send_mail
from django.conf import settings

@shared_task
def send_verification_email(user_id, email):
    # In a production environment, generate a secure token and a proper verification URL.
    verification_link = f"http://localhost:8000/api/verify-email/?user={user_id}"
    subject = "Verify Your Email Address"
    message = f"Thank you for signing up! Please verify your email by clicking this link: {verification_link}"
    from_email = settings.DEFAULT_FROM_EMAIL
    recipient_list = [email]
    send_mail(subject, message, from_email, recipient_list)
