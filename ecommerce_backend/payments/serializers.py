from rest_framework import serializers

from .models import Payment


class PaymentCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Payment
        fields = (
            "order",
            "payment_method",
        )

class PaymentListSerializer(serializers.ModelSerializer):
    class Meta:
        model = Payment
        fields = (
            "id",
            "order",
            "payment_method",
            "status",
            "transaction_id",
            "amount",
            "currency",
            "payment_gateway",
            "paid_at",
            "created_at",
            "updated_at",
        )
        read_only_fields = fields

