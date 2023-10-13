import express from "express";
import dotenv from "dotenv";
import { notFound, errorHandler } from "./middleware/errorHandler.js";
import connectWithRetry from "./database/index.js";
dotenv.config();
connectWithRetry();
const app = express();

const port = process.env.PORT || 5000;
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(notFound);
app.use(errorHandler);
app.listen(port, () => {
  console.info("listening on port: " + port);
});
