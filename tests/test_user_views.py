import pytest
from rest_framework import status
from rest_framework.test import APIClient

from donation.models import User
from donation.serializers import UserSerializer


@pytest.fixture
def api_client():
    return APIClient()


@pytest.fixture
def user_data():
    return {
        "email": "test@example.com",
        "password": "testpassword",
        "first_name": "Test",
        "last_name": "User",
        "city": "Test City",
        "zip_code": "12-345",
        "phone_number": "12125552368",
    }


@pytest.fixture
def user(user_data):
    return User.objects.create_user(**user_data)


@pytest.fixture
def admin_user():
    return User.objects.create_user(
        email="hospital@example.com",
        password="password123",
        is_hospital=True,
        hospital_name="Test Hospital",
    )


@pytest.fixture
def register_data():
    return {
        "email": "newuser@example.com",
        "password": "newpassword",
        "first_name": "New",
        "last_name": "User",
        "city": "New City",
        "zip_code": "54-321",
        "phone_number": "12125552369",
    }


@pytest.mark.django_db
class TestUserViews:
    def test_register_user(self, api_client, register_data):
        url = "/api/users/register/"
        response = api_client.post(url, register_data, format="json")
        assert response.status_code == status.HTTP_201_CREATED
        assert User.objects.count() == 1

    def test_register_user_invalid_data(self, api_client, register_data):
        url = "/api/users/register/"
        data = register_data.copy()
        data["zip_code"] = "543210"
        data["phone_number"] = "121255523a"
        response = api_client.post(url, data, format="json")
        assert response.status_code == status.HTTP_400_BAD_REQUEST

    def test_login_user(self, api_client, user):
        url = "/api/users/login/"
        data = {"email": user.email, "password": "testpassword"}
        response = api_client.post(url, data, format="json")
        assert response.status_code == status.HTTP_200_OK
        assert "access" in response.data
        assert "refresh" in response.data

    def test_get_user_profile(self, api_client, user):
        api_client.force_authenticate(user=user)
        url = "/api/users/profile/"
        response = api_client.get(url)
        assert response.status_code == status.HTTP_200_OK
        serializer = UserSerializer(user)
        assert response.data == serializer.data

    def test_update_user_profile(self, api_client, user):
        api_client.force_authenticate(user=user)
        url = "/api/users/profile/"
        data = {
            "email": "updated@example.com",
            "password": "updatedpassword",
            "first_name": "Updated",
            "last_name": "User",
            "city": "Updated City",
            "zip_code": "54-321",
            "phone_number": "12125552360",
            "is_hospital": False,
            "hospital_name": "",
            "website_url": "",
        }
        response = api_client.put(url, data, format="json")
        assert response.status_code == status.HTTP_200_OK
        user.refresh_from_db()
        assert user.email == "updated@example.com"

    def test_get_users_as_hospital(self, api_client, admin_user):
        api_client.force_authenticate(user=admin_user)
        url = "/api/users/"
        response = api_client.get(url)
        assert response.status_code == status.HTTP_403_FORBIDDEN

    def test_update_user_profile_invalid_data(self, api_client, user):
        api_client.force_authenticate(user=user)
        url = "/api/users/profile/"
        data = {
            "email": "updated@example.com",
            "password": "updatedpassword",
            "first_name": "Updated",
            "last_name": "User",
            "city": "Updated City",
            "zip_code": "543210",
            "phone_number": "+1212555236",
            "is_hospital": False,
            "hospital_name": "",
            "website_url": "invalid_url",
        }
        response = api_client.put(url, data, format="json")
        assert response.status_code == status.HTTP_400_BAD_REQUEST
