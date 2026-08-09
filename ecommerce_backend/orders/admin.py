from django.contrib import admin
from .models import Address

@admin.register(Address)
class AddressAdmin(admin.ModelAdmin):
    list_display = ('id', 'user','full_name', 'phone_number', 'city', 'state', 'postal_code', 'country', 'is_default', 'created_at',)

    list_filter = ('is_default', 'country', 'state', 'city')

    search_fields = ('user__email', 'full_name', 'phone_number', 'city', 'state', 'postal_code', 'country')
    ordering = ('-is_default', '-created_at')

    list_per_page = 20



