import { redisClient } from "../config/redis.js";

const rateLimiter = async (req, res, next) => {
  try {
    const apiKey = req.apiKey.key;
    const limit = req.apiKey.rateLimit || 10;

    const redisKey = `rate:${apiKey}`;

    // Increment request count
    const currentCount = await redisClient.incr(redisKey);

    // If this is the first request, set TTL (60 seconds)
    if (currentCount === 1) {
      await redisClient.expire(redisKey, 60);
    }
    const ttl = await redisClient.ttl(redisKey);
    // If limit exceeded, block request

    res.setHeader("X-RateLimit-Limit", limit);
    res.setHeader("X-RateLimit-Remaining", Math.max(0, limit - currentCount));
    res.setHeader("X-RateLimit-Reset", ttl);

    if (currentCount > limit) {
      return res.status(429).json({
        message: "Rate limit exceeded. Try again later."
      });
    }

    // Attach rate info for debugging / future UI
    req.rateLimit = {
      limit,
      currentCount
    };

    next();
  } catch (error) {
    console.error("Rate limiter error:", error);
    return res.status(500).json({ message: "Rate limiting failed" });
  }
};

export default rateLimiter;
