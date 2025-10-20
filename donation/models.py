from django.contrib.auth.models import AbstractBaseUser, PermissionsMixin
from django.db import models
from phone_field import PhoneField

from .managers import CustomUserManager


class User(AbstractBaseUser, PermissionsMixin):
    """
    Represents a user in the system.

    :ivar city: The city where the user resides.
    :type city: str
    :ivar zip_code: The user's zip code.
    :type zip_code: str
    :ivar phone_number: The user's phone number.
    :type phone_number: str
    :ivar is_hospital: Whether the user is a hospital.
    :type is_hospital: bool
    :ivar hospital_name: The name of the hospital.
    :type hospital_name: str
    :ivar website_url: The hospital's website URL.
    :type website_url: str
    """

    first_name = models.CharField(max_length=255, blank=True)
    last_name = models.CharField(max_length=255, blank=True)
    email = models.EmailField(max_length=255, unique=True)
    city = models.CharField(max_length=100)
    zip_code = models.CharField(max_length=20)
    phone_number = PhoneField(unique=True)
    is_hospital = models.BooleanField(default=False, blank=True, null=True)
    hospital_name = models.CharField(max_length=255, blank=True, null=True)
    website_url = models.URLField(blank=True, null=True)
    is_staff = models.BooleanField(default=False)

    USERNAME_FIELD = "email"
    REQUIRED_FIELDS = []

    objects = CustomUserManager()


class Question(models.Model):
    """
    Represents a question in the system.

    :ivar text: The text of the question.
    :type text: str
    :ivar donation_type: The type of donation the question is for.
    :type donation_type: str
    """

    id = models.AutoField(primary_key=True)
    text = models.TextField()
    DONATION_TYPE_CHOICES = [("blood", "Blood"), ("marrow", "Marrow")]
    donation_type = models.CharField(max_length=10, choices=DONATION_TYPE_CHOICES)

    def __str__(self):
        return self.text


class Donation(models.Model):
    """
    Represents a donation in the system.

    :ivar donor: The user who made the donation.
    :type donor: User
    :ivar donation_type: The type of donation.
    :type donation_type: str
    :ivar date: The date the donation was made.
    :type date: date
    :ivar questions: The questions associated with the donation.
    :type questions: ManyToManyField
    """

    donor = models.ForeignKey(User, on_delete=models.CASCADE)
    donation_type = models.CharField(
        max_length=10, choices=Question.DONATION_TYPE_CHOICES
    )
    date = models.DateField(auto_now_add=True)
    questions = models.ManyToManyField(Question, through="DonationResponse")

    def __str__(self):
        return f"{self.donor.first_name} {self.donor.last_name} | {self.donation_type} | {self.date}"


class DonationResponse(models.Model):
    """
    Represents a response to a donation question.

    :ivar donation: The donation the response is for.
    :type donation: Donation
    :ivar question: The question the response is for.
    :type question: Question
    :ivar answer: The answer to the question.
    :type answer: bool
    """

    donation = models.ForeignKey(Donation, on_delete=models.CASCADE)
    question = models.ForeignKey(Question, on_delete=models.CASCADE)
    answer = models.BooleanField(null=True, blank=True)

    def __str__(self):
        if self.answer is None:
            return f"{self.donation} - {self.question.text}: No response"
        return (
            f"{self.donation} - {self.question.text}: {'Yes' if self.answer else 'No'}"
        )
