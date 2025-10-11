from django.urls import path

from donation.views.user_views import (
    MyTokenObtainPairView,
    getUserProfile,
    getUsers,
    registerUser,
    updateUserProfile,
)


urlpatterns = [
    path("", getUsers, name="users"),
    path("login/", MyTokenObtainPairView.as_view(), name="token_obtain_pair"),
    path("profile/", getUserProfile, name="users-profile"),
    path("profile/update/", updateUserProfile, name="users-profile-update"),
    path("register/", registerUser, name="register"),
]
