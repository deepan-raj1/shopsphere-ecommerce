from django.db import models

from orders.models import Order

class Payment(models.Model):

    class PaymentMethod(models.TextChoices):
        COD = 'cod', 'Cash on Delivery'
        CARD = 'card', 'Credit/Debit Card'
        UPI = 'upi', 'UPI Payment'
        NET_BANKING = 'net_banking', 'Net Banking'
        WALLET = 'wallet', 'Digital Wallet'

    class PaymentStatus(models.TextChoices):
        PENDING = 'pending', 'Pending'
        PROCESSING = 'processing', 'Processing'
        SUCCESS = 'success', 'Success'
        FAILED = 'failed', 'Failed'
        REFUNDED = 'refunded', 'Refunded'

    order = models.ForeignKey(Order, on_delete=models.PROTECT, related_name='payments')

    payment_method = models.CharField(max_length=20, choices=PaymentMethod.choices)

    status = models.CharField(max_length=20, choices=PaymentStatus.choices, default=PaymentStatus.PENDING)

    transaction_id = models.CharField(max_length=100, unique=True, blank=True, null=True)

    amount = models.DecimalField(max_digits=12, decimal_places=2)

    currency = models.CharField(max_length=3, default='INR')

    payment_gateway = models.CharField(max_length=50, blank=True, null=True)

    gateway_response = models.JSONField(blank=True, null=True)

    paid_at = models.DateTimeField(blank=True, null=True)

    created_at = models.DateTimeField(auto_now_add=True)

    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        verbose_name = 'Payment'
        verbose_name_plural = 'Payments'
        ordering = ['-created_at']

    def __str__(self):
        return f"{self.order.order_number} - {self.amount} - {self.status}"




    

    