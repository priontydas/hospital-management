import express from "express";
import { userRegister, userLogin, userLogout, getUserProfile, updateUserProfile  } from "../controllers/userController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";
import { upload } from "../hospital/config/multer.js";

const router = express.Router();

// REGISTER POST
router.post("/register", userRegister);
// LOGIN
router.post("/login", userLogin);

// LOGOUT
router.get("/logout", userLogout);
// GET PROFILE
router.get("/profile", authMiddleware, getUserProfile);

// UPDATE PROFILE


router.put(
  "/profile",
  authMiddleware,
  upload.single("image"),
  updateUserProfile
);
export default router;