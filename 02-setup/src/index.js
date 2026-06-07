import express from "express";
import mongoose, { mongo } from "mongoose";
import Redis from "ioredis";
import env from "dotenv";

env.config();

console.log("REDIS_URL:", process.env.REDIS_URL);
//console.log("MONGO_URL:", process.env.MONGODB_URL);

const app = express();

const redis = new Redis(process.env.REDIS_URL || "redis://localhost:6379");

app.get("/redis", async (req, res) => {
  const reply = await redis.ping();
  res.json({ redis: reply });
});

app.get("/mongo", async (req, res) => {
  const url = process.env.MONGODB_URL || "fallback-mongodb-url";

  // for local db "mongodb://localhost:27017/my_redis_mongodb";

  if (mongoose.connection.readyState === 0) {
    await mongoose.connect(url);
  }

  res.json({ mongo: "connected", database: mongoose.connection.name });
});

app.listen(8899, () => {
  console.log("server is running on port 8899");
});
