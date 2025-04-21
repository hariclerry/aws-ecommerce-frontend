// src/pages/Cart.js
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  removeFromCart,
  incrementQuantity,
  decrementQuantity,
} from '../redux/cart/cartSlice';
import { Link, useNavigate } from 'react-router-dom';

export default function Cart() {
  const cartItems = useSelector((state) => state.cart.items);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const total = cartItems.reduce(
    (acc, item) => acc + item.product_price * item.quantity,
    0
  );
  console.log('Cart page loaded');
  return (
    <div className="max-w-4xl mx-auto px-4 py-6">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-3xl font-semibold text-gray-800">Your Cart</h1>
        <button
          onClick={() => navigate('/')}
          className="text-sm text-blue-600 hover:underline"
        >
          ← Continue Shopping
        </button>
      </div>

      <p className="text-gray-600 mb-6">
        You have{' '}
        <span className="font-semibold text-gray-800">{cartItems.length}</span>{' '}
        item{cartItems.length !== 1 && 's'} in your cart.
      </p>

      {cartItems.length === 0 ? (
        <p className="text-gray-500 text-lg">Your cart is empty.</p>
      ) : (
        <div className="space-y-4">
          {cartItems.map((item) => (
            <div
              key={item.product_id}
              className="flex items-center justify-between bg-white shadow-sm rounded-lg p-4 border border-gray-200"
            >
              <div className="flex items-center gap-4">
                <img
                  src={
                    item.image_url || 'https://placehold.co/80x80?text=Image'
                  }
                  alt={item.product_name}
                  className="w-20 h-20 object-cover rounded"
                />
                <div>
                  <h2 className="text-lg font-medium text-gray-900">
                    {item.product_name}
                  </h2>
                  <p className="text-sm text-gray-600">
                    Price: ${item.product_price}
                  </p>
                  <div className="flex items-center gap-2 mt-2">
                    <button
                      onClick={() =>
                        dispatch(decrementQuantity(item.product_id))
                      }
                      className="px-2 py-1 bg-gray-200 text-gray-800 rounded hover:bg-gray-300"
                    >
                      −
                    </button>
                    <span className="text-sm font-medium">{item.quantity}</span>
                    <button
                      onClick={() =>
                        dispatch(incrementQuantity(item.product_id))
                      }
                      className="px-2 py-1 bg-gray-200 text-gray-800 rounded hover:bg-gray-300"
                    >
                      +
                    </button>
                  </div>
                  <p className="text-sm text-gray-800 font-semibold mt-2">
                    Subtotal: ${item.product_price * item.quantity}
                  </p>
                </div>
              </div>
              <div className="text-right">
                <button
                  onClick={() => dispatch(removeFromCart(item.product_id))}
                  className="text-sm text-red-600 hover:underline"
                >
                  Remove
                </button>
              </div>
            </div>
          ))}

          <div className="flex justify-between items-center mt-6 border-t pt-4">
            <p className="text-xl font-semibold text-gray-800">Total:</p>
            <p className="text-xl font-bold text-green-700">
              ${total.toFixed(2)}
            </p>
          </div>

          <Link
            to="/checkout"
            className="block w-full text-center bg-green-600 hover:bg-green-700 text-white font-medium py-3 rounded-lg mt-4 transition"
          >
            Proceed to Checkout
          </Link>
        </div>
      )}
    </div>
  );
}
