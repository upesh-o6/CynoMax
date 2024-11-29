import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from './AuthContext';
import LoginImage from '../assets/Login.jpg'; // Correct import statement

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleLogin = (e) => {
    e.preventDefault();
    login(); // Update authentication state
    navigate('/'); // Redirect to home page
  };

  return (
    <div className="login-container">
      <div className="login-form">
        <h1>CynoMax</h1>
        {/* <h2>Welcome back</h2> */}
        <div className="form-box">
          <form onSubmit={handleLogin}>
            <div>
              <label>Email address</label>
              <input type="email" name="email" required />
            </div>
            <div>
              <label>Password</label>
              <input type="password" name="password" required />
            </div>
            {/* <div>
              <input type="checkbox" name="remember" /> Remember for 30 days
            </div> */}
            <a href="/forgot-password">Forgot password</a>
            <button type="submit">Sign in</button>
          </form>
          <p>Don't have an account? <a href="/signup">Sign up</a></p>
        </div>
      </div>
      <div className="login-image">
        <img src={LoginImage} alt="Login Illustration" />
      </div>
    </div>
  );
};

export default Login;
