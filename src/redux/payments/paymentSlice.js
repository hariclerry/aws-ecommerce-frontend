// src/redux/payments/paymentSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const BASE_URL = process.env.REACT_APP_API_URL; // Replace with your actual API URL
export const makePayment = createAsyncThunk(
  'payments/makePayment',
  async (paymentData, thunkAPI) => {
    try {
      const response = await fetch(`${BASE_URL}/payment`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(paymentData),
      });

      if (!response.ok) throw new Error('Payment failed');

      return await response.json();
    } catch (err) {
      return thunkAPI.rejectWithValue(err.message);
    }
  }
);

const paymentSlice = createSlice({
  name: 'payments',
  initialState: {
    status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
    data: null,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(makePayment.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(makePayment.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.data = action.payload;
      })
      .addCase(makePayment.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload || 'Payment failed';
      });
  },
});

export default paymentSlice.reducer;
