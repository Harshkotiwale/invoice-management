import React, { useState } from 'react';
import { InvoiceProvider } from './contexts/InvoiceContext';
import { InvoiceList } from './components/InvoiceList';
import { InvoiceForm } from './components/InvoiceForm';
import { Toaster } from 'react-hot-toast';

function App() {
  const [editingInvoice, setEditingInvoice] = useState(null);
  const [isFormOpen, setIsFormOpen] = useState(false);

  return (
    <InvoiceProvider>
      <div className="min-h-screen bg-gray-100">
        <Toaster position="top-right" />
        <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          <div className="px-4 py-6 sm:px-0">
            <div className="flex justify-between items-center mb-6">
              <h1 className="text-3xl font-bold text-gray-900">Invoices</h1>
              <button
                onClick={() => {
                  setEditingInvoice(null);
                  setIsFormOpen(true);
                }}
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
              >
                Create Invoice
              </button>
            </div>

            {isFormOpen ? (
              <div className="bg-white shadow rounded-lg p-6">
                <InvoiceForm
                  invoice={editingInvoice}
                  onClose={() => {
                    setIsFormOpen(false);
                    setEditingInvoice(null);
                  }}
                />
              </div>
            ) : (
              <div className="bg-white shadow rounded-lg p-6">
                <InvoiceList
                  onEdit={(invoice) => {
                    setEditingInvoice(invoice);
                    setIsFormOpen(true);
                  }}
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </InvoiceProvider>
  );
}

export default App;