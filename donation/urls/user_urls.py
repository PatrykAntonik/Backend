from django.urls import path

from donation.views.user_views import (
    MyTokenObtainPairView,
    RegisterUserView,
    UserListView,
    UserProfileView,
)


urlpatterns = [
    path("", UserListView.as_view(), name="users"),
    path("login/", MyTokenObtainPairView.as_view(), name="token_obtain_pair"),
    path("profile/", UserProfileView.as_view(), name="users-profile"),
    path("register/", RegisterUserView.as_view(), name="register"),
]
