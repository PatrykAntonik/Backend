from django.http import Http404
from rest_framework import generics, status
from rest_framework.decorators import api_view
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


class DonationListView(generics.ListAPIView):
    queryset = Donation.objects.all()
    serializer_class = DonationSerializer
    permission_classes = [IsAdminUser]


class DonationDetailView(generics.RetrieveDestroyAPIView):
    serializer_class = DonationSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        if user.is_staff:
            return Donation.objects.all()
        return Donation.objects.filter(donor=user)

    def destroy(self, request, *args, **kwargs):
        instance = self.get_object()
        self.perform_destroy(instance)
        return Response({"detail": "Donation deleted"}, status=status.HTTP_200_OK)


class MyDonationListView(generics.ListCreateAPIView):
    serializer_class = DonationSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return Donation.objects.filter(donor=self.request.user)

    def get_serializer_class(self):
        request = getattr(self, "request", None)
        if request and request.method == "POST":
            return DonationCreateSerializer
        return DonationSerializer

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        headers = self.get_success_headers(serializer.data)
        return Response(serializer.data, status=status.HTTP_200_OK, headers=headers)


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
