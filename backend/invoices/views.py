from rest_framework import viewsets, status
from rest_framework.response import Response
from django.db.models import Q
from .models import Invoice
from .serializers import InvoiceSerializer

class InvoiceViewSet(viewsets.ModelViewSet):
    queryset = Invoice.objects.all().order_by('-date')
    serializer_class = InvoiceSerializer

    def get_queryset(self):
        queryset = Invoice.objects.all().order_by('-date')
        search = self.request.query_params.get('search', None)
        if search:
            queryset = queryset.filter(
                Q(invoice_number__icontains=search) |
                Q(customer_name__icontains=search)
            )
        return queryset