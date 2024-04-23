import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import LandingPage from '../../src/Pages/Landing/Landing'; // Ensure the correct import path
import React from 'react';
import '@testing-library/jest-dom/vitest';
import { BrowserRouter } from 'react-router-dom';

describe('LandingPage Component', () => {
  it('should render the main elements', () => {
    render(
      <BrowserRouter>
        <LandingPage />
      </BrowserRouter>
    );

    expect(
      screen.getByText(/Quality home services, on demand/i)
    ).toBeInTheDocument();
    expect(
      screen.getByText(/Bringing convenience to your doorstep/i)
    ).toBeInTheDocument();
    expect(screen.getByText(/Why SewaXpress\?/i)).toBeInTheDocument();
  });
});
