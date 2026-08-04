from django.conf import settings
from django.db import models
from products.models import Product

class Cart(models.Model):
    user = models.OneToOneField(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='cart')
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        verbose_name = 'Cart'
        verbose_name_plural = 'Carts'
        ordering = ['-created_at']

    def __str__(self):
        return f"{self.user.email}'s Cart"


class CartItem(models.Model):
    cart = models.ForeignKey(Cart, on_delete=models.CASCADE, related_name='items')
    product = models.ForeignKey(Product, on_delete=models.CASCADE, related_name='cart_items')
    quantity = models.PositiveIntegerField(default=1)

    created_at = models.DateTimeField(auto_now_add=True)

    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        verbose_name = 'Cart Item'
        verbose_name_plural = 'Cart Items'

        ordering = ['-created_at']

        constraints = [
            models.UniqueConstraint(
                fields=['cart', 'product'],
                name='unique_cart_product'
            )
        ]

    @property
    def subtotal(self):
        price = self.product.discount_price or self.product.price
        return price * self.quantity

    def __str__(self):
        return f"{self.product.name} x {self.quantity} in {self.cart.user.email}'s Cart"

