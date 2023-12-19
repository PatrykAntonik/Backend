from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from donation.models import *
from donation.serializers import *
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework.permissions import IsAuthenticated, IsAdminUser
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


@api_view(['GET'])
@permission_classes([IsAuthenticated, IsAdminUser])
def getDonations(request):
    donations = Donation.objects.all()
    serializer = DonationSerializer(donations, many=True)
    return Response(serializer.data)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
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
    donation_type = request.query_params.get('donation_type', None)
    if donation_type:
        questions = Question.objects.filter(donation_type=donation_type)
    else:
        questions = Question.objects.all()

    serializer = QuestionSerializer(questions, many=True)
    return Response(serializer.data)


@api_view(['GET'])
def getDonationTypeQuestions(request, donation_id):
    try:
        donation = Donation.objects.get(id=donation_id)
    except Donation.DoesNotExist:
        raise Http404

    questions = Question.objects.filter(donation_type=donation.donation_type)
    serializer = QuestionSerializer(questions, many=True)
    return Response(serializer.data)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def getMyResponses(request):
    user = request.user
    donations = Donation.objects.filter(donor=user)
    responses = DonationResponse.objects.filter(donation__in=donations)
    serializer = ResponseSerializer(responses, many=True)
    return Response(serializer.data)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def getDonationResponses(request, donation_id):
    try:
        responses = DonationResponse.objects.filter(donation_id=donation_id)
        serializer = ResponseSerializer(responses, many=True)
        return Response(serializer.data)
    except DonationResponse.DoesNotExist:
        return Response({'detail': 'This donation has no responses'}, status=404)


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def createDonation(request):
    data = request.data
    user = request.user

    try:
        donation = Donation.objects.create(
            donor=user,
            donation_type=data['donation_type']
        )

        responses = data.get('responses', [])
        for response in responses:
            question_id = response.get('question_id')
            answer = response.get('answer', False)

            if Question.objects.filter(id=question_id).exists():
                DonationResponse.objects.create(
                    donation=donation,
                    question_id=question_id,
                    answer=answer
                )

        serializer = DonationSerializer(donation)
        return Response(serializer.data)

    except Exception as e:
        return Response({'detail': str(e)}, status=status.HTTP_400_BAD_REQUEST)


@api_view(['DELETE'])
@permission_classes([IsAuthenticated])
def deleteDonation(request, pk):
    try:
        donation = Donation.objects.get(id=pk, donor=request.user)
        donation.delete()
        return Response({'detail': 'Donation deleted'})
    except Donation.DoesNotExist:
        return Response({'detail': 'Donation not found'}, status=404)
