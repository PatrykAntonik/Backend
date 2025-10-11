from django.contrib.auth.hashers import make_password
from django.db import IntegrityError
from rest_framework import status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAdminUser, IsAuthenticated
from rest_framework.response import Response
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView

from docs.user_docs import (
    get_user_profile_docs,
    get_users_docs,
    login_user_docs,
    register_user_docs,
    update_user_profile_docs,
)
from donation.models import (
    User,
)
from donation.serializers import UserSerializer, UserSerializerToken


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
@api_view(["POST"])
def registerUser(request):
    """
    Register a new user
    """
    data = request.data
    try:
        user = User.objects.create(
            username=data["email"],
            email=data["email"],
            password=make_password(data["password"]),
            first_name=data.get("first_name", ""),
            last_name=data.get("last_name", ""),
            city=data["city"],
            zip_code=data["zip_code"],
            phone_number=data["phone_number"],
            is_hospital=data.get("is_hospital", False),
            hospital_name=data.get("hospital_name", ""),
            website_url=data.get("website_url", ""),
        )
        serializer = UserSerializerToken(user, many=False)
        return Response(serializer.data)
    except IntegrityError as e:
        if "UNIQUE constraint failed" in str(e):
            message = {"detail": "User with this email already exists"}
            return Response(message, status=status.HTTP_400_BAD_REQUEST)
        else:
            message = {"detail": str(e)}
            return Response(message, status=status.HTTP_400_BAD_REQUEST)
    except Exception as e:
        message = {"detail": str(e)}
        return Response(message, status=status.HTTP_400_BAD_REQUEST)


@get_user_profile_docs
@api_view(["GET"])
@permission_classes([IsAuthenticated])
def getUserProfile(request):
    """
    Retrieve user profile
    """
    user = request.user
    serializer = UserSerializer(user, many=False)
    return Response(serializer.data)


@update_user_profile_docs
@api_view(["PUT"])
@permission_classes([IsAuthenticated])
def updateUserProfile(request):
    """
    Update user profile
    """
    user = request.user
    serializer = UserSerializerToken(user, many=False)
    data = request.data
    user.username = data["email"]
    user.email = data["email"]
    user.first_name = data.get("first_name", "")
    user.last_name = data.get("last_name", "")
    user.city = data["city"]
    user.zip_code = data["zip_code"]
    user.phone_number = data["phone_number"]
    user.is_hospital = data.get("is_hospital")
    user.hospital_name = data.get("hospital_name", "")
    user.website_url = data.get("website_url", "")
    if data["password"] != "":
        user.password = make_password(data["password"])
    user.save()
    return Response(serializer.data)


@get_users_docs
@api_view(["GET"])
@permission_classes([IsAuthenticated, IsAdminUser])
def getUsers(request):
    """
    Retrieve all donors
    """
    users = User.objects.filter(is_hospital=False, is_staff=False, is_superuser=False)
    serializer = UserSerializer(users, many=True)
    return Response(serializer.data)
