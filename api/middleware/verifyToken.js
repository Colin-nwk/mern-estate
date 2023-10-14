import jwt from "jsonwebtoken";

import asyncHandler from "express-async-handler";

import User from "../models/user.model.js";

export const verify = asyncHandler(async (req, res, next) => {
  let token;

  token = req.cookies.access_token;

  if (token) {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      req.user = await User.findById(decoded.userId).select("-password");
      next();
    } catch (error) {
      res.status(403);
      throw new Error("Forbidden");
    }
  } else {
    res.status(401);
    throw new Error("Unauthorized");
  }
});
