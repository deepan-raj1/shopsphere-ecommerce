from django.urls import path

from .views import (
    CreatePaymentView,
    PaymentListView,
)


urlpatterns = [
    path("create/", CreatePaymentView.as_view(), name="payment-create"),
    path("", PaymentListView.as_view(), name="payment-list"),
]

