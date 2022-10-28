import React from 'react';
import Products from './Products';
import { renderWithProvider, screen, fakeProduct } from '../TestUtils';
import { waitForElementToBeRemoved } from '@testing-library/react';

const fakeProductTwo = { ...fakeProduct, key: '2', name: 'clock', price: 50 };
const mockProducts = [{ data: () => fakeProduct }, { data: () => fakeProductTwo }];

jest.mock('firebase/firestore', () => {
  return {
    _esModule: true,
    ...jest.requireActual('firebase/firestore'),
    getDocs: async () => await Promise.resolve(mockProducts),
  };
});

test('all products should be shown', async () => {
  renderWithProvider(<Products filters={{ categories: {}, priceRange: [] }} />);

  expect(await screen.findByText(fakeProduct.name)).toBeInTheDocument();
  expect(await screen.findByText(fakeProductTwo.name)).toBeInTheDocument();
});

test('price range filter should work', async () => {

  const renderResult = renderWithProvider(<Products filters={{ categories: {}, priceRange: [0, 50] }} />);
  await waitForElementToBeRemoved(() => screen.getByTestId('loading'));
  expect(screen.getByText(fakeProductTwo.name)).toBeInTheDocument();
  expect(screen.queryByText(fakeProduct.name)).not.toBeInTheDocument();

  renderResult.rerender(<Products filters={{ categories: {}, priceRange: [100, 200] }} />);
  await waitForElementToBeRemoved(() => screen.getByTestId('loading'));
  expect(screen.getByText(fakeProduct.name)).toBeInTheDocument();
  expect(screen.queryByText(fakeProductTwo.name)).not.toBeInTheDocument();

  renderResult.rerender(<Products filters={{ categories: {}, priceRange: [200, 400] }} />);
  await waitForElementToBeRemoved(() => screen.getByTestId('loading'));
  expect(screen.queryByText(fakeProduct.name)).not.toBeInTheDocument();
  expect(screen.queryByText(fakeProductTwo.name)).not.toBeInTheDocument();
});
