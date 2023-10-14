import asyncHandler from "express-async-handler";
import User from "../models/user.model.js";

export const update = asyncHandler(async (req, res) => {
  // Check if the user making the request is authorized
  if (req.user._id.toString() !== req.params.id) {
    console.log("user: " + typeof req.user._id);
    console.log("params: " + typeof req.params.id);
    res.status(401);
    throw new Error("You are not allowed to make this request");
  }

  // Retrieve the user's information from the database
  const user = await User.findById(req.user._id);

  if (user) {
    // Update the user's fields based on the request body
    user.username = req.body.username || user.username;
    user.email = req.body.email || user.email;
    user.avatar = req.body.avatar || user.avatar;

    if (req.body.password) {
      user.password = req.body.password;
    }

    // Save the updated user in the database
    const updatedUser = await user.save();

    // Set the response status to 201 (Created) and send the updated user's information in the response body
    res.status(201).json({
      _id: updatedUser._id,
      username: updatedUser.username,
      email: updatedUser.email,
      avatar: updatedUser.avatar,
    });
  } else {
    res.status(404);
    throw new Error("user not found");
  }
});
