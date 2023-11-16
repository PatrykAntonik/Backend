from django.urls import path
from .views import *

urlpatterns = [
    path('donations/', getDonations, name="donations"),
    path('donations/<str:pk>/', getDonation, name="donation"),
    path('donors/', getDonors, name="donors"),
    path('donors/<str:pk>/', getDonor, name="donor"),

    path('users/login', MyTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('users/profile', getUserProfile, name="users-profile"),
    path('users/', getUsers, name='users'),

    path('users/register', registerUser, name='register'),
]