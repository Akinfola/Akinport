import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import helmet from "helmet";
import { contactRouter } from "./routes/contact";

const app = express();
app.set("trust proxy", 1);

const PORT = process.env.PORT || 5000;

// ─── FIXED CORS (production safe) ─────────────────────────────
app.use(
  cors({
    origin: function (origin, callback) {
      const allowedOrigins = [
        "https://akintek.netlify.app",
        "http://localhost:3000",
      ];

      if (!origin) return callback(null, true);

      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      }

      return callback(new Error(`CORS blocked for origin: ${origin}`));
    },
    methods: ["GET", "POST"],
    allowedHeaders: ["Content-Type"],
  })
);

// ─── Security ────────────────────────────────────────────────
app.use(helmet());
app.use(express.json({ limit: "10kb" }));
app.use(express.urlencoded({ extended: true, limit: "10kb" }));

// ─── Debug Logger (REMOVE LATER IF YOU WANT) ────────────────
app.use((req, _res, next) => {
  console.log("➡️", req.method, req.url);
  next();
});

// ─── Health Check ────────────────────────────────────────────
app.get("/api/health", (_req, res) => {
  res.json({ status: "ok", time: new Date().toISOString() });
});

// ─── Routes ──────────────────────────────────────────────────
app.use("/api/contact", contactRouter);

// ─── 404 ─────────────────────────────────────────────────────
app.use((_req, res) => {
  res.status(404).json({
    success: false,
    message: "Route not found",
  });
});

// ─── Global Error Handler ────────────────────────────────────
app.use((err: Error, _req: express.Request, res: express.Response, _next: express.NextFunction) => {
  console.error("❌ Server Error:", err.message);

  res.status(500).json({
    success: false,
    message: "Internal server error",
  });
});

// ─── START SERVER ────────────────────────────────────────────
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});

export default app;