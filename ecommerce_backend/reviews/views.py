from django.shortcuts import render

# Create your views here.
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView

from .models import Review
from .serializers import ReviewCreateSerializer


class CreateReviewView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        serializer = ReviewCreateSerializer(data=request.data)

        if not serializer.is_valid():
            return Response(
                serializer.errors,
                status=status.HTTP_400_BAD_REQUEST
            )

        product = serializer.validated_data["product"]

        if Review.objects.filter(
            user=request.user,
            product=product
        ).exists():
            return Response(
                {
                    "detail": "You have already reviewed this product."
                },
                status=status.HTTP_400_BAD_REQUEST
            )

        review = serializer.save(
            user=request.user,
            is_verified_purchase=False
        )

        return Response(
            {
                "message": "Review created successfully.",
                "review_id": review.id
            },
            status=status.HTTP_201_CREATED
        )


