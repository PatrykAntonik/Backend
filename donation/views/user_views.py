from rest_framework import generics
from rest_framework.permissions import AllowAny, IsAdminUser, IsAuthenticated
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView

from docs.user_docs import (
    get_users_docs,
    login_user_docs,
    register_user_docs,
    user_profile_docs,
)
from donation.models import (
    User,
)
from donation.serializers import (
    UserProfileUpdateSerializer,
    UserRegistrationSerializer,
    UserSerializer,
    UserSerializerToken,
)


class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    """
    Custom serializer for obtaining JWT tokens that includes user data in the response
    """

    def validate(self, attrs):
        data = super().validate(attrs)
        serializer = UserSerializerToken(self.user).data
        for i, j in serializer.items():
            data[i] = j
        return data


@login_user_docs
class MyTokenObtainPairView(TokenObtainPairView):
    """
    Custom token obtain pair view to include user data in the response
    """

    serializer_class = MyTokenObtainPairSerializer


@register_user_docs
class RegisterUserView(generics.CreateAPIView):
    """
    Register a new user.
    """

    queryset = User.objects.all()
    serializer_class = UserRegistrationSerializer
    permission_classes = [AllowAny]


@user_profile_docs
class UserProfileView(generics.RetrieveUpdateAPIView):
    """
    Retrieve or update a user profile.
    """

    permission_classes = [IsAuthenticated]

    def get_object(self):
        return self.request.user

    def get_serializer_class(self):
        if self.request.method == "PUT":
            return UserProfileUpdateSerializer
        return UserSerializer


@get_users_docs
class UserListView(generics.ListAPIView):
    """
    Retrieve all donors
    """

    serializer_class = UserSerializer
    permission_classes = [IsAdminUser]

    def get_queryset(self):
        return User.objects.filter(
            is_hospital=False, is_staff=False, is_superuser=False
        )
