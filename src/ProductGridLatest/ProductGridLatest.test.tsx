import React from 'react';
import ProductGridLatest from './ProductGridLatest';
import { renderWithProvider, screen, fakeProduct } from '../TestUtils';

const mockFakeProductForFirebase = { data: () => ({ ...fakeProduct }) };

jest.mock('firebase/firestore', () => {
  return {
    __esModule: true,
    ...jest.requireActual('firebase/firestore'),
    getDocs: async () => await Promise.resolve([mockFakeProductForFirebase]),
  };
});

test('products should show correctly', async () => {
  renderWithProvider(<ProductGridLatest />);
  expect(await screen.findByText(fakeProduct.name)).toBeInTheDocument();
  expect(screen.getByTestId('grid-wrapper')).toMatchSnapshot();
});
