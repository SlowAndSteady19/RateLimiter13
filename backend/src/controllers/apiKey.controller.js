import crypto from "crypto";
import ApiKey from "../models/ApiKey.js";

export const generateApiKey = async (req, res) => {
  try {
    const userId = req.user.userId;

    // Generate secure random key
    const key = crypto.randomBytes(32).toString("hex");

    const apiKey = await ApiKey.create({
      key,
      user: userId
    });

    res.status(201).json({
      message: "API key generated successfully",
      apiKey: apiKey.key
    });
  } catch (error) {
    console.error("API key generation error:", error);
    res.status(500).json({ message: "Failed to generate API key" });
  }
};
