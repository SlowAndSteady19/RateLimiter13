import express from "express";
import authMiddleware from "../middleware/auth.middleware.js";
import apiKeyMiddleware from "../middleware/apiKey.middleware.js";

const router = express.Router();

router.get("/protected", authMiddleware, (req, res) => {
  res.json({
    message: "You accessed a JWT-protected route",
    user: req.user
  });
});

router.get("/data", apiKeyMiddleware, (req, res) => {
  res.json({
    message: "You accessed an API key protected route",
    apiKeyId: req.apiKey._id
  });
});

export default router;
