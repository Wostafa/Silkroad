import React, { PropsWithChildren } from 'react';
import Search from './Search';
import userEvent from '@testing-library/user-event';
import { renderWithProvider, screen, fakeProduct } from '../TestUtils';

const mockClickHandler = jest.fn();
jest.mock('react-router-dom', () => {
  const original = jest.requireActual('react-router-dom');
  return {
    ...original,
    Link: ({ children }: PropsWithChildren<{}>) => {
      return (
        <a href='#' onClick={mockClickHandler}>
          {children}
        </a>
      );
    },
  };
});

const preloadedState = {
  products: {
    products: [fakeProduct],
  },
};

test('searchbox should show the result', () => {
  renderWithProvider(<Search />, { preloadedState });

  const input = screen.getByRole('searchbox');
  const resultWrapper = screen.queryByTestId('result-wrapper');
  expect(resultWrapper).not.toBeVisible();

  userEvent.type(input, 'b');
  expect(input).toHaveValue('b');
  expect(resultWrapper).not.toBeVisible();

  userEvent.type(input, 'l');
  expect(input).toHaveValue('bl');
  expect(resultWrapper).toBeVisible();
  const result = screen.getByText(fakeProduct.name);

  userEvent.click(result);
  expect(mockClickHandler).toHaveBeenCalledTimes(1);

  userEvent.clear(input);
  expect(resultWrapper).not.toBeVisible();
});

test('searchbox should not show any result', () => {
  renderWithProvider(<Search />, { preloadedState });

  const input = screen.getByRole('searchbox');
  const resultWrapper = screen.queryByTestId('result-wrapper');
  userEvent.type(input, 'unknown product');
  expect(resultWrapper).not.toBeVisible();
});
