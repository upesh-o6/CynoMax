import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  const location = useLocation();

  const isAuthPage = location.pathname === '/login' || location.pathname === '/signup';

  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <Link to="/">CynoMax</Link>
      </div>
      <div className="navbar-links">
       
        <Link to="/login">Login</Link>
        <Link to="/signup">Sign Up</Link><br></br><br></br>
        
        {!isAuthPage && <Link to="/cart">View Cart</Link>}
      </div>
    </nav>
  );
};

export default Navbar;
