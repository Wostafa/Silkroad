import React from 'react';
import Product from './Product';
import userEvent from '@testing-library/user-event';
import { renderWithProvider, screen, fakeProduct } from '../TestUtils';
import * as Router from 'react-router-dom';

const mockFakeProduct = { ...fakeProduct };
const mockFakeProductForFirebase = { id: fakeProduct.key, data: () => ({ ...fakeProduct }) };

jest.mock('react-router-dom', () => {
  return {
    __esModule: true,
    ...jest.requireActual('react-router-dom'),
  };
});

jest.mock('firebase/firestore', () => {
  return {
    __esModule: true,
    ...jest.requireActual('firebase/firestore'),
    getDocs: async () => await Promise.resolve({ docs: [mockFakeProductForFirebase] }),
    setDoc: async () => await Promise.resolve(),
  };
});

afterEach(() => {
  jest.restoreAllMocks();
});

test('should load product data from router', () => {
  jest.spyOn(Router, 'useLocation').mockImplementation((): any => ({ state: mockFakeProduct }));
  renderWithProvider(<Product />);
  expect(screen.getByText(fakeProduct.name)).toBeInTheDocument();
});

test('should get product key from router and fetch product', async () => {
  jest.spyOn(Router, 'useParams').mockImplementation(() => ({ id: mockFakeProductForFirebase.id }));
  renderWithProvider(<Product />);
  expect(await screen.findByText(fakeProduct.name)).toBeInTheDocument();
});

test('add to cart button should work', async () => {
  jest.spyOn(Router, 'useLocation').mockImplementation((): any => ({ state: mockFakeProduct }));
  const preloadedState = {
    user: {
      current: {
        displayName: null,
        uid: 'xyz',
      },
    },
  };

  renderWithProvider(<Product />, { preloadedState });
  userEvent.click(screen.getByRole('button'));
  expect(await screen.findByText(/product added to cart/i, undefined, { timeout: 2000 })).toBeInTheDocument();
});
