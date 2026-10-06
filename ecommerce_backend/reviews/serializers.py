from rest_framework import serializers

from .models import Review


class ReviewCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Review
        fields = (
            "product",
            "rating",
            "title",
            "comment",
        )

    def validate_rating(self, value):
        if value < 1 or value > 5:
            raise serializers.ValidationError(
                "Rating must be between 1 and 5."
            )

        return value


class ReviewListSerializer(serializers.ModelSerializer):
    class Meta:
        model = Review
        fields = (
            "id",
            "product",
            "user",
            "rating",
            "title",
            "comment",
            "is_verified_purchase",
            "created_at",
            "updated_at",
        )
        read_only_fields = fields


