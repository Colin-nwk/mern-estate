import express from "express";
// import { signin } from "../controllers/user.controller.js";

const router = express.Router();

router.get("/test", (req, res) => {
  res.send("server is ready");
});
// router.post("/signin", signin);
// router.post("/", authUser);
// router.post("/logout", logoutUser);
// router
//   .route("/profile")
//   .get(protect, getUserProfile)
//   .put(protect, updateUserProfile);

export default router;
