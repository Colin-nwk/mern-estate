import express from "express";
import { update } from "../controllers/user.controller.js";
import { verify } from "../middleware/verifyToken.js";

const router = express.Router();

router.put("/update/:id", verify, update);
// router.post("/", authUser);
// router.post("/logout", logoutUser);
// router
//   .route("/profile")
//   .get(protect, getUserProfile)
//   .put(protect, updateUserProfile);

export default router;
