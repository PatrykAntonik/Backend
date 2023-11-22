from rest_framework import serializers
from .models import *
from rest_framework_simplejwt.tokens import RefreshToken


class UserSerializer(serializers.ModelSerializer):
    id = serializers.SerializerMethodField(read_only=True)
    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'is_donor', 'is_hospital']

    def get_id(self, obj):
        return obj.id

class UserSerializerToken(UserSerializer):
    token = serializers.SerializerMethodField(read_only=True)
    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'token']
    def get_token(self, obj):
        token = RefreshToken.for_user(obj)
        return str(token.access_token)

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
