from django.urls import path

from .views import CreateReviewView, ReviewListView


urlpatterns = [
    path("create/", CreateReviewView.as_view(), name="review-create"),
    path("", ReviewListView.as_view(), name="review-list"),
]



