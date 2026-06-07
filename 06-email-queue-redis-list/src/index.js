// push or entry-> left
// pop-> right

import express from "express";
import Redis from "ioredis";

const app = express();
app.use(express.json());

const redis = new Redis(process.env.REDIS_URL || "redis://localhost:6379");

const QUEUE_KEY = "queue:emails";

app.post("/emails", async (req, res) => {
  const job = {
    to: req.body.to,
    subject: req.body.subject || "No subject",
    body: req.body.body || "No body",
    createdAt: new Date().toISOString(),
  };
  await redis.lpush(QUEUE_KEY, JSON.stringify(job));
  res.json({ queued: true, job });
});

app.get("/emails/process-one", async (req, res) => {
  const rwaJob = await redis.rpop(QUEUE_KEY);
  if (!rwaJob) {
    return res.json({ message: "No jobs in the queue" });
  }
  const job = JSON.parse(rwaJob);
  // Simulate email sending
  console.log(`Sending email to ${job.to} with subject "${job.subject}"`);
  res.json({ message: "Email sent", job });
});

app.listen(6000, () => {
  console.log("Email queue server is running on http://localhost:6000");
});
