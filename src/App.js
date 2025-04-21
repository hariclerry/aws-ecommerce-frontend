import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import { useAuth } from 'react-oidc-context';
// import Login from './pages/Login';

function App() {
  const auth = useAuth();
console.log('Auth state:', auth.isAuthenticated, auth.isLoading);
  if (auth.isLoading) return <p>Loading auth session...</p>;
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/checkout" element={<Checkout />} />
        {/* <Route path="/login" element={<Login />} /> */}
      </Routes>
    </Router>
  );
}

export default App;
