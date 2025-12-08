const express = require("express");
const router = express.Router();
const pool = require("../db");
const jwt = require("jsonwebtoken");

// Health check
router.get("/test", (req, res) => res.json({ ok: true, msg: "auth ok" }));

// SIGNUP
router.post("/signup", async (req, res) => {
  try {
    const { username, email, password } = req.body;
    if (!username || !email || !password) {
      return res.status(400).json({ ok: false, message: "All fields required" });
    }

    const [existing] = await pool.query("SELECT id FROM users WHERE email = ?", [email]);
    if (existing.length) {
      return res.status(409).json({ ok: false, message: "Email already registered" });
    }

    await pool.query("INSERT INTO users (username, email, password) VALUES (?, ?, ?)", [
      username, email, password,
    ]);

    return res.json({ ok: true, message: "Signup successful" });
  } catch (err) {
    console.error("signup error", err);
    return res.status(500).json({ ok: false, message: "Server error" });
  }
});

// LOGIN
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ ok: false, message: "All fields required" });
    }

    const [rows] = await pool.query(
      "SELECT id, username, email FROM users WHERE email = ? AND password = ?",
      [email, password]
    );

    if (!rows.length) {
      return res.status(401).json({ ok: false, message: "Invalid credentials" });
    }

    const user = rows[0];
    const token = jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET || "secret", {
      expiresIn: "1h",
    });

    return res.json({ ok: true, message: "Login successful", user, token });
  } catch (err) {
    console.error("login error", err);
    return res.status(500).json({ ok: false, message: "Server error" });
  }
});

module.exports = router;
