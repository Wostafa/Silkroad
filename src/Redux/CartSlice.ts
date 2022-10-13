import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import type { RootState } from './Store';
import { db } from '../Firebase/Database'
import { doc, setDoc, getDocsFromServer, collection, deleteDoc } from "firebase/firestore";
import type { Product } from '../Constants';

interface CartState {
  products: Product[]
}

const initialState: CartState = {
  products: []
}

export const fetchCart = createAsyncThunk('cart/fetchCart', async (userId: string) => {
  const response = await getDocsFromServer(collection(db, `users/${userId}/cart`));
  const productsArray: Product[] = [];
  response.forEach(doc => {
    productsArray.push(doc.data() as Product);
  })
  return productsArray;
});

export const addProduct = createAsyncThunk('cart/addProduct',
  async ({ product, userId }:
    { product: Product, userId: string }) => {
    await setDoc(doc(db, "users", userId, 'cart', product.key), { ...product });
    return product;
  });

export const deleteProduct = createAsyncThunk('cart/deleteProduct',
  async ({ key, userId }: { key: string, userId: string }) => {
    await deleteDoc(doc(db, `users/${userId}/cart`, key));
    return key;
  })
// ---------------------------
const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchCart.fulfilled, (state, action) => {
        state.products = action.payload;
      })
      .addCase(deleteProduct.fulfilled, (state, action) => {
        state.products = state.products.filter(pr => pr.key !== action.payload);
      })
      .addCase(addProduct.fulfilled, (state, action) => {
        state.products.push(action.payload)
      })
  }
})

export const selectCart = (state: RootState): Product[] => state.cart.products;

export default cartSlice.reducer