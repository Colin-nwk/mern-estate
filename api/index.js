import express from "express";
import dotenv from "dotenv";
import { notFound, errorHandler } from "./middleware/errorHandler.js";
import connectWithRetry from "./database/index.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import user from "./routes/user.route.js";
import auth from "./routes/auth.route.js";
dotenv.config();
connectWithRetry();
const app = express();

const port = process.env.PORT || 5000;
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors());

app.use("/api", auth);
app.use("/api/users", user);

app.use(notFound);
app.use(errorHandler);
app.listen(port, () => {
  console.info("listening on port: " + port);
});
