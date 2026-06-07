# Redis in Action: A Practical Node.js Journey 

Hey there! Welcome to this repository. If you're looking to wrap your head around Redis and how to actually use it in a real-world Node.js environment, you're in the right place. 

I created this project to serve as a step-by-step learning path. Instead of just throwing theory at you, we're building out practical use cases that you'd actually see in production apps. We start from the absolute basics and work our way up to more advanced architectures like Job Queues and Pub/Sub.

# What's Inside?

The repository is structured into sequential chapters. Feel free to follow them in order, or just jump to the specific topic you need help with right now:

- **`01-foundation`** & **`02-setup`**: Getting the development environment ready.
- **`03-redis-basics`**: The core fundamentals of interacting with Redis.
- **`04-otp-with-ttl`**: Building a One-Time Password (OTP) system that expires automatically using Redis TTL (Time-To-Live).
- **`05-user-profile-cache`**: Speeding up database queries by implementing a caching layer for user profiles.
- **`06-email-queue-redis-list`**: Handling background tasks using basic Redis Lists.
- **`07-order-jobs-bullmq`**: Upgrading our background task game using BullMQ to manage complex job queues (retries, delays, etc.).
- **`08-notification-pubsub`**: Implementing real-time communication using Redis Pub/Sub capabilities.
- **`09-dashboard`**: Bringing it all together to visualize what's happening.

# Getting Started

To get everything running smoothly, you'll need **Docker** and **Node.js** installed on your machine.

1. **Spin up the Infrastructure:**
   We're using Docker Compose to make setting up Redis and MongoDB a breeze. Make sure Docker Desktop is running, then just run:
   ```bash
   docker compose up -d
   ```
   *(This uses the `docker-compose.yml` file in the root to start your Redis and MongoDB containers).*

2. **Run Individual Modules:**
   Each numbered folder is its own mini Node.js project. To run one (for example, the caching lesson):
   ```bash
   cd 05-user-profile-cache
   npm install
   npm run dev # or node src/index.js depending on the package.json setup
   ```

# A Quick Tip
Remember to check the `.env` files in each project directory. You might need to set up local environment variables depending on the module.

---
*Happy coding! If you find this helpful, feel free to use these patterns in your own projects.*
