# from rest_framework.decorators import api_view, permission_classes
# from rest_framework.response import Response
# from donation.models import *
# from donation.serializers import *
# from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
# from rest_framework_simplejwt.views import TokenObtainPairView
# from rest_framework.permissions import IsAuthenticated, IsAdminUser
#
# class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
#     def validate(self, attrs):
#         data = super().validate(attrs)
#         serializer = UserSerializerToken(self.user).data
#         for i, j in serializer.items():
#             data[i] = j
#         return data
#
# class MyTokenObtainPairView(TokenObtainPairView):
#     serializer_class = MyTokenObtainPairSerializer
#
#
# # DONORS
# @api_view(['GET'])
# # @permission_classes([IsAuthenticated])
# def getDonor(request, pk):
#     donor = Donor.objects.get(user_id=pk)
#     serializer = DonorSerializer(donor, many=False)
#     return Response(serializer.data)
#
# @api_view(['GET'])
# # @permission_classes([IsAuthenticated])
# def getDonors(request):
#     donors = Donor.objects.all()
#     serializer = DonorSerializer(donors, many=True)
#     return Response(serializer.data)
