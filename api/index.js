import express from "express";
import dotenv from "dotenv";
import { notFound, errorHandler } from "./middleware/errorHandler.js";
import connectWithRetry from "./database/index.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import user from "./routes/user.route.js";
import auth from "./routes/auth.route.js";
import { limiter, exceededIPs } from "./utils/rateLimiter.js";
import { logger } from "./utils/logger.js";

dotenv.config();
connectWithRetry();
const app = express();

const port = process.env.PORT || 5000;
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors());
// Apply rate limiting middleware to all routes or to specific routes as needed
app.use(limiter);

app.use("/api", auth);
app.use("/api/user", user);

app.get("/exceeded-ips", (req, res) => {
  res.json({ exceededIPs });
});

app.use(notFound);
app.use(errorHandler);

app.listen(port, () => {
  console.info("listening on port: " + port);
});
