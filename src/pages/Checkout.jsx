import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { clearCart } from '../redux/cart/cartSlice';
import { useAuth } from 'react-oidc-context';
import { useNavigate } from 'react-router-dom';

export default function Checkout() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const auth = useAuth();

  useEffect(() => {
    if (!auth.isAuthenticated) auth.signinRedirect();
  }, [auth]);

  const handleFinish = () => {
    dispatch(clearCart());
    navigate('/');
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] px-4">
      <div className="bg-white p-8 rounded-lg shadow-lg text-center max-w-md w-full">
        <h1 className="text-3xl font-bold text-green-700 mb-4">Thank You!</h1>
        <p className="text-gray-700 text-lg mb-6">
          Your order has been placed successfully.
        </p>
        <button
          onClick={handleFinish}
          className="bg-green-600 hover:bg-green-700 text-white font-semibold px-6 py-2 rounded transition duration-200"
        >
          Continue Shopping
        </button>
      </div>
    </div>
  );
}
