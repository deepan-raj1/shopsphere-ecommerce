from django.shortcuts import render

# Create your views here.
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView

from .models import Payment
from .serializers import PaymentCreateSerializer, PaymentListSerializer
from rest_framework.generics import ListAPIView, RetrieveAPIView

class CreatePaymentView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        serializer = PaymentCreateSerializer(data=request.data)

        if not serializer.is_valid():
            return Response(
                serializer.errors,
                status=status.HTTP_400_BAD_REQUEST
            )

        order = serializer.validated_data["order"]

        # Verify that the order belongs to the logged-in user
        if order.user != request.user:
            return Response(
                {"detail": "Order not found."},
                status=status.HTTP_404_NOT_FOUND
            )

        # Prevent multiple payment records for the same order
        if Payment.objects.filter(order=order).exists():
            return Response(
                {
                    "detail": "A payment already exists for this order."
                },
                status=status.HTTP_400_BAD_REQUEST
            )

        payment = serializer.save(
            amount=order.total_amount,
            currency="INR",
            status=Payment.PaymentStatus.PENDING
        )

        return Response(
            {
                "message": "Payment created successfully.",
                "payment_id": payment.id,
                "order_id": payment.order.id,
                "order_number": payment.order.order_number,
                "payment_method": payment.payment_method,
                "status": payment.status,
                "amount": str(payment.amount),
                "currency": payment.currency,
            },
            status=status.HTTP_201_CREATED
        )

class PaymentListView(ListAPIView):
    serializer_class = PaymentListSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return Payment.objects.filter(
            order__user=self.request.user
        ).order_by("-created_at")


class PaymentDetailView(RetrieveAPIView):
    serializer_class = PaymentListSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return Payment.objects.filter(
            order__user=self.request.user
        )

