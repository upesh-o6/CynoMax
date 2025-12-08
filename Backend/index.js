const express = require("express");
const cors = require("cors");
const path = require("path");
require("dotenv").config();

const authRoutes = require("./routes/auth");

const app = express();

// middlewares
app.use(cors());
app.use(express.json());

// main API routes
app.use("/auth", authRoutes);

// health check for backend (works always)
app.get("/health", (req, res) => {
  res.json({ ok: true, message: "Backend is working fine" });
});

// serve frontend build only when deployed (production mode)
if (process.env.NODE_ENV === "production") {
  const distPath = path.join(__dirname, "../Client/dist");
  
  // serve static files
  app.use(express.static(distPath));

  // fallback for SPA routing
  app.use((req, res, next) => {
    // only GET requests
    if (req.method !== "GET") return next();

    // skip API routes
    if (req.path.startsWith("/auth")) return next();

    res.sendFile(path.join(distPath, "index.html"));
  });
}

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log("Server running on port " + PORT);
});
