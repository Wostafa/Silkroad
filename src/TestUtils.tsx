import React from 'react';
import { render, RenderResult } from '@testing-library/react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import type { Product } from './Constants';
import store, { rootReducer, RootState } from './Redux/Store';
import { configureStore } from '@reduxjs/toolkit';
import type { PreloadedState } from '@reduxjs/toolkit';

export const fakeProduct: Product = {
  key: '1',
  name: 'blue chair',
  category: 'chair',
  price: 120,
  image: 'image.png',
  description: 'this is brand new',
};

interface ExtendedRenderOptions {
  preloadedState?: PreloadedState<RootState>;
  store?: typeof store;
}

export const renderWithProvider = (
  ui: React.ReactElement,
  { preloadedState = {}, store = configureStore({ reducer: rootReducer, preloadedState }) }: ExtendedRenderOptions = {}
): RenderResult => {
  const wrapper = ({ children }: { children: React.ReactNode }): JSX.Element => (
    <BrowserRouter>
      <Provider store={store}>{children}</Provider>
    </BrowserRouter>
  );

  return render(ui, { wrapper });
};

export * from '@testing-library/react';
