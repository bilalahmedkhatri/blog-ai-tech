# import re
# from django.db.models.signals import post_save
# from django.dispatch import receiver
# from api.models import UserProfile
# from api.tasks import send_verification_email


# shayad windows ki waja say yaa google password ki waja say error aa rahe hain

# @receiver(post_save, sender=UserProfile)
# def trigger_verification_email(sender, instance, created, **kwargs):
#     if created:
#         # Optionally, you can check for instance.is_verified here
#         result = send_verification_email.delay(instance.id, instance.email)
#         print("task results: ", type(result), dir(result), result)
