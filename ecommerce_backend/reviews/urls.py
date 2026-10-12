from django.urls import path

from .views import (
    CreateReviewView, 
    ReviewListView, 
    ReviewDetailView,
    ReviewUpdateView,
)


urlpatterns = [
    path("create/", CreateReviewView.as_view(), name="review-create"),
    path("", ReviewListView.as_view(), name="review-list"),
    path("<int:pk>/", ReviewDetailView.as_view(), name="review-detail"),
    path("<int:pk>/update/", ReviewUpdateView.as_view(), name="review-update"),
]




