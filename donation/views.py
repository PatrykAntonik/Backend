from django.http import JsonResponse
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import *
from .serializers import *
# Create your views here.
@api_view(['GET'])
def getRoutes(request):
    routes = [
        'api/donations/',
        'api/donations/create/',
        'api/donations/upload/',
        'api/donations/top/',
        'api/donations/<id>/',
        'api/donations/delete/<id>/',
        'api/donations/<update>/<id>/',
    ]
    return Response(routes)

@api_view(['GET'])
def getDonations(request):
    donations = Donation.objects.all()
    serializer = DonationSerializer(donations, many=True)
    return Response(serializer.data)

@api_view(['GET'])
def getDonation(request, pk):
    donation = Donation.objects.get(id=pk)
    serializer = DonationSerializer(donation, many=False)
    return Response(serializer.data)

@api_view(['GET'])
def getDonors(request):
    donors = Donor.objects.all()
    serializer = DonorSerializer(donors, many=True)
    return Response(serializer.data)

@api_view(['GET'])
def getDonor(request, pk):
    donor = Donor.objects.get(id=pk)
    serializer = DonorSerializer(donor, many=False)
    return Response(serializer.data)