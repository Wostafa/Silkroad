import React from 'react';
import Sidebar from './Sidebar';
import { renderWithProvider, screen } from '../TestUtils';
import userEvent from '@testing-library/user-event';

jest.mock('../Constants', () => {
  return {
    ...jest.requireActual('../Constants'),
    Categories: ['chair'],
    PriceRanges: [[ 0, 50 ]],
  };
});

test('category checkboxes should work correctly', async () => {
  const mockSetFilter = jest.fn(() => {});
  renderWithProvider(<Sidebar setFilters={mockSetFilter} filters={{ categories: {}, priceRange: [] }} />);

  const checkboxCategory = screen.getByRole('checkbox', { name: 'chair' });
  expect(checkboxCategory).toBeInTheDocument();

  userEvent.click(checkboxCategory);
  expect(mockSetFilter).toHaveBeenCalledTimes(1);
  expect(mockSetFilter).toBeCalledWith({ categories: { chair: true }, priceRange: [] });
});

test('price range radios should work correctly', async () => {
  const mockSetFilter = jest.fn(() => {});
  renderWithProvider(<Sidebar setFilters={mockSetFilter} filters={{ categories: {}, priceRange: [] }} />);

  const allPriceRangeRadio = screen.getByRole('radio');
  expect(allPriceRangeRadio).not.toBeChecked();
  userEvent.click(allPriceRangeRadio);
  expect(mockSetFilter).toBeCalledWith( { categories: {}, priceRange: [ 0, 50 ] });
  expect(allPriceRangeRadio).toBeChecked();
});
