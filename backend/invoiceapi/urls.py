from django.contrib import admin
from django.urls import path, include
from django.http import HttpResponse

# Simple view for the root URL
def root_view(request):
    return HttpResponse("<h1>Welcome to the Invoice Management System</h1>")

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include('invoices.urls')),
    path('', root_view),  # Add a root URL handler here
]
