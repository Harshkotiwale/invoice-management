from django.db import models
from django.core.validators import MinValueValidator

class Invoice(models.Model):
    invoice_number = models.CharField(max_length=100, unique=True)
    customer_name = models.CharField(max_length=200)
    date = models.DateField()
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    @property
    def total_amount(self):
        return sum(detail.line_total for detail in self.details.all())

    def __str__(self):
        return f"{self.invoice_number} - {self.customer_name}"

class InvoiceDetail(models.Model):
    invoice = models.ForeignKey(
        Invoice,
        related_name='details',
        on_delete=models.CASCADE
    )
    description = models.CharField(max_length=255)
    quantity = models.IntegerField(validators=[MinValueValidator(1)])
    unit_price = models.DecimalField(
        max_digits=10,
        decimal_places=2,
        validators=[MinValueValidator(0)]
    )

    @property
    def line_total(self):
        return self.quantity * self.unit_price

    def __str__(self):
        return f"{self.invoice.invoice_number} - {self.description}"