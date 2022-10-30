import React from 'react';
import AddProduct from './AddProduct';
import { renderWithProvider, screen, fakeProduct } from '../TestUtils';
import userEvent from '@testing-library/user-event';

test('choosing image and showing preview should work', () => {
  const fakeImage = 'fakeImage.png';
  window.URL.createObjectURL = jest.fn().mockReturnValue(fakeImage);
  const setProductsUpdated = jest.fn();

  renderWithProvider(<AddProduct setProductsUpdated={setProductsUpdated} />);

  const inputFile: HTMLInputElement = screen.getByTestId('choose-file');
  const imagePreview: HTMLImageElement = screen.getByTestId('file-preview');
  const file = new File(['fakeImage'], fakeImage, { type: 'image/png' });

  userEvent.upload(inputFile, file);
  const chosenFiles = inputFile?.files as FileList;
  expect(chosenFiles[0]).toBe(file);

  expect(imagePreview.src).toContain(fakeImage);
});

test('form inputs should be controlled', async () => {
  const setProductsUpdated = jest.fn();
  renderWithProvider(<AddProduct setProductsUpdated={setProductsUpdated} />);
  const inputName = screen.getByLabelText(/name/i);
  const inputPrice = screen.getByLabelText(/price/i);
  const inputDesc = screen.getByLabelText(/description/i);
  const selectCategory: HTMLSelectElement = screen.getByRole('combobox');

  // checking typed values
  userEvent.type(inputName, fakeProduct.name);
  userEvent.type(inputPrice, String(fakeProduct.price));
  userEvent.type(inputDesc, String(fakeProduct.description));
  userEvent.selectOptions(selectCategory, fakeProduct.category);
  const option: HTMLOptionElement = screen.getByRole('option', { name: 'Chair' });

  expect(inputName).toHaveDisplayValue(fakeProduct.name);
  expect(inputPrice).toHaveDisplayValue(String(fakeProduct.price));
  expect(inputDesc).toHaveDisplayValue(fakeProduct.description);
  expect(option.selected).toBe(true);
});

test('required messages should be shown', async () => {
  const setProductsUpdated = jest.fn();
  renderWithProvider(<AddProduct setProductsUpdated={setProductsUpdated} />);

  userEvent.click(screen.getByRole('button'));
  const errors = await screen.findAllByText(/is required/i);
  expect(errors).toHaveLength(3);
});
