import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import type {RootState} from './Store';
import type {Product} from '../Constants';
import { collectionGroup, getDocs } from 'firebase/firestore';
import { db } from '../Firebase/Database';

interface ProductType {
  products: Product[]
}

const initialState: ProductType = {
  products: []
}

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {},
  extraReducers (builder){
    builder
    .addCase(fetchAllProducts.fulfilled, (state, action)=> {
      state.products = action.payload;
    })
  }
})

export const fetchAllProducts = createAsyncThunk('products/fetchAllProducts', async()=>{
  const query = collectionGroup(db, 'products');
      const docs = await getDocs(query);

      const productsArray: Product[] = [];
      docs.forEach(doc => {
        productsArray.push(doc.data() as Product);
      });
      return productsArray;
});

export const selectAllProducts = (state: RootState): Product[] => state.products.products;
export default productsSlice.reducer
