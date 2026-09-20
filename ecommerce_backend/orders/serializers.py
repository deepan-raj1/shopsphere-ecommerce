from rest_framework import serializers
from .models import Address


class AddressSerializer(serializers.ModelSerializer):

    class Meta:
        model = Address

        fields = (
            "id",
            "full_name",
            "phone_number",
            "address_line1",
            "address_line2",
            "city",
            "state",
            "postal_code",
            "country",
            "is_default",
            "created_at",
            "updated_at",
        )

        read_only_fields = (
            "id",
            "created_at",
            "updated_at",
        )


class AddressCreateSerializer(serializers.ModelSerializer):

    class Meta:
        model = Address

        fields = (
            "full_name",
            "phone_number",
            "address_line1",
            "address_line2",
            "city",
            "state",
            "postal_code",
            "country",
            "is_default",
        )

class AddressUpdateSerializer(serializers.ModelSerializer):

    class Meta:
        model = Address

        fields = (
            "full_name",
            "phone_number",
            "address_line1",
            "address_line2",
            "city",
            "state",
            "postal_code",
            "country",
            "is_default",
        )

        