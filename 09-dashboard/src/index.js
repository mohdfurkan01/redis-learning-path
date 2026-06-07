import express from "express";
import Redis from "ioredis";

const app = express();
app.use(express.json());

const incrementer = new Redis(
  process.env.REDIS_URL || "redis://localhost:6379",
);

//POST=> /post/id/view -> increament view or count of a post
app.post("/post/:id/view", async (req, res) => {
  const { id } = req.params;
  const newCount = await incrementer.incr(`post:${id}:views`);
  res.json({ message: "View count incremented", postId: id, views: newCount });
});

//POST=> /leaderboard/score -> add point to a user score
app.post("/leaderboard/score", async (req, res) => {
  const { userId, points } = req.body;
  if (!userId || !points) {
    return res.status(400).json({ error: "userId and points are required" });
  }
  await incrementer.zincrby("leaderboard", points, userId);
  res.json({ message: "Score updated", userId, pointsAdded: points });
});

// GET=> /leaderboard -> get top 10 leaders
app.get("/leaderboard", async (req, res) => {
  const leaders = await incrementer.zrevrange(
    "leaderboard",
    0,
    9,
    "WITHSCORES",
  );
  const formattedLeaders = leaders.map((item, index) => ({
    rank: index + 1,
    userId: item[0],
    score: item[1],
  }));
  res.json({ message: "Top leaders retrieved", leaders: formattedLeaders });
});

// GET=> /leaderboard/:userId/rank -> get a rank of user
app.get("/leaderboard/:userId/rank", async (req, res) => {
  const { userId } = req.params;
  const rank = await incrementer.zrevrank("leaderboard", userId);
  if (rank === null) {
    return res.status(404).json({ error: "User not found" });
  } 
  res.json({ message: "User rank retrieved", userId, rank: rank + 1 });
});

app.listen(9000, () => {
  console.log("Dashboard server is running on http://localhost:9000");
});
