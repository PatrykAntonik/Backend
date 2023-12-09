from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from donation.models import *
from donation.serializers import *
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from django.contrib.auth.hashers import make_password
from rest_framework import status
from django.db import IntegrityError


class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    def validate(self, attrs):
        data = super().validate(attrs)
        serializer = UserSerializerToken(self.user).data
        for i, j in serializer.items():
            data[i] = j
        return data


class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer


# USERS
@api_view(['POST'])
def registerUser(request):
    data = request.data
    try:
        user = User.objects.create(
            username=data['email'],
            email=data['email'],
            password=make_password(data['password']),
            first_name=data.get('first_name', ''),
            last_name=data.get('last_name', ''),
            city=data['city'],
            zip_code=data['zip_code'],
            phone_number=data['phone_number'],
            is_hospital=data.get('is_hospital', False),
            hospital_name=data.get('hospital_name', ''),
            website_url=data.get('website_url', ''),
        )
        serializer = UserSerializerToken(user, many=False)
        return Response(serializer.data)
    except IntegrityError as e:
        if 'UNIQUE constraint failed' in str(e):
            message = {'detail': 'User with this email already exists'}
            return Response(message, status=status.HTTP_400_BAD_REQUEST)
        else:
            message = {'detail': str(e)}
            return Response(message, status=status.HTTP_400_BAD_REQUEST)
    except Exception as e:
        message = {'detail': str(e)}
        return Response(message, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def getUserProfile(request):
    user = request.user
    serializer = UserSerializer(user, many=False)
    return Response(serializer.data)


@api_view(['PUT'])
@permission_classes([IsAuthenticated])
def updateUserProfile(request):
    user = request.user
    serializer = UserSerializerToken(user, many=False)
    data = request.data
    user.username = data['email']
    user.email = data['email']
    user.first_name = data.get('first_name', '')
    user.last_name = data.get('last_name', '')
    user.city = data['city']
    user.zip_code = data['zip_code']
    user.phone_number = data['phone_number']
    user.is_hospital = data.get('is_hospital')
    user.hospital_name = data.get('hospital_name', '')
    user.website_url = data.get('website_url', '')
    if data['password'] != '':
        user.password = make_password(data['password'])
    user.save()
    return Response(serializer.data)


@api_view(['GET'])
def getUsers(request):
    users = User.objects.all()
    serializer = UserSerializer(users, many=True)
    return Response(serializer.data)
