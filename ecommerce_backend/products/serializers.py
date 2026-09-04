from rest_framework import serializers

from .models import Category, Brand

class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category

        fields = ('id', 'name', 'slug', 'description', 'image', 'is_active', 'created_at', 'updated_at')

class CategoryCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = ('name', 'slug', 'description', 'image', 'is_active')

class CategoryUpdateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = ('name', 'slug', 'description', 'image', 'is_active')

class BrandSerializer(serializers.ModelSerializer):
    class Meta:
        model = Brand
        fields = ('id', 'name', 'slug', 'description', 'logo', 'is_active', 'created_at', 'updated_at')


class BrandCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Brand
        fields = ('name', 'slug', 'description', 'logo', 'is_active')


class BrandUpdateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Brand
        fields = ('name', 'slug', 'description', 'logo', 'is_active')

