from rest_framework import serializers
from rest_framework.validators import UniqueValidator
from rest_framework_simplejwt.tokens import RefreshToken

from .models import Donation, DonationResponse, Question, User
from .validators import validate_password_strength


class UserSerializer(serializers.ModelSerializer):
    """Serializer for the User model."""

    id = serializers.SerializerMethodField(read_only=True)

    class Meta:
        model = User
        fields = [
            "id",
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
        fields = ["id", "email", "token"]

    def get_token(self, obj):
        token = RefreshToken.for_user(obj)
        return str(token.access_token)


class UserProfileUpdateSerializer(serializers.ModelSerializer):
    """Serializer for updating the User model."""

    email = serializers.EmailField(
        required=False,
        validators=[
            UniqueValidator(
                queryset=User.objects.all(),
                message="User with this email already exists.",
            )
        ],
    )
    phone_number = serializers.RegexField(
        regex=r"^\+?\d{9,15}$",
        required=False,
        allow_blank=False,
        error_messages={
            "invalid": "Phone number must contain 9 to 15 digits and may start with +.",
        },
        validators=[
            UniqueValidator(
                queryset=User.objects.all(),
                message="User with this phone number already exists.",
            )
        ],
    )
    zip_code = serializers.RegexField(
        regex=r"^\d{2}-\d{3}$",
        required=False,
        allow_blank=False,
        error_messages={
            "invalid": "Zip code must match the format 12-345.",
        },
    )
    website_url = serializers.URLField(
        required=False, allow_blank=True, allow_null=True
    )
    password = serializers.CharField(
        write_only=True,
        required=False,
        allow_blank=True,
        validators=[validate_password_strength],
    )
    token = serializers.SerializerMethodField(read_only=True)

    class Meta:
        model = User
        fields = (
            "id",
            "first_name",
            "last_name",
            "email",
            "city",
            "zip_code",
            "phone_number",
            "hospital_name",
            "website_url",
            "password",
            "token",
        )
        read_only_fields = ("is_hospital",)

    def get_token(self, obj):
        token = RefreshToken.for_user(obj)
        return str(token.access_token)

    def validate(self, data):
        data = super().validate(data)

        errors = {}
        if self.instance.is_hospital and not data.get("hospital_name"):
            errors["hospital_name"] = "Hospital name is required for hospital accounts."

        website_url = data.get("website_url")
        if self.instance.is_hospital and not website_url:
            errors["website_url"] = "Website url is required for hospital accounts."

        if errors:
            raise serializers.ValidationError(errors)

        return data

    def update(self, instance, validated_data):
        password = validated_data.pop("password", None)
        instance = super().update(instance, validated_data)
        if password:
            instance.set_password(password)
            instance.save()
        return instance


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


class UserRegistrationSerializer(serializers.ModelSerializer):
    """Serializer for user registration."""

    email = serializers.EmailField(
        validators=[
            UniqueValidator(
                queryset=User.objects.all(),
                message="User with this email already exists.",
            )
        ]
    )
    phone_number = serializers.RegexField(
        regex=r"^\+?\d{9,15}$",
        error_messages={
            "invalid": "Phone number must contain 9 to 15 digits and may start with +.",
        },
        validators=[
            UniqueValidator(
                queryset=User.objects.all(),
                message="User with this phone number already exists.",
            )
        ],
    )
    zip_code = serializers.RegexField(
        regex=r"^\d{2}-\d{3}$",
        error_messages={
            "invalid": "Zip code must match the format 12-345.",
        },
    )
    website_url = serializers.URLField(
        required=False, allow_blank=True, allow_null=True
    )
    password = serializers.CharField(
        write_only=True,
        validators=[validate_password_strength],
    )
    token = serializers.SerializerMethodField(read_only=True)

    class Meta:
        model = User
        fields = (
            "id",
            "email",
            "password",
            "first_name",
            "last_name",
            "city",
            "zip_code",
            "phone_number",
            "is_hospital",
            "hospital_name",
            "website_url",
            "token",
        )

    def get_token(self, obj):
        token = RefreshToken.for_user(obj)
        return str(token.access_token)

    def validate(self, data):
        data = super().validate(data)

        if data.get("is_hospital") and not data.get("hospital_name"):
            raise serializers.ValidationError(
                {"hospital_name": "Hospital name is required for hospital accounts."}
            )

        return data

    def create(self, validated_data):
        user = User.objects.create_user(
            email=validated_data["email"],
            password=validated_data["password"],
            first_name=validated_data.get("first_name", ""),
            last_name=validated_data.get("last_name", ""),
            city=validated_data["city"],
            zip_code=validated_data["zip_code"],
            phone_number=validated_data["phone_number"],
            is_hospital=validated_data.get("is_hospital", False),
            hospital_name=validated_data.get("hospital_name", ""),
            website_url=validated_data.get("website_url", ""),
        )
        return user
