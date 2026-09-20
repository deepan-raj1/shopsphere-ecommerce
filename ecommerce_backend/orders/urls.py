from django.urls import path
from .views import AddressListView

urlpatterns = [
    path("addresses/", AddressListView.as_view(), name="address-list"),
]

