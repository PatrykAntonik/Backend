from django.urls import path

from donation.views.donation_views import (
    DonationDetailView,
    DonationListView,
    DonationResponsesView,
    MyDonationsView,
    MyResponsesView,
    createDonation,
    deleteDonation,
    getDonationTypeQuestions,
    getQuestions,
)


urlpatterns = [
    path("", DonationListView.as_view(), name="donations"),
    path(
        "<int:donation_id>/questions/",
        getDonationTypeQuestions,
        name="donation-questions",
    ),
    path("questions/", getQuestions, name="questions"),
    path("myresponses/", MyResponsesView.as_view(), name="myresponses"),
    path(
        "<int:donation_id>/responses/",
        DonationResponsesView.as_view(),
        name="donation-responses",
    ),
    path("mydonations/", MyDonationsView.as_view(), name="mydonations"),
    path("create/", createDonation, name="create-donation"),
    path("<int:pk>/delete/", deleteDonation, name="delete-donation"),
    path("<str:pk>/", DonationDetailView.as_view(), name="donation"),
]
