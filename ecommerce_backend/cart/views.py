from django.shortcuts import render

# Create your views here.
from rest_framework.generics import RetrieveAPIView, GenericAPIView, CreateAPIView, UpdateAPIView, DestroyAPIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from rest_framework.views import APIView

from .models import Cart, CartItem, Wishlist, WishlistItem
from .serializers import CartSerializer, AddToCartSerializer, UpdateCartItemSerializer, WishlistItemSerializer, WishlistSerializer, AddToWishlistSerializer
from products.models import Product

class CartDetailView(RetrieveAPIView):

    serializer_class = CartSerializer
    permission_classes = [IsAuthenticated]

    def get_object(self):

        cart, created = Cart.objects.get_or_create(
            user=self.request.user
        )

        return cart


class AddToCartView(GenericAPIView):

    serializer_class = AddToCartSerializer
    permission_classes = [IsAuthenticated]

    def post(self, request):

        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        product_id = serializer.validated_data["product_id"]
        quantity = serializer.validated_data["quantity"]

        product = Product.objects.get(id=product_id)

        cart, created = Cart.objects.get_or_create(
            user=request.user
        )

        cart_item, created = CartItem.objects.get_or_create(
            cart=cart,
            product=product,
            defaults={"quantity": quantity}
        )

        if not created:
            cart_item.quantity += quantity
            cart_item.save()

        return Response(
            {
                "message": "Product added to cart successfully."
            },
            status=status.HTTP_200_OK
        )


class UpdateCartItemView(UpdateAPIView):

    serializer_class = UpdateCartItemSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return CartItem.objects.filter(
            cart__user=self.request.user
        )

    def patch(self, request, *args, **kwargs):

        cart_item = self.get_object()

        serializer = self.get_serializer(
            data=request.data
        )

        serializer.is_valid(raise_exception=True)

        cart_item.quantity = serializer.validated_data[
            "quantity"
        ]

        cart_item.save()

        return Response(
            {
                "message": "Cart item updated successfully.",
                "quantity": cart_item.quantity
            }
        )


class RemoveCartItemView(DestroyAPIView):

    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return CartItem.objects.filter(
            cart__user=self.request.user
        )


class ClearCartView(APIView):

    permission_classes = [IsAuthenticated]

    def delete(self, request):

        cart, created = Cart.objects.get_or_create(
            user=request.user
        )

        deleted_count, _ = cart.items.all().delete()

        return Response(
            {
                "message": "Cart cleared successfully.",
                "deleted_items": deleted_count
            },
            status=status.HTTP_200_OK
        )

class WishlistDetailView(RetrieveAPIView):

    serializer_class = WishlistSerializer
    permission_classes = [IsAuthenticated]

    def get_object(self):

        wishlist, created = Wishlist.objects.get_or_create(
            user=self.request.user
        )

        return wishlist


class AddToWishlistView(GenericAPIView):

    serializer_class = AddToWishlistSerializer
    permission_classes = [IsAuthenticated]

    def post(self, request):

        serializer = self.get_serializer(
            data=request.data
        )

        serializer.is_valid(
            raise_exception=True
        )

        product = Product.objects.get(
            id=serializer.validated_data["product_id"]
        )

        wishlist, created = Wishlist.objects.get_or_create(
            user=request.user
        )

        wishlist_item, created = WishlistItem.objects.get_or_create(
            wishlist=wishlist,
            product=product
        )

        if not created:
            return Response(
                {
                    "message": "Product already exists in wishlist."
                },
                status=status.HTTP_200_OK
            )

        return Response(
            {
                "message": "Product added to wishlist successfully."
            },
            status=status.HTTP_201_CREATED
        )


class RemoveFromWishlistView(DestroyAPIView):

    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return WishlistItem.objects.filter(
            wishlist__user=self.request.user
        )


