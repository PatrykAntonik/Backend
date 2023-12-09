from django.contrib.auth.models import AbstractUser
from django.db import models
from phone_field import PhoneField
from django.utils import timezone
from django.contrib.auth.models import Permission
from django.contrib.contenttypes.models import ContentType

from django.contrib.auth.models import Permission
from django.contrib.contenttypes.models import ContentType


# USER MODEL FOR DONOR, HOSPITAL AND ADMIN
class User(AbstractUser):
    city = models.CharField(max_length=100)
    zip_code = models.CharField(max_length=20)
    phone_number = PhoneField(unique=True)
    is_hospital = models.BooleanField(default=False, blank=True, null=True)
    hospital_name = models.CharField(max_length=255, blank=True, null=True)
    website_url = models.URLField(blank=True, null=True)


class Question(models.Model):
    id = models.AutoField(primary_key=True)
    text = models.TextField()
    DONATION_TYPE_CHOICES = [
        ('blood', 'Blood'),
        ('marrow', 'Marrow')
    ]
    donation_type = models.CharField(max_length=10, choices=DONATION_TYPE_CHOICES)

    def __str__(self):
        return self.text


class Donation(models.Model):
    donor = models.ForeignKey(User, on_delete=models.CASCADE)
    donation_type = models.CharField(max_length=10, choices=Question.DONATION_TYPE_CHOICES)
    date = models.DateField(auto_now_add=True)
    questions = models.ManyToManyField(Question, through='DonationResponse')

    def __str__(self):
        return f"{self.donor.first_name} {self.donor.last_name} | {self.donation_type} | {self.date}"


class DonationResponse(models.Model):
    donation = models.ForeignKey(Donation, on_delete=models.CASCADE)
    question = models.ForeignKey(Question, on_delete=models.CASCADE)
    answer = models.BooleanField()

    def __str__(self):
        return f"{self.donation} - {self.question.text}: {'Yes' if self.answer else 'No'}"
