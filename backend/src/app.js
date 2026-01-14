import express from "express";
import cors from "cors";

import authRoutes from "./routes/auth.routes.js";
import apiRoutes from "./routes/api.routes.js";
import apiKeyRoutes from "./routes/apiKey.routes.js";

const app = express();

/* 🔴 THIS MUST COME BEFORE ROUTES */
app.use(cors());
app.use(express.json());

/* 🔴 ROUTES COME AFTER */
app.use("/auth", authRoutes);
app.use("/api", apiRoutes);
app.use("/apikey", apiKeyRoutes);

app.get("/health", (req, res) => {
  res.json({ status: "OK" });
});

export default app;
