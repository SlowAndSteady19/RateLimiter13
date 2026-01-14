import express from "express";
import authMiddleware from "../middleware/auth.middleware.js";
import { generateApiKey } from "../controllers/apiKey.controller.js";

const router = express.Router();

router.post("/generate", authMiddleware, generateApiKey);

export default router;
