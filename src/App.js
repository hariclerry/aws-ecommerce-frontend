import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import { useAuth } from 'react-oidc-context';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
// import Login from './pages/Login';

function App() {
  const auth = useAuth();
  if (auth.isLoading) return <p>Loading auth session...</p>;
  return (
    <>

    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/checkout" element={<Checkout />} />
        {/* <Route path="/login" element={<Login />} /> */}
      </Routes>
    </Router>
    <ToastContainer position="top-right" autoClose={3000} />
    </>
  );
}

export default App;
