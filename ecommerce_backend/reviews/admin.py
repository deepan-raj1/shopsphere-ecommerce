from django.contrib import admin
from .models import Review

@admin.register(Review)
class ReviewAdmin(admin.ModelAdmin):
    list_display = ('id','product', 'user', 'rating', 'title', 'is_verified_purchase', 'is_active', 'created_at')

    list_filter = ('rating', 'is_verified_purchase', 'is_active', 'created_at')

    search_fields = ('product__name', 'user__email', 'title', 'comment')

    readonly_fields = ('created_at', 'updated_at')

    ordering = ('-created_at',)

    list_per_page = 20


