import { createClient } from "redis";

let redisClient;

const connectRedis = async () => {
  redisClient = createClient({
    url: process.env.REDIS_URL
  });

  redisClient.on("connect", () => {
    console.log("🔴 Redis connecting...");
  });

  redisClient.on("ready", () => {
    console.log("✅ Redis connected");
  });

  redisClient.on("error", (err) => {
    console.error("❌ Redis error:", err.message);
  });

  await redisClient.connect();
};

export { connectRedis, redisClient };
