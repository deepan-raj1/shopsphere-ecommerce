from django.urls import path

from .views import (
    CreatePaymentView,
    PaymentListView,
    PaymentDetailView,
    PaymentStatusUpdateView
)


urlpatterns = [
    path("create/", CreatePaymentView.as_view(), name="payment-create"),
    path("", PaymentListView.as_view(), name="payment-list"),
    path("<int:pk>/", PaymentDetailView.as_view(), name="payment-detail"),
    path("<int:pk>/status/", PaymentStatusUpdateView.as_view(), name="payment-status-update"),
]


