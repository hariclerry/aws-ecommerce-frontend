// src/components/ProductCard.js
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addToCart } from '../redux/cart/cartSlice';
import { motion, AnimatePresence } from 'framer-motion';

export default function ProductCard({ product }) {
  const dispatch = useDispatch();
  const [showModal, setShowModal] = useState(false);

  return (
    <div className="bg-white border border-gray-200 rounded-lg shadow hover:shadow-md transition-shadow duration-200 p-4 flex flex-col h-full">
      <img
        src={product.image_url || 'https://placehold.co/300x200?text=No+Image'}
        alt={product.product_name}
        className="w-full h-48 object-cover rounded mb-4"
        onError={(e) => {
          e.target.onerror = null;
          e.target.src = 'https://placehold.co/300x200?text=No+Image';
        }}
      />
      <div className="flex-1">
        <h2 className="text-lg font-semibold text-gray-800 mb-2">
          {product.product_name}
        </h2>
        <p className="text-sm text-gray-600 line-clamp-2">
          {product.product_desc}
        </p>
        <p className="text-gray-800 font-semibold mt-2">
          ${product.product_price}
        </p>
      </div>
      <div className="mt-4 flex justify-between items-center">
        <button
          onClick={() => dispatch(addToCart(product))}
          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded transition-colors duration-200"
        >
          Add to Cart
        </button>
        <button
          onClick={() => setShowModal(true)}
          className="text-blue-600 hover:underline text-sm"
        >
          See Details
        </button>
      </div>

      <AnimatePresence>
        {showModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full relative"
            >
              <button
                onClick={() => setShowModal(false)}
                className="absolute top-2 right-2 text-gray-600 hover:text-black"
              >
                ×
              </button>
              <img
                src={
                  product.image_url ||
                  'https://placehold.co/300x200?text=No+Image'
                }
                alt={product.product_name}
                className="w-full h-48 object-cover rounded mb-4"
              />
              <h3 className="text-xl font-bold text-gray-800 mb-2">
                {product.product_name}
              </h3>
              <p className="text-gray-700 mb-4">{product.product_desc}</p>
              <p className="text-lg font-semibold text-green-700">
                ${product.product_price}
              </p>
              <button
                onClick={() => {
                  dispatch(addToCart(product));
                  setShowModal(false);
                }}
                className="mt-4 w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded"
              >
                Add to Cart
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
