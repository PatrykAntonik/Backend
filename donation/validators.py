import re

from rest_framework import serializers


def validate_password_strength(value: str) -> str:
    """Validate that the password meets strength requirements."""
    if not value:
        return value

    if len(value) < 6:
        raise serializers.ValidationError(
            "Password must be at least 6 characters long."
        )
    if not re.search(r"[a-z]", value):
        raise serializers.ValidationError(
            "Password must contain at least one lowercase letter."
        )
    if not re.search(r"[A-Z]", value):
        raise serializers.ValidationError(
            "Password must contain at least one uppercase letter."
        )
    if not re.search(r"\d", value):
        raise serializers.ValidationError("Password must contain at least one number.")

    return value
