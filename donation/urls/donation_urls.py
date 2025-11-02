from django.urls import path

from donation.views.donation_views import (
    DonationCreateView,
    DonationDeleteView,
    DonationDetailView,
    DonationListView,
    DonationResponsesView,
    DonationTypeQuestionsView,
    MyDonationListView,
    MyResponsesView,
    QuestionListView,
)


urlpatterns = [
    path("", DonationListView.as_view(), name="donations"),
    path(
        "<int:donation_id>/questions/",
        DonationTypeQuestionsView.as_view(),
        name="donation-questions",
    ),
    path("questions/", QuestionListView.as_view(), name="questions"),
    path("myresponses/", MyResponsesView.as_view(), name="myresponses"),
    path(
        "<int:donation_id>/responses/",
        DonationResponsesView.as_view(),
        name="donation-responses",
    ),
    path("mydonations/", MyDonationListView.as_view(), name="mydonations"),
    path("create/", DonationCreateView.as_view(), name="create-donation"),
    path("<int:pk>/delete/", DonationDeleteView.as_view(), name="delete-donation"),
    path("<int:pk>/", DonationDetailView.as_view(), name="donation"),
]
