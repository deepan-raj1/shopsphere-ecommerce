from django.contrib import admin
from .models import Cart

@admin.register(Cart)
class CartAdmin(admin.ModelAdmin):
    list_display = (
        'id', 
        'user', 
        'created_at', 
        'updated_at',
    )

    search_fields = ('user__email',)

    list_filter = ('created_at', 'updated_at')

    ordering = ('-created_at',)

    list_per_page = 20

