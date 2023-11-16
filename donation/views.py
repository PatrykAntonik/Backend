from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from .models import *
from .serializers import *
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from django.contrib.auth.hashers import make_password
from rest_framework import status

class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    def validate(self, attrs):
        data = super().validate(attrs)
        serializer = UserSerializerToken(self.user).data
        for i, j in serializer.items():
            data[i] = j
        return data

class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer


# class IsHospital(BasePermission):
#     def has_permission(self, request, view):
#         return request.user and request.user.is_authenticated and request.user.is_hospital


# USERS
@api_view(['POST'])
def registerUser(request):
    data = request.data
    try:
        user = User.objects.create(
            username=data['email'],
            email=data['email'],
            password=make_password(data['password'])
        )
        serializer = UserSerializerToken(user, many=False)
        return Response(serializer.data)
    except:
        message = {'detail': 'User with this email already exists'}
        return Response(message, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET'])
# @permission_classes([IsAuthenticated])
def getUserProfile(request):
    user = request.user
    serializer = UserSerializer(user, many=False)
    return Response(serializer.data)

@api_view(['GET'])
# @permission_classes([IsAuthenticated])
def getUsers(request):
    users = User.objects.all()
    serializer = UserSerializer(users, many=True)
    return Response(serializer.data)


# DONATIONS
@api_view(['GET'])
@permission_classes([IsAuthenticated])
def getDonations(request):
    donations = Donation.objects.all()
    serializer = DonationSerializer(donations, many=False)
    return Response(serializer.data)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def getDonation(request, pk):
    donation = Donation.objects.get(id=pk)
    serializer = DonationSerializer(donation, many=False)
    return Response(serializer.data)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def getDonors(request):
    donors = Donor.objects.all()
    serializer = DonorSerializer(donors, many=True)
    return Response(serializer.data)

# DONORS
@api_view(['GET'])
@permission_classes([IsAuthenticated])
def getDonor(request, pk):
    donor = Donor.objects.get(id=pk)
    serializer = DonorSerializer(donor, many=False)
    return Response(serializer.data)