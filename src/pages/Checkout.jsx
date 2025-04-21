// src/pages/Checkout.js
import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useAuth } from 'react-oidc-context';
import { placeOrder } from '../redux/orders/orderSlice';
import { clearCart } from '../redux/cart/cartSlice';
import PaymentModal from '../components/PaymentModal';

export default function Checkout() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const auth = useAuth();
  const cartItems = useSelector((state) => state.cart.items);
  const order = useSelector((state) => state.orders);
  const [showPayment, setShowPayment] = useState(false);

  useEffect(() => {
    if (!auth.isAuthenticated && !auth.isLoading) {
      auth.signinRedirect({ state: { returnTo: '/checkout' } });
    }
  }, [auth]);

  useEffect(() => {
    if (order?.status === 'succeeded') {
      setShowPayment(true);
    }
  }, [order?.status]);

  if (!auth.isAuthenticated) return null;

  const handlePlaceOrder = () => {
    dispatch(placeOrder({ cartItems }));
  };

  const handlePaymentSuccess = () => {
    dispatch(clearCart());
    setShowPayment(false);
    navigate('/');
  };
  console.log('Payment order:', cartItems);
  const totalAmount = cartItems
    .reduce((sum, item) => {
      const price = Number(item.product_price) || 0;
      return sum + price * item.quantity;
    }, 0)
    .toFixed(2);

  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] px-4">
      <div className="bg-white p-8 rounded-lg shadow-lg text-center max-w-md w-full">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">Checkout</h1>
        <p className="text-gray-700 mb-6">
          You're almost there! Click below to confirm your order and proceed to
          payment.
        </p>
        {order.error && <p className="text-red-500 mb-4">{order.error}</p>}
        <button
          onClick={handlePlaceOrder}
          disabled={order.status === 'loading'}
          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-2 rounded disabled:opacity-50"
        >
          {order.status === 'loading' ? 'Placing Order...' : 'Place Order'}
        </button>
      </div>

      {showPayment && (
        <PaymentModal
          order={order.data}
          userEmail={auth.user?.profile?.email || 'guest'}
          onClose={() => setShowPayment(false)}
          onSuccess={handlePaymentSuccess}
          totalAmount={totalAmount}
        />
      )}
    </div>
  );
}
