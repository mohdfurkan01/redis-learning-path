import express from "express";
import Redis from "ioredis";
import env from "dotenv";

env.config();

const app = express();
app.use(express.json());

const redis = new Redis(process.env.REDIS_URL || "fallback url");

// app:banner -> is the key, the value is the banner message that we want to display on the frontend
// and we need it because we want to be able to change the banner message without having to redeploy the frontend, so we can just update the value in Redis and the frontend will get the updated message when it fetches it from the backend
const BANNER_KEY = "app:banner";

app.post("/banner", async (req, res) => {
  await redis.set(BANNER_KEY, req.body.message || "welcome back vro!!!");
  res.json({ success: true });
});

app.get("/banner", async (req, res) => {
  const message = await redis.get(BANNER_KEY);
  if (!message) {
    console.log("No banner message found, setting default message");
  }
  res.json({ message });
});

app.delete("/banner", async (req, res) => {
  await redis.del(BANNER_KEY);
  res.json({ success: true });
});

app.get("/banner/exists", async (req, res) => {
  const exists = await redis.exists(BANNER_KEY);
  //console.log(`Banner exists: ${exists}`);

  res.json({ exists: Boolean(exists) });
});

app.listen(3000, () => {
  console.log("Server is running on http://localhost:3000");
});
