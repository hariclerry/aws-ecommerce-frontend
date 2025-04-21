import { configureStore } from '@reduxjs/toolkit';
import productReducer from './products/productSlice';
import cartReducer from './cart/cartSlice';
// import authReducer from './auth/authSlice';

export const store = configureStore({
  reducer: {
    products: productReducer,
    cart: cartReducer,
    // auth: authReducer,
  },
});
export default store;