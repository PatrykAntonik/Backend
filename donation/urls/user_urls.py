from django.urls import path
from donation.views.user_views import *

urlpatterns = [
    path('', getUsers, name='users'),
    path('login/', MyTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('profile/', getUserProfile, name="users-profile"),
    path('register/', registerUser, name='register'),
]