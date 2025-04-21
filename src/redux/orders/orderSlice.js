// src/redux/orders/orderSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const BASE_URL = process.env.REACT_APP_API_URL; // Replace with your actual API URL

export const placeOrder = createAsyncThunk(
  'orders/placeOrder',
  async ({ cartItems }, thunkAPI) => {
    console.log('Placing order with items:', cartItems);
    const payload = {
      cart_number: Math.floor(Math.random() * 1000000),
      // total_amount: cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0).toFixed(2),
      total_amount: cartItems.reduce((sum, item) => {
        const price = Number(item.product_price) || 0;
        return sum + price * item.quantity;
      }, 0).toFixed(2),      
      order_items: cartItems.map((item) => ({
        product_id: item.product_id,
        qty: item.quantity,
      })),
    };

    try {
      const res = await fetch(`${BASE_URL}/order`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (!res.ok) throw new Error('Order request failed');

      return await res.json();
    } catch (err) {
      return thunkAPI.rejectWithValue(err.message);
    }
  }
);

const orderSlice = createSlice({
  name: 'orders',
  initialState: {
    data: null,
    status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(placeOrder.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(placeOrder.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.data = action.payload;
      })
      .addCase(placeOrder.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload || 'Something went wrong';
      });
  },
});

export default orderSlice.reducer;
