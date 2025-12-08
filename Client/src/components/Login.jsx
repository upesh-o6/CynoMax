import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "./AuthContext";
import "./Auth.css";
import LoginImage from "../assets/Login.jpg";

export default function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const res = await fetch("/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (!res.ok || !data.ok) {
        setError(data.message || "Login failed");
        return;
      }

      // ✅ backend returns token + user info
      login({ token: data.token, email: form.email });
      navigate("/");
    } catch (err) {
      setError("Server error, please try again later.");
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-form">
        <h1>CynoMax</h1>
        <form onSubmit={handleSubmit}>
          <label>Email</label>
          <input name="email" type="email" onChange={handleChange} required />
          <label>Password</label>
          <input name="password" type="password" onChange={handleChange} required />
          {error && <p className="error">{error}</p>}
          <button type="submit">Sign in</button>
        </form>
        <p>
          Don't have an account? <Link to="/signup">Sign up</Link>
        </p>
      </div>
      <div className="auth-image">
        <img src={LoginImage} alt="Login" />
      </div>
    </div>
  );
}