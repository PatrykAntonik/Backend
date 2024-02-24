"""
URL configuration for transplantApp project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include
from django.views.generic import TemplateView
from django.urls import re_path

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/donations/', include('donation.urls.donation_urls')),
    path('api/users/', include('donation.urls.user_urls')),
    path(r'', TemplateView.as_view(template_name="index.html")),
    re_path(r'.*', TemplateView.as_view(template_name="index.html")),

]

# urlpatterns += [re_path(r'^.*$', TemplateView.as_view(template_name="index.html"))]
