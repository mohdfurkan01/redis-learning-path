import express from "express";
import { emailQueue } from "./queue.js";

const app = express();
app.use(express.json());

app.post("/welcome-email", (req, res) => {
  const job = emailQueue.add(
    "send-welcome-email",
    {
      to: req.body.to,
      name: req.body.name || "Redis Learner",
    },
    {
      attempts: 3, // Retry up to 3 times if the job fails
      backoff: {
        type: "exponential",
        delay: 5000, // Initial delay of 5 seconds before retrying
      },
    },
  );

  res.json({message: "Welcome email job added to the queue!", jobId: job.id});
});

app.listen(7002, () => {
  console.log("Server is running on http://localhost:7002");
});
