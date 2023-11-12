from django.urls import path
from . import views

urlpatterns = [
    path('', views.getRoutes, name="routes"),
    path('donations/', views.getDonations, name="donations"),
    path('donations/<str:pk>/', views.getDonation, name="donation"),
    path('donors/', views.getDonors, name="donors"),
    path('donors/<str:pk>/', views.getDonor, name="donor"),
]