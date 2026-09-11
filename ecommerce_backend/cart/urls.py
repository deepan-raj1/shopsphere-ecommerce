from django.urls import path
from .views import (
    CartDetailView, 
    AddToCartView,
    UpdateCartItemView
)

urlpatterns = [
    path(
        "",
        CartDetailView.as_view(),
        name="cart-detail"
    ),
    path(
        "add/",
        AddToCartView.as_view(),
        name="add-to-cart"
    ),
    path(
    "items/<int:pk>/update/",
    UpdateCartItemView.as_view(),
    name="update-cart-item"
    ),
]

