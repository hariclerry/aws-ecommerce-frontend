import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import AuthButtons from './AuthButtons';
import { useAuth } from 'react-oidc-context';

export default function Navbar() {
  const cartItems = useSelector((state) => state.cart.items);
  const auth = useAuth();
  // const user = useSelector(state => state.auth.user);

  return (
    <nav className="flex justify-between p-6 bg-gray-800 text-white">
      <Link to="/" className="text-xl font-bold">
        SH-Shop
      </Link>
      <div className="flex gap-4">
        {auth.isAuthenticated && <AuthButtons />}
        <Link to="/cart" className="relative">
          <span>Cart</span>
          <span className="absolute -top-2 -right-3 bg-red-600 text-white text-xs rounded-full px-2">
            {cartItems.length}
          </span>
        </Link>
        {/* <Link to="/cart">Cart ({cartItems.length})</Link> */}
        {/* {user ? <span>Welcome, {user.name}</span> : <Link to="/login">Login</Link>} */}
      </div>
    </nav>
  );
}
