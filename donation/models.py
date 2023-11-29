from django.contrib.auth.models import AbstractUser
from django.db import models
from phone_field import PhoneField
from django.utils import timezone

# ABSTRACT USER MODEL FOR DONOR, HOSPITAL AND ADMIN
class User(AbstractUser):
    is_donor = models.BooleanField(default=False)
    is_hospital = models.BooleanField(default=False)
    city = models.CharField(max_length=100)
    zip_code = models.CharField(max_length=20)
    phone_number = PhoneField(unique=True)

# DONOR USER MODEL AND DETAILS
class Donor(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, primary_key=True)
    blood_type = models.CharField(max_length=50, blank=True)

    def __str__(self):
        return f"{self.user.first_name} {self.user.last_name}"

class DonorDiseases(models.Model):
    donor = models.ForeignKey(Donor, on_delete=models.CASCADE)
    disease_name = models.CharField(max_length=255)
    def __str__(self):
        return f"{self.donor}- {self.disease_name}"

class Donation(models.Model):
    id = models.AutoField(primary_key=True)
    donor = models.ForeignKey(Donor, on_delete=models.CASCADE)
    organ = models.CharField(max_length=255)
    date = models.DateField(auto_now_add=True)

    def __str__(self):
        return f"{self.donor} {self.organ}"

# HOSPITAL USER MODEL AND DETAILS
class Hospital(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, primary_key=True)
    address = models.CharField(max_length=255)
    hospital_name = models.CharField(max_length=255)
    website_url = models.URLField(blank=True)

    def __str__(self):
        return f"{self.hospital_name} {self.city}"

class Patient(models.Model):
    id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=255)
    surname = models.CharField(max_length=255)
    blood_type = models.CharField(max_length=50)
    organ_type_needed = models.CharField(max_length=255)
    emergency_level = models.IntegerField()
    hospital = models.ForeignKey(Hospital, on_delete=models.CASCADE)

    def __str__(self):
        return f"{self.name} {self.surname}"

# DONATION PROCESS MODEL

class DonationProcess(models.Model):
    id = models.AutoField(primary_key=True)
    donation = models.ForeignKey(Donation, on_delete=models.CASCADE)
    patient = models.ForeignKey(Patient, on_delete=models.CASCADE)
    finished_at = models.DateTimeField(default=timezone.now, blank=True, null=True)
    is_finished = models.BooleanField(blank=True)

    def __str__(self):
        return f"{self.donation} donated to {self.patient}"