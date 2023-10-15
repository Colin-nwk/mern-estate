import { logger } from "../utils/logger.js";

const notFound = (req, res, next) => {
  const error = new Error(`Not Found - ${req.originalUrl}`);
  res.status(404);
  next(error);
};

const errorHandler = (err, req, res, next) => {
  let statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  let message = err.message;

  //mongo-db error catcher
  if (err.name === "CastError" && err.kind === "ObjectId") {
    statusCode = 404;
    message = "Resource Not Found";
  }
  logger.error({
    // timestamp: new Date().toISOString(),
    // ip: req.ip,
    // // device: req.get("user-agent"),
    // // errorName: err.name,
    // errorMessage: err.message,

    // timestamp: new Date().toISOString(),
    // ip: req.ip,
    // device: req.get("user-agent"),
    // errorName: err.name,
    // errorMessage: err.message,

    ip: req.connection.remoteAddress, // Capture client's IP
    device: req.headers["user-agent"], // Capture user-agent (device)
    errorName: err.name,
    errorMessage: err.message,
  });
  res.status(statusCode).json({
    message,
    stack: process.env.NODE_ENV === "production" ? null : err.stack,
  });
};

export { notFound, errorHandler };
