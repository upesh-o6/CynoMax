import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Auth.css";
import SignUpImage from "../assets/SignUp.jpg";

export default function SignUp() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ username: "", email: "", password: "", agreed: false });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm({ ...form, [name]: type === "checkbox" ? checked : value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!form.agreed) {
      setError("Please accept the terms");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.message || "Signup failed");
        setLoading(false);
        return;
      }

      navigate("/login");
    } catch (err) {
      setError("Server error, please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-form">
        <h1>Ready to start your fashion story?</h1>
        <form onSubmit={handleSubmit}>
          <label>Full name</label>
          <input name="username" value={form.username} onChange={handleChange} required />

          <label>Email</label>
          <input name="email" type="email" value={form.email} onChange={handleChange} required />

          <label>Password</label>
          <input name="password" type="password" value={form.password} onChange={handleChange} required />

          <label className="chk">
            <input name="agreed" type="checkbox" checked={form.agreed} onChange={handleChange} /> I agree
          </label>

          {error && <p className="error">{error}</p>}

          <button type="submit" disabled={loading}>
            {loading ? "Signing up..." : "Sign up"}
          </button>
        </form>
      </div>
      <div className="auth-image">
        <img src={SignUpImage} alt="signup" onError={(e) => (e.target.style.display = "none")} />
      </div>
    </div>
  );
}