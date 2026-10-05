from django.shortcuts import render, get_object_or_404

# Create your views here.
from rest_framework.generics import ListAPIView, RetrieveAPIView, CreateAPIView, UpdateAPIView, DestroyAPIView
from rest_framework.permissions import IsAuthenticated

from cart.models import Cart
from .models import Address, Order, OrderItem
from .serializers import AddressSerializer, AddressCreateSerializer, AddressUpdateSerializer, CreateOrderSerializer, OrderListSerializer, OrderDetailSerializer

from decimal import Decimal
from uuid import uuid4

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


class CreateOrderView(APIView):

    permission_classes = [IsAuthenticated]

    def post(self, request):

        serializer = CreateOrderSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        shipping_address_id = serializer.validated_data[
            "shipping_address_id"
        ]

        notes = serializer.validated_data.get(
            "notes",
            ""
        )

        try:
            address = Address.objects.get(
                id=shipping_address_id,
                user=request.user
            )
        except Address.DoesNotExist:
            return Response(
                {
                    "error": "Invalid shipping address."
                },
                status=status.HTTP_400_BAD_REQUEST
            )

        cart = Cart.objects.filter(
            user=request.user
        ).first()

        if not cart or not cart.items.exists():
            return Response(
                {
                    "error": "Cart is empty."
                },
                status=status.HTTP_400_BAD_REQUEST
            )

        subtotal = Decimal("0.00")

        for item in cart.items.all():

            price = (
                item.product.discount_price
                or item.product.price
            )

            subtotal += price * item.quantity

        shipping_cost = Decimal("0.00")
        tax = Decimal("0.00")
        discount = Decimal("0.00")

        total_amount = (
            subtotal
            + shipping_cost
            + tax
            - discount
        )

        order = Order.objects.create(
            user=request.user,
            shipping_address=address,
            order_number=uuid4().hex[:12].upper(),
            subtotal=subtotal,
            shipping_cost=shipping_cost,
            tax=tax,
            discount=discount,
            total_amount=total_amount,
            notes=notes,
        )

        for item in cart.items.all():

            price = (
                item.product.discount_price
                or item.product.price
            )

            OrderItem.objects.create(
                order=order,
                product=item.product,
                product_name=item.product.name,
                product_sku=item.product.sku,
                quantity=item.quantity,
                unit_price=price,
                subtotal=price * item.quantity,
            )

        cart.items.all().delete()

        return Response(
            {
                "message": "Order created successfully.",
                "order_id": order.id,
                "order_number": order.order_number,
            },
            status=status.HTTP_201_CREATED
        )


class OrderListView(ListAPIView):
    serializer_class = OrderListSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return Order.objects.filter(
            user=self.request.user
        ).order_by("-created_at")


class OrderDetailView(RetrieveAPIView):
    serializer_class = OrderDetailSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return Order.objects.filter(
            user=self.request.user
        )

class CancelOrderView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request, pk):
        try:
            order = Order.objects.get(
                id=pk,
                user=request.user
            )
        except Order.DoesNotExist:
            return Response(
                {"detail": "Order not found."},
                status=status.HTTP_404_NOT_FOUND
            )

        if order.status not in ["pending", "confirmed"]:
            return Response(
                {
                    "detail": (
                        f"Order cannot be cancelled because its "
                        f"current status is '{order.status}'."
                    )
                },
                status=status.HTTP_400_BAD_REQUEST
            )

        order.status = "cancelled"
        order.save(update_fields=["status", "updated_at"])

        return Response(
            {
                "message": "Order cancelled successfully.",
                "order_id": order.id,
                "order_number": order.order_number,
                "status": order.status
            },
            status=status.HTTP_200_OK
        )


