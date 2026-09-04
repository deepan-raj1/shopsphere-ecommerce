from django.shortcuts import render

# Create your views here.
from rest_framework.generics import (ListAPIView, RetrieveAPIView, CreateAPIView, UpdateAPIView, DestroyAPIView)
from rest_framework.permissions import AllowAny, IsAuthenticated

from .models import Category, Brand, Product
from .serializers import (CategorySerializer, CategoryCreateSerializer, CategoryUpdateSerializer, BrandSerializer, BrandCreateSerializer, BrandUpdateSerializer, ProductSerializer, ProductCreateSerializer, ProductUpdateSerializer)

class CategoryListView(ListAPIView):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer
    permission_classes = [AllowAny]

    def get_queryset(self):
        return Category.objects.filter(is_active=True).order_by('name')


class CategoryDetailView(RetrieveAPIView):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer
    permission_classes = [AllowAny]

    def get_queryset(self):
        return Category.objects.filter(is_active=True)

class CategoryCreateView(CreateAPIView):
    queryset = Category.objects.all()
    serializer_class = CategoryCreateSerializer
    permission_classes = [IsAuthenticated]

class CategoryUpdateView(UpdateAPIView):
    queryset = Category.objects.all()
    serializer_class = CategoryUpdateSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return Category.objects.all()

class CategoryDeleteView(DestroyAPIView):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return Category.objects.all()

class BrandListView(ListAPIView):
    queryset = Brand.objects.all()
    serializer_class = BrandSerializer
    permission_classes = [AllowAny]

    def get_queryset(self):
        return Brand.objects.filter(is_active=True).order_by('name')

class BrandDetailView(RetrieveAPIView):
    queryset = Brand.objects.all()
    serializer_class = BrandSerializer
    permission_classes = [AllowAny]

    def get_queryset(self):
        return Brand.objects.filter(is_active=True)

class BrandCreateView(CreateAPIView):
    queryset = Brand.objects.all()
    serializer_class = BrandCreateSerializer
    permission_classes = [IsAuthenticated]

class BrandUpdateView(UpdateAPIView):
    queryset = Brand.objects.all()
    serializer_class = BrandUpdateSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return Brand.objects.all()

class BrandDeleteView(DestroyAPIView):
    queryset = Brand.objects.all()
    serializer_class = BrandSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return Brand.objects.all()

class ProductListView(ListAPIView):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer
    permission_classes = [AllowAny]

    def get_queryset(self):
        return Product.objects.filter(is_active=True).select_related('category', 'brand')


class ProductDetailView(RetrieveAPIView):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer
    permission_classes = [AllowAny]

    def get_queryset(self):
        return Product.objects.filter(is_active=True).select_related('category', 'brand')


class ProductCreateView(CreateAPIView):

    serializer_class = ProductCreateSerializer
    permission_classes = [IsAuthenticated]

class ProductUpdateView(UpdateAPIView):

    serializer_class = ProductUpdateSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return Product.objects.all()

