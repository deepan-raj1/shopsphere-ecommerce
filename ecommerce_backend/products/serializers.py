from rest_framework import serializers

from .models import Category, Brand, Product

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

class ProductSerializer(serializers.ModelSerializer):

    category_name = serializers.CharField(source='category.name', read_only=True)
    brand_name = serializers.CharField(source='brand.name', read_only=True)

    class Meta:
        model = Product
        fields = ('id', 'category', 'category_name', 'brand', 'brand_name', 'name', 'slug', 'sku', 'description', 'price', 'discount_price', 'stock', 'thumbnail', 'is_active', 'created_at', 'updated_at')


class ProductCreateSerializer(serializers.ModelSerializer):

    class Meta:
        model = Product

        fields = (
            "category",
            "brand",
            "name",
            "slug",
            "sku",
            "description",
            "price",
            "discount_price",
            "stock",
            "thumbnail",
            "is_active",
        )

