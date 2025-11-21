from django.conf import settings
from django.conf.urls.static import static
from django.contrib import admin
from django.urls import include, path
from drf_spectacular.views import (
    SpectacularAPIView,
    SpectacularRedocView,
    SpectacularSwaggerView,
)

from donation.views.health_check import health_check


urlpatterns = [
    path("admin/", admin.site.urls),
    path("health/", health_check, name="health_check"),
    path("api/donations/", include("donation.urls.donation_urls")),
    path("api/users/", include("donation.urls.user_urls")),
    path("api/schema", SpectacularAPIView.as_view(), name="schema"),
    path("api/schema/redoc/", SpectacularRedocView.as_view(), name="redoc"),
    path("", SpectacularSwaggerView.as_view(), name="docs"),
]
urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)
