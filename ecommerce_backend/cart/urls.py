from django.urls import path
from .views import (
    CartDetailView, 
    AddToCartView,
    UpdateCartItemView,
    RemoveCartItemView,
    ClearCartView,
    WishlistDetailView,
    AddToWishlistView,
    RemoveFromWishlistView,
    ClearWishlistView
)

urlpatterns = [
    path("", CartDetailView.as_view(), name="cart-detail"),
    path("add/", AddToCartView.as_view(), name="add-to-cart"),
    path("items/<int:pk>/update/", UpdateCartItemView.as_view(), name="update-cart-item"),
    path("items/<int:pk>/delete/", RemoveCartItemView.as_view(), name="remove-cart-item"),
    path("clear/", ClearCartView.as_view(), name="clear-cart"),
    path("wishlist/", WishlistDetailView.as_view(), name="wishlist-detail"),
    path("wishlist/add/", AddToWishlistView.as_view(), name="add-to-wishlist"),
    path("wishlist/items/<int:pk>/delete/", RemoveFromWishlistView.as_view(), name="remove-from-wishlist"),
    path("wishlist/clear/", ClearWishlistView.as_view(), name="clear-wishlist"),
]










