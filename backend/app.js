import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";

import userRouter from "./routers/userRouter.js";
import produkRouter from "./routers/produkRouter.js";
import AuthRouter from "./routers/AuthRouter.js";
import publicRouter from "./routers/publicRouter.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 8080;

// Static folder untuk file upload
app.use(express.static('public'));

// CORS konfigurasi lebih fleksibel + aman
const allowedOrigins = [
  'http://localhost:5173',
  'http://localhost:3000',
  'http://localhost:5000',
  'http://172.16.0.2:3000', // IP lokal kamu
  'http://192.168.30.71:3000'
  
];

app.use(cors({
  credentials: true,
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  }
}));

// Middleware
app.use(express.json());
app.use(cookieParser());

// Routes
app.use(userRouter);
app.use(produkRouter);
app.use(AuthRouter);
app.use(publicRouter);

// Start server, listen di semua IP
app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server running at http://localhost:${PORT}`);
});