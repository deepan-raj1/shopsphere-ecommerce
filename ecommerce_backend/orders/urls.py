from django.urls import path
from .views import (
    AddressListView, 
    AddressDetailView,
    AddressCreateView,
    AddressUpdateView,
    AddressDeleteView,
    SetDefaultAddressView,
    CreateOrderView,
    OrderListView
    )

urlpatterns = [
    path("addresses/", AddressListView.as_view(), name="address-list"),
    path("addresses/<int:pk>/", AddressDetailView.as_view(), name="address-detail"),
    path("addresses/create/", AddressCreateView.as_view(), name="address-create"),
    path("addresses/<int:pk>/update/", AddressUpdateView.as_view(), name="address-update"),
    path("addresses/<int:pk>/delete/", AddressDeleteView.as_view(), name="address-delete"),
    path("addresses/<int:pk>/set-default/", SetDefaultAddressView.as_view(), name="set-default-address"),
    path("create/", CreateOrderView.as_view(), name="create-order"),
    path("", OrderListView.as_view(), name="order-list"),
]







