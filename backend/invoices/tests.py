from django.test import TestCase
from rest_framework.test import APITestCase
from rest_framework import status
from django.urls import reverse
from .models import Invoice, InvoiceDetail
from decimal import Decimal

class InvoiceModelTests(TestCase):
    def setUp(self):
        self.invoice = Invoice.objects.create(
            invoice_number="TEST001",
            customer_name="Test Customer",
            date="2024-01-01"
        )
        self.detail = InvoiceDetail.objects.create(
            invoice=self.invoice,
            description="Test Product",
            quantity=2,
            unit_price=Decimal("10.00")
        )

    def test_invoice_total_amount(self):
        self.assertEqual(self.invoice.total_amount, Decimal("20.00"))

    def test_invoice_str_representation(self):
        self.assertEqual(str(self.invoice), "TEST001 - Test Customer")

    def test_invoice_detail_line_total(self):
        self.assertEqual(self.detail.line_total, Decimal("20.00"))

class InvoiceAPITests(APITestCase):
    def setUp(self):
        self.invoice_data = {
            "invoice_number": "API001",
            "customer_name": "API Customer",
            "date": "2024-01-01",
            "details": [
                {
                    "description": "Product A",
                    "quantity": 2,
                    "unit_price": "10.00"
                }
            ]
        }

    def test_create_invoice(self):
        url = reverse('invoice-list')
        response = self.client.post(url, self.invoice_data, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(Invoice.objects.count(), 1)
        self.assertEqual(InvoiceDetail.objects.count(), 1)

    def test_get_invoice_list(self):
        # Create an invoice first
        url = reverse('invoice-list')
        self.client.post(url, self.invoice_data, format='json')
        
        # Get list of invoices
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data['results']), 1)

    def test_update_invoice(self):
        # Create an invoice
        url = reverse('invoice-list')
        response = self.client.post(url, self.invoice_data, format='json')
        invoice_id = response.data['id']

        # Update the invoice
        update_data = self.invoice_data.copy()
        update_data['customer_name'] = "Updated Customer"
        url = reverse('invoice-detail', args=[invoice_id])
        response = self.client.put(url, update_data, format='json')
        
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['customer_name'], "Updated Customer")

    def test_delete_invoice(self):
        # Create an invoice
        url = reverse('invoice-list')
        response = self.client.post(url, self.invoice_data, format='json')
        invoice_id = response.data['id']

        # Delete the invoice
        url = reverse('invoice-detail', args=[invoice_id])
        response = self.client.delete(url)
        
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)
        self.assertEqual(Invoice.objects.count(), 0)

    def test_invoice_search(self):
        # Create two invoices
        url = reverse('invoice-list')
        self.client.post(url, self.invoice_data, format='json')
        
        second_invoice = self.invoice_data.copy()
        second_invoice['invoice_number'] = 'API002'
        second_invoice['customer_name'] = 'Another Customer'
        self.client.post(url, second_invoice, format='json')

        # Search for invoices
        response = self.client.get(f"{url}?search=API001")
        self.assertEqual(len(response.data['results']), 1)
        self.assertEqual(response.data['results'][0]['invoice_number'], 'API001')