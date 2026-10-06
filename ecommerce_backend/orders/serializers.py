from rest_framework import serializers
from .models import Address, Order


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

class CreateOrderSerializer(serializers.Serializer):

    shipping_address_id = serializers.IntegerField()

    notes = serializers.CharField(
        required=False,
        allow_blank=True
    )


class OrderListSerializer(serializers.ModelSerializer):
    class Meta:
        model = Order
        fields = (
            "id",
            "order_number",
            "status",
            "payment_status",
            "subtotal",
            "shipping_cost",
            "tax",
            "discount",
            "total_amount",
            "created_at",
            "updated_at",
        )
        read_only_fields = fields


class OrderDetailSerializer(serializers.ModelSerializer):
    class Meta:
        model = Order
        fields = (
            "id",
            "order_number",
            "status",
            "payment_status",
            "subtotal",
            "shipping_cost",
            "tax",
            "discount",
            "total_amount",
            "notes",
            "created_at",
            "updated_at",
        )
        read_only_fields = fields


class OrderStatusUpdateSerializer(serializers.Serializer):
    status = serializers.ChoiceField(
        choices=[
            "pending",
            "confirmed",
            "processing",
            "shipped",
            "delivered",
            "cancelled",
        ]
    )

