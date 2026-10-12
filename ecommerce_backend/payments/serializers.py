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

class PaymentStatusUpdateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Payment
        fields = ["status"]

    def validate_status(self, value):
        valid_statuses = [choice[0] for choice in Payment.PaymentStatus.choices]

        if value not in valid_statuses:
            raise serializers.ValidationError("Invalid payment status.")

        return value

