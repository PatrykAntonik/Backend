from django.urls import path
from donation.views.donation_views import *

urlpatterns = [
    path('', getDonations, name="donations"),
    path('<int:donation_id>/questions/', getDonationTypeQuestions, name="donation-questions"),
    path('questions/', getQuestions, name="questions"),
    path('responses/', getResponses, name="responses"),
    path('myresponses/', getMyResponses, name='myresponses'),
    path('mydonations/', getMyDonations, name='mydonations'),
    path('create/', createDonation, name='create-donation'),
    path('<int:pk>/delete', deleteDonation, name='delete-donation'),
    path('<str:pk>/', getDonation, name="donation"),
]
