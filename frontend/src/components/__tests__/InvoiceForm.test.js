import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { InvoiceForm } from '../InvoiceForm';
import { InvoiceProvider } from '../../contexts/InvoiceContext';

const mockCreateInvoice = jest.fn();
const mockUpdateInvoice = jest.fn();

jest.mock('../../contexts/InvoiceContext', () => ({
  useInvoice: () => ({
    createInvoice: mockCreateInvoice,
    updateInvoice: mockUpdateInvoice
  })
}));

describe('InvoiceForm Component', () => {
  const mockOnClose = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders empty form correctly', () => {
    render(
      <InvoiceProvider>
        <InvoiceForm onClose={mockOnClose} />
      </InvoiceProvider>
    );

    expect(screen.getByLabelText(/Invoice Number/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Customer Name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Date/i)).toBeInTheDocument();
    expect(screen.getByText(/Add Item/i)).toBeInTheDocument();
  });

  it('handles form submission', async () => {
    render(
      <InvoiceProvider>
        <InvoiceForm onClose={mockOnClose} />
      </InvoiceProvider>
    );

    fireEvent.change(screen.getByLabelText(/Invoice Number/i), {
      target: { value: 'INV001' }
    });
    fireEvent.change(screen.getByLabelText(/Customer Name/i), {
      target: { value: 'Test Customer' }
    });
    fireEvent.change(screen.getByLabelText(/Description/i), {
      target: { value: 'Test Product' }
    });
    fireEvent.change(screen.getByLabelText(/Quantity/i), {
      target: { value: '1' }
    });
    fireEvent.change(screen.getByLabelText(/Unit Price/i), {
      target: { value: '100' }
    });

    fireEvent.click(screen.getByText(/Create Invoice/i));

    await waitFor(() => {
      expect(mockCreateInvoice).toHaveBeenCalledWith(expect.objectContaining({
        invoice_number: 'INV001',
        customer_name: 'Test Customer',
        details: expect.arrayContaining([
          expect.objectContaining({
            description: 'Test Product',
            quantity: 1,
            unit_price: 100
          })
        ])
      }));
    });
  });
});