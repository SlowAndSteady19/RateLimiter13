import ApiKey from "../models/ApiKey.js";

const apiKeyMiddleware = async (req, res, next) => {
  try {
    const apiKey = req.headers["x-api-key"];

    // Check if API key is provided
    if (!apiKey) {
      return res.status(401).json({ message: "API key missing" });
    }

    // Find API key in database
    const keyRecord = await ApiKey.findOne({ key: apiKey });

    if (!keyRecord) {
      return res.status(401).json({ message: "Invalid API key" });
    }

    // Check if key is active
    if (!keyRecord.isActive) {
      return res.status(403).json({ message: "API key is disabled" });
    }

    // Attach key info to request
    req.apiKey = keyRecord;

    next();
  } catch (error) {
    console.error("API key middleware error:", error);
    res.status(500).json({ message: "API key validation failed" });
  }
};

export default apiKeyMiddleware;
