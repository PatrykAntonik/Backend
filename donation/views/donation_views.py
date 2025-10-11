from django.http import Http404
from rest_framework import status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAdminUser, IsAuthenticated
from rest_framework.response import Response
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView

from docs.donation_docs import (
    create_donation_docs,
    delete_donation_docs,
    get_donation_docs,
    get_donation_responses_docs,
    get_donation_type_questions_docs,
    get_donations_docs,
    get_my_donations_docs,
    get_my_responses_docs,
    get_questions_docs,
)
from donation.models import Donation, DonationResponse, Question
from donation.serializers import (
    DonationSerializer,
    QuestionSerializer,
    ResponseSerializer,
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


class MyTokenObtainPairView(TokenObtainPairView):
    """
    Custom token obtain pair view to include user data in the response
    """

    serializer_class = MyTokenObtainPairSerializer


# TODO- grouped this and below view
@get_donations_docs
@api_view(["GET"])
@permission_classes([IsAuthenticated, IsAdminUser])
def getDonations(request):
    """
    Retrieve all donations (hospitals only)
    """
    donations = Donation.objects.all()
    serializer = DonationSerializer(donations, many=True)
    return Response(serializer.data)


@create_donation_docs
@api_view(["POST"])
@permission_classes([IsAuthenticated])
def createDonation(request):
    """
    Create a new donation along with its associated responses
    """
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


# TODO- grouped this and below 2 views
@delete_donation_docs
@api_view(["DELETE"])
@permission_classes([IsAuthenticated])
def deleteDonation(request, pk):
    """
    Delete a donation made by the authenticated user
    """
    try:
        donation = Donation.objects.get(id=pk, donor=request.user)
        donation.delete()
        return Response({"detail": "Donation deleted"})
    except Donation.DoesNotExist:
        return Response({"detail": "Donation not found"}, status=404)


@get_donation_docs
@api_view(["GET"])
@permission_classes([IsAuthenticated])
def getDonation(request, pk):
    """
    Retrieve a specific donation by its ID
    """
    donation = Donation.objects.get(id=pk)
    serializer = DonationSerializer(donation, many=False)
    return Response(serializer.data)


@get_my_donations_docs
@api_view(["GET"])
@permission_classes([IsAuthenticated])
def getMyDonations(request):
    """
    Retrieve donations made by the authenticated user
    """
    user = request.user
    donations = user.donation_set.all()
    serializer = DonationSerializer(donations, many=True)
    return Response(serializer.data)


@get_questions_docs
@api_view(["GET"])
def getQuestions(request):
    """
    Retrieve questions, optionally filtered by donation type
    """
    donation_type = request.query_params.get("donation_type", None)
    if donation_type:
        questions = Question.objects.filter(donation_type=donation_type)
    else:
        questions = Question.objects.all()

    serializer = QuestionSerializer(questions, many=True)
    return Response(serializer.data)


@get_donation_type_questions_docs
@api_view(["GET"])
def getDonationTypeQuestions(request, donation_id):
    """
    Retrieve questions associated with a specific donation's type
    """
    try:
        donation = Donation.objects.get(id=donation_id)
    except Donation.DoesNotExist:
        raise Http404

    questions = Question.objects.filter(donation_type=donation.donation_type)
    serializer = QuestionSerializer(questions, many=True)
    return Response(serializer.data)


@get_my_responses_docs
@api_view(["GET"])
@permission_classes([IsAuthenticated])
def getMyResponses(request):
    """
    Retrieve responses to donations made by the authenticated user
    """
    user = request.user
    donations = Donation.objects.filter(donor=user)
    responses = DonationResponse.objects.filter(donation__in=donations)
    serializer = ResponseSerializer(responses, many=True)
    return Response(serializer.data)


@get_donation_responses_docs
@api_view(["GET"])
@permission_classes([IsAuthenticated])
def getDonationResponses(request, donation_id):
    """
    Retrieve responses for a specific donation
    """
    try:
        responses = DonationResponse.objects.filter(donation_id=donation_id)
        serializer = ResponseSerializer(responses, many=True)
        return Response(serializer.data)
    except DonationResponse.DoesNotExist:
        return Response({"detail": "This donation has no responses"}, status=404)
