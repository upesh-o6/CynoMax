console.log("🚀 BACKEND INDEX.JS LOADED");

const express = require("express");
const cors = require("cors");
require("dotenv").config();

const authRoutes = require("./routes/auth");
const app = express();

// CORS: allow your Netlify frontend
app.use(cors({
  origin: "https://shop-easy0.netlify.app",
  credentials: true
}));

// JSON parsing
app.use(express.json());

// Routes
app.use("/auth", authRoutes);
console.log("✅ AUTH ROUTES MOUNTED");


// Health check
app.get("/health", (req, res) => {
  res.json({ ok: true, message: "Backend is working fine" });
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log("Server running on port " + PORT);
});