from django.db.models.signals import pre_save, post_save
from .models import User, Donation, Question, DonationResponse


def updateUser(sender, instance, **kwargs):
    user = instance
    if user.email != '':
        user.username = user.email


pre_save.connect(updateUser, sender=User)

