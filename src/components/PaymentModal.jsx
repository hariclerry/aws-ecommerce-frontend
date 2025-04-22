// src/components/PaymentModal.js
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { makePayment } from '../redux/payments/paymentSlice';
import { useNavigate } from 'react-router-dom';
import { clearCart } from '../redux/cart/cartSlice';

export default function PaymentModal({
  order,
  userEmail,
  onClose,
  onSuccess,
  totalAmount,
}) {
  const dispatch = useDispatch();
  const payment = useSelector((state) => state.payments);
  const [cardNumber, setCardNumber] = useState('');
  const [expiry, setExpiry] = useState('');
  const [cvc, setCvc] = useState('');
  const [name, setName] = useState('');
  const navigate = useNavigate();

  const handleFinish = () => {
    if (!order?.order_id) return;

    const paymentPayload = {
      order_id: order.order_id,
      payment_method: 'card',
      card_number: cardNumber,
      cvv: cvc,
      expiry_date: expiry,
      amount: totalAmount,
      paid_by: userEmail,
    };

    dispatch(makePayment(paymentPayload)).then((res) => {
      if (res.meta.requestStatus === 'fulfilled') {
        dispatch(clearCart());
        toast.success('Payment successful!');
        navigate('/');
      } else {
        toast.error('Payment failed! Please try again.');
      }
    });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg max-w-md w-full p-6 relative">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-600 hover:text-black text-xl"
        >
          ×
        </button>
        <h2 className="text-2xl font-bold text-gray-800 mb-4">
          Enter Payment Details
        </h2>
        <div className="space-y-4">
          <input
            type="text"
            placeholder="Name on card"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full border p-2 rounded"
            required
          />
          <input
            type="text"
            placeholder="Card number"
            value={cardNumber}
            onChange={(e) => setCardNumber(e.target.value)}
            className="w-full border p-2 rounded"
            maxLength={6}
            required
          />
          <div className="flex gap-2">
            <input
              type="text"
              placeholder="MM/YY"
              value={expiry}
              onChange={(e) => setExpiry(e.target.value)}
              className="w-1/2 border p-2 rounded"
              maxLength={5}
              required
            />
            <input
              type="text"
              placeholder="CVC"
              value={cvc}
              onChange={(e) => setCvc(e.target.value)}
              className="w-1/2 border p-2 rounded"
              maxLength={3}
              required
            />
          </div>
          <button
            onClick={handleFinish}
            disabled={payment?.status === 'loading'}
            className="w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded disabled:opacity-50"
          >
            {payment?.status === 'loading'
              ? 'Processing Payment...'
              : 'Confirm Payment'}
          </button>
          {payment?.error && (
            <p className="text-red-500 mt-2">{payment?.error}</p>
          )}
        </div>
      </div>
    </div>
  );
}
