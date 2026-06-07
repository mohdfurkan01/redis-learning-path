import express from "express";
import Redis from "ioredis";

const app = express();
app.use(express.json());

const redis = new Redis(process.env.REDIS_URL || "redis://localhost:6379");

function otpKey(phone) {
  return `otp:${phone}`;
}

app.post("/otp", async (req, res) => {
  const { phone } = req.body;
  if (!phone) {
    return res.status(400).json({ error: "Phone number is required" });
  }

  const otp = Math.floor(100000 + Math.random() * 900000).toString();
  console.log("Generated OTP:", otp);
  await redis.set(otpKey(phone), otp, "EX", 30); // OTP valid for 30 seconds
  // here we can set many more options like attempts, max attempts:3, createdAt:timestamp, lastAttemptAt:timestamp, blockedUntil:timestamp, etc. to make it more robust and secure, 

  console.log(`OTP for ${phone}: ${otp}`); // In real application, send this OTP via SMS 
  res.json({ message: "OTP sent successfully", otp });
});

app.post("/otp/verify", async (req, res) => {
  const { phone, otp } = req.body;
  if (!phone || !otp) {
    return res.status(400).json({ error: "Phone number and OTP are required" });
  }

  const storedOtp = await redis.get(otpKey(phone));
  if (!storedOtp) {
    return res
      .status(400)
      .json({ success: false, message: "OTP expired or not found" });
  }
  if (storedOtp !== otp) {
    return res.status(400).json({ message: "Invalid OTP" });
  }
  // user is verified proceed with login or registration logic here
  if (storedOtp === otp) {
    await redis.del(otpKey(phone)); // Invalidate OTP after successful verification
    return res.json({ success: true, message: "OTP verified successfully" });
  }
});

app.get("/otp/:phone/ttl", async (req, res) => {
  const ttl = await redis.ttl(otpKey(req.params.phone));
  // if (ttl === -2) {
  //     return res.status(404).json({ error: "OTP not found" });
  // }
  // if (ttl === -1) {
  //     return res.status(400).json({ error: "OTP exists but has no expiration" });
  // }
  res.json({ ttl });
});

app.listen(9000, () => {
  console.log("Server is running on http://localhost:9000");
});
