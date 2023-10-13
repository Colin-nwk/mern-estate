// const mongoose = require("mongoose");
import mongoose from "mongoose";
// import dotenv from "dotenv";

// dotenv.config();

const connectWithRetry = () => {
  const connectOptions = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    //     useCreateIndex: true,
  };

  const connectToDatabase = () => {
    mongoose
      .connect(
        process.env.NODE_ENV === "production"
          ? process.env.MONGO_URI
          : "mongodb://127.0.0.1:27017/mern-estate",
        connectOptions
      )
      .then(() => {
        console.warn("Our database is connected");
      })
      .catch((err) => {
        console.error(err);
        setTimeout(connectToDatabase, 5000);
        process.exit(1);
      });
  };

  connectToDatabase();
};

// connectWithRetry();

export default connectWithRetry;
