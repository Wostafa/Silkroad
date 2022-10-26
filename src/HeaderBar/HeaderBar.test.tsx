import React from 'react';
import Header from './HeaderBar';
import { renderWithProvider, screen, fakeProduct } from '../TestUtils';

jest.mock('./Auth', () => ({
  useFirebaseAuth: () => {},
}));

describe('when user in logged out', () => {
  test('login and cart button should be shown', () => {
    renderWithProvider(<Header />);

    expect(screen.queryByTestId('cart-count')?.textContent).toBe('0');
    expect(screen.getByRole('button', { name: /login/i })).toBeInTheDocument();
    expect(screen.queryByRole('button', { name: /logout/i })).not.toBeInTheDocument();
    expect(screen.queryByRole('button', { name: /profile/i })).not.toBeInTheDocument();
  });
});

describe('when user is logged in', () => {
  test('logout, profile and cart button should be shown', async () => {
    const preloadedState = {
      user: {
        current: {
          displayName: 'jack',
          uid: 'xyz',
        },
      },
      cart: {
        products: [fakeProduct],
      },
    };
    renderWithProvider(<Header />, { preloadedState });

    expect(screen.getByTestId('cart-count').textContent).toBe('1');
    expect(screen.getByTestId('display-name')?.textContent).toBe(preloadedState.user.current.displayName);
    expect(screen.getByRole('button', { name: /logout/i })).toBeInTheDocument();
    expect(screen.queryByRole('button', { name: /login/i })).not.toBeInTheDocument();
  });
});
