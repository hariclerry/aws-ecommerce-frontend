import { configureStore } from '@reduxjs/toolkit';
import productReducer from './products/productSlice';
import cartReducer from './cart/cartSlice';
import orderReducer from './orders/orderSlice';
import paymentReducer from './payments/paymentSlice';
// import authReducer from './auth/authSlice';

export const store = configureStore({
  reducer: {
    products: productReducer,
    cart: cartReducer,
    orders: orderReducer,
    payment: paymentReducer,
    // auth: authReducer,
  },
});
export default store;