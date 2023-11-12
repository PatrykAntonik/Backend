from rest_framework import serializers
from .models import *

class DonationSerializer(serializers.ModelSerializer):
    donor_city = serializers.SerializerMethodField()
    donor_name = serializers.SerializerMethodField()
    class Meta:
        model = Donation
        fields = '__all__'
    def get_donor_city(self, obj):
        return obj.donor.city
    def get_donor_name(self, obj):
        return obj.donor.user.first_name + ' ' + obj.donor.user.last_name


class DonorSerializer(serializers.ModelSerializer):
    class Meta:
        model = Donor
        fields = '__all__'