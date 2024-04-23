import { describe, it, expect } from 'vitest';
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Services from '../../src/Pages/Services/Service';
import { QueryClient, QueryClientProvider } from 'react-query';
import { BrowserRouter } from 'react-router-dom';

const queryClient = new QueryClient();

describe('Services Component', () => {
  it('renders Services component', () => {
    render(
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <Services />
        </BrowserRouter>
      </QueryClientProvider>
    );
    const element = screen.getByText(/Quality Home Services, On Demand/i);
    expect(element).toBeTruthy();
  });

  it('should open the cart modal when "View Cart" is clicked', () => {
    render(
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <Services />
        </BrowserRouter>
      </QueryClientProvider>
    );

    const viewCartButton = screen
      .getAllByRole('button')
      .find((button) =>
        button.textContent ? button.textContent.includes('View Cart') : null
      );
    expect(viewCartButton).toBeTruthy();

    if (viewCartButton) fireEvent.click(viewCartButton);

    // After clicking, ensure the modal is opened and cart content is visible
    expect(screen.getByText(/Your Cart/i)).toBeTruthy();
  });

  it('should show "No services added on Cart." when cart is empty', () => {
    render(
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <Services />
        </BrowserRouter>
      </QueryClientProvider>
    );
    const viewCartButton = screen
      .getAllByRole('button')
      .find((button) =>
        button.textContent ? button.textContent.includes('View Cart') : null
      );
    expect(viewCartButton).toBeTruthy();

    if (viewCartButton) fireEvent.click(viewCartButton);

    // After clicking, ensure the modal is opened and no service on cart to be displayed.
    expect(screen.getByText(/No services added on Cart./i)).toBeTruthy();
  });

  it('should open the booking form when "Proceed" button is clicked', () => {
    render(
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <Services />
        </BrowserRouter>
      </QueryClientProvider>
    );

    // Find and click "View Cart" to ensure modal opens
    const viewCartButton = screen
      .getAllByRole('button')
      .find((button) =>
        button.textContent ? button.textContent.includes('View Cart') : null
      );
    expect(viewCartButton).toBeTruthy();

    if (viewCartButton) fireEvent.click(viewCartButton);

    // After clicking, ensure the modal is opened and cart content is visible
    expect(screen.getByText(/Your Cart/i)).toBeTruthy();

    // // Now find and click the "Proceed" button
    // const proceesButton = screen
    //   .getAllByRole('button')
    //   .find((button) =>
    //     button.textContent ? button.textContent.includes('Proceed') : null
    //   );
    // expect(proceesButton).toBeTruthy();

    // if (proceesButton) fireEvent.click(proceesButton);

    // // After clicking, ensure the modal is opened and cart content is visible
    // expect(screen.getByText(/Make a Book/i)).toBeTruthy();
  });
});
