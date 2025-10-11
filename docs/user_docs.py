from drf_spectacular.utils import extend_schema

from donation.serializers import UserSerializer, UserSerializerToken


register_user_docs = extend_schema(
    summary="Register a new user",
    description="Creates a new user and returns the user data along with a token.",
    responses={201: UserSerializerToken},
    tags=["Users"],
)

get_user_profile_docs = extend_schema(
    summary="Get user profile",
    description="Returns the profile of the currently authenticated user.",
    responses={200: UserSerializer},
    tags=["Users"],
)

update_user_profile_docs = extend_schema(
    summary="Update user profile",
    description="Updates the profile of the currently authenticated user.",
    responses={200: UserSerializerToken},
    tags=["Users"],
)

get_users_docs = extend_schema(
    summary="List all users",
    description="Returns a list of all non-hospital users. Requires admin privileges.",
    responses={200: UserSerializer(many=True)},
    tags=["Users"],
)

login_user_docs = extend_schema(
    summary="Login a user",
    description="Authenticates a user and returns a token.",
    responses={200: UserSerializerToken},
    tags=["Users"],
)
