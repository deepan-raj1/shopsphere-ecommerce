from django.contrib import admin
from .models import Address, Order, OrderItem

@admin.register(Address)
class AddressAdmin(admin.ModelAdmin):
    list_display = ('id', 'user','full_name', 'phone_number', 'city', 'state', 'postal_code', 'country', 'is_default', 'created_at',)

    list_filter = ('is_default', 'country', 'state', 'city')

    search_fields = ('user__email', 'full_name', 'phone_number', 'city', 'state', 'postal_code', 'country')
    ordering = ('-is_default', '-created_at')

    list_per_page = 20


@admin.register(Order)
class OrderAdmin(admin.ModelAdmin):
    list_display = ('id', 'order_number', 'user', 'status', 'payment_status', 'total_amount', 'created_at',)

    list_filter = ('status', 'payment_status', 'created_at')

    search_fields = ('order_number', 'user__email')

    readonly_fields = ('created_at', 'updated_at')

    ordering = ('-created_at',)

    list_per_page = 20



@admin.register(OrderItem)
class OrderItemAdmin(admin.ModelAdmin):
    list_display = ('id', 'order', 'product', 'product_name', 'product_sku',  'quantity', 'unit_price', 'subtotal', 'created_at',)

    list_filter = ('created_at',)

    search_fields = ('order__order_number', 'product__name', 'product_name', 'product_sku')

    readonly_fields = ('created_at', 'updated_at')

    ordering = ('-created_at',)

    list_per_page = 20



