import { Worker } from "bullmq";
import { connection } from "./queue.js";

const worker = new Worker(
  "emails", //1. queue name
    async (job) => { //2. business logic
    (console.log("Processing email job...", job.id, job.name, job.data),
      await new Promise((resolve) => setTimeout(resolve, 1500)),
      console.log("Email job completed!", job.id));
  },
  { connection }, //3. connection

  //this fun takes 3 params: given name, function business logic, give the connection

);

worker.on("completed", (job) => {
  console.log("Job completed!", job.id, job.name, job.data);
});

worker.on("failed", (job, err) => {
  console.error("Job failed!", job.id, job.name, job.data, err);
});

console.log("Worker is running and waiting for jobs...");
