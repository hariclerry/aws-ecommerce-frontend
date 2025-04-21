import { createSlice } from '@reduxjs/toolkit';
import { products } from '../../data/products';

const productSlice = createSlice({
  name: 'products',
  initialState: {
    items: products,
    searchQuery: '',
  },
  reducers: {
    setSearchQuery: (state, action) => {
      state.searchQuery = action.payload;
    },
  },
});

export const { setSearchQuery } = productSlice.actions;
export default productSlice.reducer;
