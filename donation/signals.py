from django.db.models.signals import pre_save, post_save
from .models import User, Donation, Question, DonationResponse
from django.dispatch import receiver


def updateUser(sender, instance, **kwargs):
    user = instance
    if user.email != '':
        user.username = user.email


# @receiver(post_save, sender=Question)
# def new_question_added(sender, instance, created, **kwargs):
#     if created:
#         User.objects.all().update(new_questions_available=True)


pre_save.connect(updateUser, sender=User)
# post_save.connect(new_question_added, sender=Question)
