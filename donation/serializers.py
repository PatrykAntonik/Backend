from rest_framework import serializers
from rest_framework_simplejwt.tokens import RefreshToken

from .models import Donation, DonationResponse, Question, User


class UserSerializer(serializers.ModelSerializer):
    """Serializer for the User model."""

    id = serializers.SerializerMethodField(read_only=True)

    class Meta:
        model = User
        fields = [
            "id",
            "username",
            "first_name",
            "last_name",
            "email",
            "city",
            "zip_code",
            "phone_number",
            "is_hospital",
            "hospital_name",
            "website_url",
            "is_staff",
        ]

    def get_id(self, obj):
        return obj.id


class UserSerializerToken(UserSerializer):
    """Serializer for the User model with a token."""

    token = serializers.SerializerMethodField(read_only=True)

    class Meta:
        model = User
        fields = ["id", "username", "email", "token"]

    def get_token(self, obj):
        token = RefreshToken.for_user(obj)
        return str(token.access_token)


class DonationSerializer(serializers.ModelSerializer):
    """Serializer for the Donation model."""

    id = serializers.SerializerMethodField(read_only=True)
    donor = UserSerializer(read_only=True)

    class Meta:
        model = Donation
        fields = ["id", "donor", "donation_type", "date", "questions"]

    def get_id(self, obj):
        return obj.id


class QuestionSerializer(serializers.ModelSerializer):
    """Serializer for the Question model."""

    class Meta:
        model = Question
        fields = "__all__"


class ResponseSerializer(serializers.ModelSerializer):
    """Serializer for the DonationResponse model."""

    class Meta:
        model = DonationResponse
        fields = "__all__"
