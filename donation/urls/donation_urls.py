from django.urls import path
from donation.views.donation_views import *

urlpatterns = [
    path('', getDonations, name="donations"),
    path('questions/', getQuestions, name="questions"),
    path('mydonations/', getMyDonations, name='mydonations'),
    path('<str:pk>/', getDonation, name="donation"),
]
