from drf_spectacular.utils import (
    OpenApiExample,
    OpenApiParameter,
    OpenApiTypes,
    extend_schema,
)

from donation.serializers import (
    DonationSerializer,
    QuestionSerializer,
    ResponseSerializer,
)


get_donations_docs = extend_schema(
    summary="List donations",
    description="Returns all recorded donations. Requires admin access.",
    responses={200: DonationSerializer(many=True)},
    tags=["Donations"],
)

create_donation_docs = extend_schema(
    summary="Create donation",
    description="Creates a donation for the authenticated user and attaches optional question responses.",
    request=DonationSerializer,
    responses={200: DonationSerializer},
    tags=["Donations"],
)

delete_donation_docs = extend_schema(
    summary="Delete donation",
    description="Deletes a donation belonging to the authenticated user.",
    responses={200: None},
    tags=["Donations"],
)

get_donation_docs = extend_schema(
    summary="Retrieve donation",
    description="Fetches a single donation by ID.",
    responses={200: DonationSerializer},
    tags=["Donations"],
)

get_my_donations_docs = extend_schema(
    summary="List my donations",
    description="Returns donations submitted by the authenticated user.",
    responses={200: DonationSerializer(many=True)},
    tags=["Donations"],
)

get_questions_docs = extend_schema(
    summary="List donation questions",
    description="Lists question templates. Optionally filter by donation type.",
    responses={200: QuestionSerializer(many=True)},
    tags=["Donations"],
)

get_donation_type_questions_docs = extend_schema(
    summary="List questions for donation",
    description="Returns the questions associated with the donation's type.",
    responses={200: QuestionSerializer(many=True)},
    tags=["Donations"],
)

get_my_responses_docs = extend_schema(
    summary="List my donation responses",
    description="Retrieves responses linked to the authenticated user's donations.",
    responses={200: ResponseSerializer(many=True)},
    tags=["Donations"],
)

get_donation_responses_docs = extend_schema(
    summary="List donation responses",
    description="Returns responses for a specific donation.",
    responses={200: ResponseSerializer(many=True)},
    tags=["Donations"],
)
