const express = require("express");
const router = express.Router();
const pool = require("../db");

// Test route
router.get("/test", (req, res) => {
  res.json({ ok: true, msg: "auth ok" });
});

// SIGNUP
router.post("/signup", async (req, res) => {
  try {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
      return res.status(400).json({ ok: false, message: "All fields required" });
    }

    const existing = await pool.query(
      "SELECT id FROM users WHERE email = $1",
      [email]
    );

    if (existing.rows.length > 0) {
      return res.status(409).json({ ok: false, message: "Email already registered" });
    }

    await pool.query(
      "INSERT INTO users (username, email, password) VALUES ($1, $2, $3)",
      [username, email, password]
    );

    res.json({ ok: true, message: "Signup successful" });
  } catch (err) {
    console.error("signup error", err);
    res.status(500).json({ ok: false, message: "Server error" });
  }
});

// LOGIN
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const result = await pool.query(
      "SELECT id, username, email, password FROM users WHERE email = $1",
      [email]
    );

    if (result.rows.length === 0) {
      return res.status(401).json({ ok: false, message: "Invalid credentials" });
    }

    if (result.rows[0].password !== password) {
      return res.status(401).json({ ok: false, message: "Invalid credentials" });
    }

    res.json({ ok: true, message: "Login successful", user: result.rows[0] });
  } catch (err) {
    console.error("login error", err);
    res.status(500).json({ ok: false, message: "Server error" });
  }
});

module.exports = router;
