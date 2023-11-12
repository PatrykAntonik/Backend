from django.contrib import admin
from .models import *
# Register your models here.

admin.site.register(User)
admin.site.register(Donor)
admin.site.register(DonorDiseases)
admin.site.register(Donation)
admin.site.register(Hospital)
admin.site.register(Patient)
admin.site.register(DonationProcess)