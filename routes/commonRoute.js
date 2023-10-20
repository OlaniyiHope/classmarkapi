// authRoutes.js
import express from "express";
import {
  login,
  register,
  getUserByRole,
} from "../controller/authController.js";
import authenticateUser from "../middleware/authMiddleware.js";
const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.get("/users/:role", getUserByRole);

export default router;
