import express from "express";
import { update, destroy } from "../controllers/user.controller.js";
import { verify } from "../middleware/verifyToken.js";

const router = express.Router();

router.put("/update/:id", verify, update);
router.delete("/delete/:id", verify, destroy);
// router.post("/", authUser);
// router.post("/logout", logoutUser);
// router
//   .route("/profile")
//   .get(protect, getUserProfile)
//   .put(protect, updateUserProfile);

export default router;
