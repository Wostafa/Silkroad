import { configureStore, combineReducers } from '@reduxjs/toolkit';
import userReducer from './UserSlice';
import cartReducer from './CartSlice';
import productsReducer from './ProductsSlice'

const rootReducer = combineReducers({
  user: userReducer,
  cart: cartReducer,
  products: productsReducer
})

const store = configureStore({
  reducer: rootReducer
})

export default store;
export {rootReducer}
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch