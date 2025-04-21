import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  items: JSON.parse(localStorage.getItem('cartItems')) || []
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const item = state.items.find(i => i.product_id === action.payload.product_id);
      if (item) {
        item.quantity += 1;
      } else {
        state.items.push({ ...action.payload, quantity: 1 });
      }
      localStorage.setItem('cartItems', JSON.stringify(state.items));
    },
    removeFromCart: (state, action) => {
      state.items = state.items.filter(i => i.product_id !== action.payload);
      localStorage.setItem('cartItems', JSON.stringify(state.items));
    },    
    clearCart: (state) => {
      state.items = [];
      localStorage.setItem('cartItems', JSON.stringify([]));
    },
    incrementQuantity: (state, action) => {
      const item = state.items.find(i => i.product_id === action.payload);
      if (item) item.quantity += 1;
    },
    decrementQuantity: (state, action) => {
      const item = state.items.find(i => i.product_id === action.payload);
      if (item && item.quantity > 1) item.quantity -= 1;
    }
    
  },
});

export const { addToCart, removeFromCart, clearCart, incrementQuantity, decrementQuantity } = cartSlice.actions;
export default cartSlice.reducer;
