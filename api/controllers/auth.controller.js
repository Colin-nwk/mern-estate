import asyncHandler from "express-async-handler";
import User from "../models/user.model.js";
import generateToken from "../utils/generateToken.js";

export const signin = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (user && (await user.matchPasswords(password))) {
    generateToken(res, user._id);
    res.status(200).json({
      _id: user._id,
      username: user.username,
      email: user.email,
      avatar: user.avatar,
    });
  } else {
    res.status(401);
    throw new Error("Invalid email or password");
  }
});

export const google = asyncHandler(async (req, res) => {
  const { email, username, photo } = req.body;
  const user = await User.findOne({ email });

  if (user) {
    generateToken(res, user._id);
    res.status(200).json({
      _id: user._id,
      username: user.username,
      email: user.email,
      avatar: user.avatar,
    });
  } else {
    const password =
      Math.random().toString(36).slice(-8) +
      Math.random().toString(36).slice(-8);
    const newUser = await User.create({
      username,
      email,
      password,
      avatar: photo,
    });

    if (newUser) {
      generateToken(res, newUser._id);
      res.status(201).json({
        _id: newUser._id,
        username: newUser.username,
        email: newUser.email,
        avatar: newUser.avatar,
      });
    } else {
      res.status(400);
      throw new Error("Invalid google user data");
    }
  }
});

export const signup = asyncHandler(async (req, res) => {
  const { username, email, password } = req.body;

  if (
    !username ||
    !email ||
    !password ||
    username === "" ||
    email === "" ||
    password === ""
  ) {
    res.status(422);
    throw new Error("please provide valid data to signup");
  }
  const userExists = await User.findOne({ email });

  if (userExists) {
    res.status(400);
    throw new Error("User already exists");
  }

  const user = await User.create({
    username,
    email,
    password,
  });

  if (user) {
    //     generateToken(res, user._id);
    res.status(201).json({
      // _id: user._id,
      // username: user.username,
      // email: user.email,
      // avatar: user.avatar,
      message: "account received successfully",
    });
  } else {
    res.status(400);
    throw new Error("Invalid user data");
  }
});

export const logout = asyncHandler(async (req, res) => {
  res.cookie("access_token", "", {
    httpOnly: true,
    expires: new Date(0),
  });
  res.status(304).json({
    message: "user logged out!",
  });
});
