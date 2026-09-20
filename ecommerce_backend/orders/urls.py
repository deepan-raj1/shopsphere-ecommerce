from django.urls import path
from .views import (
    AddressListView, 
    AddressDetailView,
    AddressCreateView)

urlpatterns = [
    path("addresses/", AddressListView.as_view(), name="address-list"),
    path("addresses/<int:pk>/", AddressDetailView.as_view(), name="address-detail"),
    path("addresses/create/", AddressCreateView.as_view(), name="address-create"),
]


