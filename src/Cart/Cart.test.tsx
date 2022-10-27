import React from 'react';
import { renderWithProvider, screen, fakeProduct, waitForElementToBeRemoved } from '../TestUtils';
import userEvent from '@testing-library/user-event';
import Cart from './Cart';

jest.mock('firebase/firestore', () => {
  return {
    __esModule: true,
    ...jest.requireActual('firebase/firestore'),
    deleteDoc: async () => await Promise.resolve(),
  };
});

test('checkout button should be disabled', () => {
  renderWithProvider(<Cart />);
  expect(screen.getByTestId('checkout')).toBeDisabled();
});

test('total price should be correct', () => {
  const preloadedState = {
    cart: {
      products: [fakeProduct, { ...fakeProduct, key: '2' }],
    },
  };
  renderWithProvider(<Cart />, { preloadedState });
  const totalPrice = screen.getByTestId('total-price');
  expect(Number(totalPrice?.textContent?.replace('$', ''))).toBeCloseTo(fakeProduct.price * 2);
});

test('number of products in list should be correct', () => {
  const preloadedState = {
    cart: {
      products: [fakeProduct, { ...fakeProduct, key: '2' }],
    },
  };
  renderWithProvider(<Cart />, { preloadedState });
  expect(screen.getByTestId('checkout')).toBeEnabled();
  expect(screen.getByRole('list').children.length).toBe(2);
});

test('delete product button should work', async () => {
  const preloadedState = {
    cart: {
      products: [fakeProduct],
    },
  };
  renderWithProvider(<Cart />, { preloadedState });
  const deleteButton = screen.getByTitle(/remove product/i);
  userEvent.click(deleteButton);
  await waitForElementToBeRemoved(() => screen.getByText(fakeProduct.name));
  const totalPrice = screen.getByTestId('total-price');
  expect(totalPrice?.textContent).toBe('$0.00');
});
