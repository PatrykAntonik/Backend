from django.urls import path
from donation.views.donation_views import *

urlpatterns = [
    path('', getDonations, name="donations"),
    path('<str:pk>/', getDonation, name="donation"),
]
