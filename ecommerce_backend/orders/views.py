from django.shortcuts import render, get_object_or_404

# Create your views here.
from rest_framework.generics import ListAPIView, RetrieveAPIView, CreateAPIView, UpdateAPIView, DestroyAPIView
from rest_framework.permissions import IsAuthenticated

from .models import Address
from .serializers import AddressSerializer, AddressCreateSerializer, AddressUpdateSerializer

from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status

class AddressListView(ListAPIView):

    serializer_class = AddressSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return Address.objects.filter(
            user=self.request.user
        )

class AddressDetailView(RetrieveAPIView):

    serializer_class = AddressSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return Address.objects.filter(
            user=self.request.user
        )

class AddressCreateView(CreateAPIView):

    serializer_class = AddressCreateSerializer
    permission_classes = [IsAuthenticated]

    def perform_create(self, serializer):

        if serializer.validated_data.get(
            "is_default",
            False
        ):
            Address.objects.filter(
                user=self.request.user,
                is_default=True
            ).update(is_default=False)

        serializer.save(
            user=self.request.user
        )

class AddressUpdateView(UpdateAPIView):

    serializer_class = AddressUpdateSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return Address.objects.filter(
            user=self.request.user
        )

    def perform_update(self, serializer):

        if serializer.validated_data.get("is_default", False):

            Address.objects.filter(
                user=self.request.user,
                is_default=True
            ).exclude(
                pk=self.get_object().pk
            ).update(is_default=False)

        serializer.save()



class AddressDeleteView(DestroyAPIView):

    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return Address.objects.filter(
            user=self.request.user
        )


class SetDefaultAddressView(APIView):

    permission_classes = [IsAuthenticated]

    def post(self, request, pk):

        address = get_object_or_404(
            Address,
            pk=pk,
            user=request.user
        )

        Address.objects.filter(
            user=request.user,
            is_default=True
        ).update(is_default=False)

        address.is_default = True
        address.save()

        return Response(
            {
                "message": "Default address updated successfully."
            },
            status=status.HTTP_200_OK
        )


