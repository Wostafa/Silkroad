import React from 'react';
import UserProducts from './UserProducts';
import { renderWithProvider, screen, fakeProduct, waitForElementToBeRemoved } from '../TestUtils';
import userEvent from '@testing-library/user-event';
import * as FireBase from 'firebase/firestore';

const preloadedState = {
  user: {
    current: {
      displayName: '',
      uid: 'xyz',
    },
  },
};
const mockProducts = [{ data: () => fakeProduct }];

jest.mock('firebase/firestore', () => ({
  __esModule: true,
  ...jest.requireActual('firebase/firestore'),
  deleteDoc: async () => await Promise.resolve(),
}));

test('product should be shown and removing it works ', async () => {
  jest
    .spyOn(FireBase, 'getDocsFromServer')
    .mockImplementation(async (): Promise<any> => await Promise.resolve(mockProducts));

  renderWithProvider(<UserProducts productsUpdated={Date.now()} />, { preloadedState });
  await waitForElementToBeRemoved(() => screen.getByTestId('loading'));
  expect(screen.getByText(fakeProduct.name)).toBeInTheDocument();

  // removing
  jest.spyOn(FireBase, 'getDocsFromServer').mockImplementation(async (): Promise<any> => await Promise.resolve([]));
  userEvent.click(screen.getByRole('button'));
  await waitForElementToBeRemoved(() => screen.getByText(fakeProduct.name));
  expect(await screen.findByText(/you have no product/i)).toBeInTheDocument();
});
