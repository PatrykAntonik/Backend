import pytest
from rest_framework import status
from rest_framework.test import APIClient

from donation.models import Donation, DonationResponse, Question, User


@pytest.fixture
def api_client():
    return APIClient()


@pytest.fixture
def user():
    return User.objects.create_user(
        username="testuser@example.com",
        email="testuser@example.com",
        password="password123",
        phone_number="+12125552368",
        is_hospital=False,
    )


@pytest.fixture
def hospital_user():
    return User.objects.create_user(
        username="hospital@example.com",
        email="hospital@example.com",
        password="password123",
        phone_number="+12125552369",
        is_hospital=True,
        hospital_name="Test Hospital",
    )


@pytest.fixture
def question():
    return Question.objects.create(text="Test Question?", donation_type="blood")


@pytest.fixture
def donation(user, question):
    d = Donation.objects.create(donor=user, donation_type="blood")
    DonationResponse.objects.create(donation=d, question=question, answer=True)
    return d


@pytest.mark.django_db
class TestDonationViews:
    def test_get_donations_as_hospital(self, api_client, hospital_user, donation):
        hospital_user.is_staff = True
        hospital_user.save()
        api_client.force_authenticate(user=hospital_user)
        url = "/api/donations/"
        response = api_client.get(url)
        assert response.status_code == status.HTTP_200_OK
        assert len(response.data) == 1

    def test_get_donations_as_user(self, api_client, user, donation):
        api_client.force_authenticate(user=user)
        url = "/api/donations/"
        response = api_client.get(url)
        assert response.status_code == status.HTTP_403_FORBIDDEN

    def test_create_donation(self, api_client, user, question):
        api_client.force_authenticate(user=user)
        url = "/api/donations/create/"
        data = {
            "donation_type": "blood",
            "responses": [{"question_id": question.id, "answer": True}],
        }
        response = api_client.post(url, data, format="json")
        assert response.status_code == status.HTTP_200_OK
        assert Donation.objects.count() == 1

    def test_delete_donation(self, api_client, user, donation):
        api_client.force_authenticate(user=user)
        url = f"/api/donations/{donation.id}/delete/"
        response = api_client.delete(url)
        assert response.status_code == status.HTTP_200_OK
        assert Donation.objects.count() == 0

    def test_get_donation(self, api_client, user, donation):
        api_client.force_authenticate(user=user)
        url = f"/api/donations/{donation.id}/"
        response = api_client.get(url)
        assert response.status_code == status.HTTP_200_OK
        assert response.data["id"] == donation.id

    def test_get_my_donations(self, api_client, user, donation):
        api_client.force_authenticate(user=user)
        url = "/api/donations/mydonations/"
        response = api_client.get(url)
        assert response.status_code == status.HTTP_200_OK
        assert len(response.data) == 1

    def test_get_questions(self, api_client, question):
        url = "/api/donations/questions/"
        response = api_client.get(url)
        assert response.status_code == status.HTTP_200_OK
        assert len(response.data) == 1

    def test_get_donation_type_questions(self, api_client, donation, question):
        url = f"/api/donations/{donation.id}/questions/"
        response = api_client.get(url)
        assert response.status_code == status.HTTP_200_OK
        assert len(response.data) == 1

    def test_get_my_responses(self, api_client, user, donation):
        api_client.force_authenticate(user=user)
        url = "/api/donations/myresponses/"
        response = api_client.get(url)
        assert response.status_code == status.HTTP_200_OK
        assert len(response.data) == 1

    def test_get_donation_responses(self, api_client, user, donation):
        api_client.force_authenticate(user=user)
        url = f"/api/donations/{donation.id}/responses/"
        response = api_client.get(url)
        assert response.status_code == status.HTTP_200_OK
        assert len(response.data) == 1
