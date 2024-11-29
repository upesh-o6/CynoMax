import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SignUpImage from '../assets/SignUp.jpg'; // Correct import statement

const SignUp = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    areaOfInterest: '',
    agreed: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleSignUp = (e) => {
    e.preventDefault();
    navigate('/login');
  };

  return (
    <div className="signup-container">
      <div className="signup-form">
        <h1>Ready to start your fastion story?</h1>
        <p>Signup to our website and start leafing through your favorite cloth today!</p>
        <div className="form-box">
          <form onSubmit={handleSignUp}>
            <div>
              <label>Full name</label>
              <input type="text" name="fullName" value={formData.fullName} onChange={handleChange} required />
            </div>
            <div>
              <label>Email</label>
              <input type="email" name="email" value={formData.email} onChange={handleChange} required />
            </div>
            <div>
              <label>Password</label>
              <input type="password" name="password" required />
            </div>
            <div>
              <label> Confirm Password</label>
              <input type="password" name="password" required />
            </div>
            {/* <div>
              <label>Area of interest</label>
              <input type="text" name="areaOfInterest" value={formData.areaOfInterest} onChange={handleChange} />
            </div> */}
            <div>
              <input type="checkbox" name="agreed" checked={formData.agreed} onChange={handleChange} /> I agree to the Terms & Conditions
            </div>
            <button type="submit">Sign up</button>
          </form>
        </div>
      </div>
      <div className="signup-image">
        <img src={SignUpImage} alt="Sign Up Illustration" />
      </div>
    </div>
  );
};

export default SignUp;
