mport React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { InvoiceList } from '../InvoiceList';
import { InvoiceProvider } from '../../contexts/InvoiceContext';

const mockInvoices = [
  {
    id: 1,
    invoice_number: 'TEST001',
    customer_name: 'Test Customer',
    date: '2024-01-01',
    total_amount: '100.00'
  }
];

jest.mock('../../contexts/InvoiceContext', () => ({
  ...jest.requireActual('../../contexts/InvoiceContext'),
  useInvoice: () => ({
    invoices: mockInvoices,
    loading: false,
    fetchInvoices: jest.fn(),
    deleteInvoice: jest.fn()
  })
}));

describe('InvoiceList Component', () => {
  it('renders invoice list correctly', () => {
    render(
      <InvoiceProvider>
        <InvoiceList onEdit={() => {}} />
      </InvoiceProvider>
    );

    expect(screen.getByText('TEST001')).toBeInTheDocument();
    expect(screen.getByText('Test Customer')).toBeInTheDocument();
    expect(screen.getByText('$100.00')).toBeInTheDocument();
  });

  it('handles search input', async () => {
    const mockFetchInvoices = jest.fn();
    jest.mock('../../contexts/InvoiceContext', () => ({
      useInvoice: () => ({
        invoices: mockInvoices,
        loading: false,
        fetchInvoices: mockFetchInvoices,
      })
    }));

    render(
      <InvoiceProvider>
        <InvoiceList onEdit={() => {}} />
      </InvoiceProvider>
    );

    const searchInput = screen.getByPlaceholderText('Search invoices...');
    fireEvent.change(searchInput, { target: { value: 'TEST' } });

    await waitFor(() => {
      expect(mockFetchInvoices).toHaveBeenCalledWith('TEST');
    });
  });
});