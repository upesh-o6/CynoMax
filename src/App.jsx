import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Login from './components/Login';
import SignUp from './components/SignUp';
import Home from './components/Home';
import Shopping from './components/Shopping';
import Cart from './components/Cart';
import PrivateRoute from './components/PrivateRoute';
import { AuthProvider } from './components/AuthContext';
import { CartProvider } from './components/CartContext';
import './App.css';
import './components/Navbar.css';

const App = () => (
  <AuthProvider>
    <CartProvider>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/" element={<PrivateRoute><Home /></PrivateRoute>} />
          <Route path="/shopping" element={<Shopping />} />
          <Route path="/cart" element={<Cart />} />
        </Routes>
      </Router>
    </CartProvider>
  </AuthProvider>
);

export default App;
