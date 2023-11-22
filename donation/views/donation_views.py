from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from donation.models import *
from donation.serializers import *
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework.permissions import IsAuthenticated, IsAdminUser


class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    def validate(self, attrs):
        data = super().validate(attrs)
        serializer = UserSerializerToken(self.user).data
        for i, j in serializer.items():
            data[i] = j
        return data


class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer

# DONATIONS
@api_view(['GET'])
# @permission_classes([IsAuthenticated])
def getDonations(request):
    donations = Donation.objects.all()
    serializer = DonationSerializer(donations, many=True)
    return Response(serializer.data)

@api_view(['GET'])
# @permission_classes([IsAuthenticated])
def getDonation(request, pk):
    donation = Donation.objects.get(id=pk)
    serializer = DonationSerializer(donation, many=False)
    return Response(serializer.data)

@api_view(['GET'])
# @permission_classes([IsAuthenticated])
def getDonors(request):
    donors = Donor.objects.all()
    serializer = DonorSerializer(donors, many=True)
    return Response(serializer.data)
