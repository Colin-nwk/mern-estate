import express from "express";
import { signin, signup, google } from "../controllers/auth.controller.js";

const router = express.Router();

router.post("/signin", signin);
router.post("/signup", signup);
router.post("/signout", signin);
router.get("/profile", signin);
router.post("/google", google);
// router.post("/logout", logoutUser);
// router
//   .route("/profile")
//   .get(protect, getUserProfile)
//   .put(protect, updateUserProfile);

export default router;
