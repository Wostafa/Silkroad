import React from 'react';
import { renderWithProvider, screen } from '../TestUtils';
import userEvent from '@testing-library/user-event';
import Subscribe from './Subscribe';
import * as Firebase from 'firebase/firestore';

jest.mock('firebase/firestore', () => {
  return {
    __esModule: true,
    ...jest.requireActual('firebase/firestore'),
  };
});

test('should verify the email', async () => {
  renderWithProvider(<Subscribe />);

  const input = screen.getByRole('textbox');
  const button = screen.getByRole('button');

  expect(button).not.toBeDisabled();
  userEvent.type(input, 'halfEmailAddress');
  expect(button).toBeDisabled();
  userEvent.type(input, '@theRest.com');
  expect(button).not.toBeDisabled();
});

test('should subscribe to the email', async () => {
  renderWithProvider(<Subscribe />);
  jest.spyOn(Firebase, 'updateDoc').mockImplementation(async () => {
    return await Promise.resolve();
  });
  userEvent.type(screen.getByRole('textbox'), 'email@gmail.com');
  userEvent.click(screen.getByRole('button'));
  expect(await screen.findByText(/your email added/i, undefined, { timeout: 2000 })).toBeInTheDocument();
});

test('should show an error', async () => {
  renderWithProvider(<Subscribe />);
  jest.spyOn(Firebase, 'updateDoc').mockImplementation(async () => {
    return await Promise.reject(new Error());
  });
  userEvent.type(screen.getByRole('textbox'), 'email@gmail.com');
  userEvent.click(screen.getByRole('button'));
  expect(await screen.findByText(/failed to add email/i, undefined, { timeout: 2000 })).toBeInTheDocument();
});
