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


@api_view(['GET'])
@permission_classes([IsAuthenticated, IsAdminUser])
def getDonations(request):
    donations = Donation.objects.all()
    serializer = DonationSerializer(donations, many=True)
    return Response(serializer.data)


@api_view(['GET'])
@permission_classes([IsAuthenticated, IsAdminUser])
def getDonation(request, pk):
    donation = Donation.objects.get(id=pk)
    serializer = DonationSerializer(donation, many=False)
    return Response(serializer.data)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def getMyDonations(request):
    user = request.user
    donations = user.donation_set.all()
    serializer = DonationSerializer(donations, many=True)
    return Response(serializer.data)


@api_view(['GET'])
def getQuestions(request):
    questions = Question.objects.all()
    serializer = QuestionSerializer(questions, many=True)
    return Response(serializer.data)

# @api_view(['POST'])
# # @permission_classes([IsAuthenticated])
# def createDonation(request):
#     data = request.data
#     user = request.user
#     donation = Donation.objects.create(
#         donor=user,
#         donation_type=data['donation_type']
#     )
#     serializer = DonationSerializer(donation, many=False)
#     return Response(serializer.data)
