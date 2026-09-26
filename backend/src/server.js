import express from "express";
import cors from "cors";
import helmet from "helmet";
import dotenv from "dotenv";
import rateLimit from "express-rate-limit";

// Load environment variables
dotenv.config();

const app = express();

// Environment variables
const PORT = process.env.PORT || 5000;
const FRONTEND_URL = process.env.FRONTEND_URL;

// Trust proxy when deployed
if (process.env.NODE_ENV === "production") {
  app.set("trust proxy", 1);
}

// Hide Express fingerprint
app.disable("x-powered-by");

// Security headers
app.use(
  helmet({
    crossOriginResourcePolicy: {
      policy: "cross-origin",
    },
  })
);

// CORS
app.use(
  cors({
    origin: FRONTEND_URL || "http://127.0.0.1:5501",
    methods: ["GET", "POST"],
    allowedHeaders: ["Content-Type"],
  })
);

// Parse JSON requests
app.use(
  express.json({
    limit: "50kb",
  })
);

// Parse URL-encoded requests
app.use(
  express.urlencoded({
    extended: true,
    limit: "50kb",
  })
);

// General API rate limiting
const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 100,
  standardHeaders: "draft-8",
  legacyHeaders: false,

  message: {
    success: false,
    message: "Too many requests. Please try again later.",
  },
});

// Apply rate limiting to API routes
app.use("/api", apiLimiter);

// Health check
app.get("/api/health", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Portfolio API is running",
    timestamp: new Date().toISOString(),
  });
});

// Root route
app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Welcome to Golden Sunday's Portfolio API",
  });
});

// Contact route will be added here
// app.use("/api/contact", contactRoutes);

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "Route not found",
  });
});

// Global error handler
app.use((err, req, res, next) => {
  console.error("Server Error:", err);

  res.status(err.statusCode || 500).json({
    success: false,
    message:
      process.env.NODE_ENV === "production"
        ? "Something went wrong on the server."
        : err.message,
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Portfolio API running on port ${PORT}`);
  console.log(`📍 http://localhost:${PORT}`);
});