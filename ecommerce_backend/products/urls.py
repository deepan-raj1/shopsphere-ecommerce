from django.urls import path

from .views import (CategoryListView, CategoryDetailView, CategoryCreateView, CategoryUpdateView, CategoryDeleteView, BrandListView, BrandDetailView, BrandCreateView, BrandUpdateView)

urlpatterns = [
    path('categories/', CategoryListView.as_view(), name='category-list'),
    path('categories/<int:pk>/', CategoryDetailView.as_view(), name='category-detail'),
    path('categories/create/', CategoryCreateView.as_view(), name='category-create'),
    path('categories/<int:pk>/update/', CategoryUpdateView.as_view(), name='category-update'),
    path('categories/<int:pk>/delete/', CategoryDeleteView.as_view(), name='category-delete'),
    path('brands/', BrandListView.as_view(), name='brand-list'),
    path('brands/<int:pk>/', BrandDetailView.as_view(), name='brand-detail'),
    path('brands/create/', BrandCreateView.as_view(), name='brand-create'),
    path('brands/<int:pk>/update/', BrandUpdateView.as_view(), name='brand-update'),
]



