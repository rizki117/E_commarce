import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";

// Import file helper cors
import corsOptions from "./config/corsOptions.js";

import userRouter from "./routers/userRouter.js";
import produkRouter from "./routers/produkRouter.js";
import AuthRouter from "./routers/AuthRouter.js";
import publicRouter from "./routers/publicRouter.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 8080;

// Static folder untuk file upload
app.use(express.static('public'));

// Pakai helper CORS yang sudah kita pisah
app.use(cors(corsOptions));

// Middleware
app.use(express.json());
app.use(cookieParser());

// Routes
app.use(userRouter);
app.use(produkRouter);
app.use(AuthRouter);
app.use(publicRouter);

// Start server
app.listen(PORT, "0.0.0.0", () => {
  console.log(`✅ Server running at http://localhost:${PORT}`);
});