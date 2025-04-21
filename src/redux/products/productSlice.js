// import { products } from '../../data/products';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const BASE_URL = process.env.REACT_APP_API_URL; // Replace with your actual API URL

// Async thunk using fetch API
export const fetchProducts = createAsyncThunk(
  'products/fetchProducts',
  async (_, thunkAPI) => {
    try {
      const res = await fetch(`${BASE_URL}/products`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          // Add any other headers you need, like Authorization
        },
      });
      if (!res.ok) throw new Error('Network response was not ok');
      const data = await res.json();
      return data.items;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.message);
    }
  }
);

const productSlice = createSlice({
  name: 'products',
  initialState: {
    items: [],
    searchQuery: '',
    loading: false,
    error: null,
  },
  reducers: {
    setSearchQuery: (state, action) => {
      state.searchQuery = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Failed to fetch products';
      });
  },
});

export const { setSearchQuery } = productSlice.actions;
export default productSlice.reducer;
