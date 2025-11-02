from django.http import Http404
from rest_framework import generics, status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAdminUser, IsAuthenticated
from rest_framework.response import Response
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView

from donation.models import Donation, DonationResponse, Question
from donation.serializers import *


class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    def validate(self, attrs):
        data = super().validate(attrs)
        serializer = UserSerializerToken(self.user).data
        for i, j in serializer.items():
            data[i] = j
        return data


class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer


@permission_classes([IsAdminUser])
class DonationListView(generics.ListAPIView):
    queryset = Donation.objects.all()
    serializer_class = DonationSerializer
    permission_classes = [IsAdminUser]


class DonationDetailView(generics.RetrieveAPIView):
    serializer_class = DonationSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        if user.is_staff:
            return Donation.objects.all()
        return Donation.objects.filter(donor=user)


class MyDonationsView(generics.ListAPIView):
    serializer_class = DonationSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return Donation.objects.filter(donor=self.request.user)


@api_view(["GET"])
def getQuestions(request):
    donation_type = request.query_params.get("donation_type", None)
    if donation_type:
        questions = Question.objects.filter(donation_type=donation_type)
    else:
        questions = Question.objects.all()

    serializer = QuestionSerializer(questions, many=True)
    return Response(serializer.data)


@api_view(["GET"])
def getDonationTypeQuestions(request, donation_id):
    try:
        donation = Donation.objects.get(id=donation_id)
    except Donation.DoesNotExist:
        raise Http404

    questions = Question.objects.filter(donation_type=donation.donation_type)
    serializer = QuestionSerializer(questions, many=True)
    return Response(serializer.data)


class MyResponsesView(generics.ListAPIView):
    serializer_class = ResponseSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        donations = Donation.objects.filter(donor=user)
        return DonationResponse.objects.filter(donation__in=donations)


class DonationResponsesView(generics.ListAPIView):
    serializer_class = ResponseSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        donation_id = self.kwargs.get("donation_id")
        return DonationResponse.objects.filter(donation_id=donation_id)


@api_view(["POST"])
@permission_classes([IsAuthenticated])
def createDonation(request):
    data = request.data
    user = request.user

    try:
        donation = Donation.objects.create(
            donor=user, donation_type=data["donation_type"]
        )

        responses = data.get("responses", [])
        for response in responses:
            question_id = response.get("question_id")
            answer = response.get("answer")

            if Question.objects.filter(id=question_id).exists():
                DonationResponse.objects.create(
                    donation=donation, question_id=question_id, answer=answer
                )

        serializer = DonationSerializer(donation)
        return Response(serializer.data)

    except Exception as e:
        return Response({"detail": str(e)}, status=status.HTTP_400_BAD_REQUEST)


@api_view(["DELETE"])
@permission_classes([IsAuthenticated])
def deleteDonation(request, pk):
    try:
        donation = Donation.objects.get(id=pk, donor=request.user)
        donation.delete()
        return Response({"detail": "Donation deleted"})
    except Donation.DoesNotExist:
        return Response({"detail": "Donation not found"}, status=404)
