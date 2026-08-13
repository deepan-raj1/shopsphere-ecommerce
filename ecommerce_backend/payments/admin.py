from django.contrib import admin

from .models import Payment

@admin.register(Payment)
class PaymentAdmin(admin.ModelAdmin):
    list_display = ('id', 'order', 'payment_method', 'status', 'amount', 'currency', 'transaction_id', 'payment_gateway', 'paid_at', 'created_at')

    list_filter = ('payment_method', 'status', 'payment_gateway',  'currency', 'created_at')

    search_fields = ('order__order_number', 'transaction_id')

    readonly_fields = ('created_at', 'updated_at')

    list_per_page = 20


