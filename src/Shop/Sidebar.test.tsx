import React from 'react';
import Sidebar from './Sidebar';
import { renderWithProvider, screen, fakeProduct } from '../TestUtils';
import userEvent from '@testing-library/user-event';

jest.mock('../Constants', () => {
  const mockCategories = ['chair'];
  const mockPriceRange = [[ 0, 50 ]];
  return {
    ...jest.requireActual('../Constants'),
    Categories: mockCategories,
    PriceRanges: mockPriceRange,
  };
});

test('category checkboxes should work work correctly', async () => {
  const mockSetFilter = jest.fn(x => {});
  renderWithProvider(<Sidebar setFilters={mockSetFilter} filters={{ categories: {}, priceRange: [] }} />);

  const checkboxCategory = screen.getByRole('checkbox', { name: fakeProduct.category });
  expect(checkboxCategory).toBeInTheDocument();

  userEvent.click(checkboxCategory);
  expect(mockSetFilter).toHaveBeenCalledTimes(1);
  expect(mockSetFilter).toBeCalledWith({ categories: { chair: true }, priceRange: [] });
});

test('price range radios should work work correctly', async () => {
  const mockSetFilter = jest.fn(x => {
    console.log(x)
  });
  renderWithProvider(<Sidebar setFilters={mockSetFilter} filters={{ categories: {}, priceRange: [] }} />);

  const allPriceRangeRadio = screen.getAllByRole('radio');
  expect(allPriceRangeRadio[0]).not.toBeChecked();
  userEvent.click(allPriceRangeRadio[0]);
  expect(mockSetFilter).toBeCalledWith( { categories: {}, priceRange: [ 0, 50 ] });
  expect(allPriceRangeRadio[0]).toBeChecked();
});
