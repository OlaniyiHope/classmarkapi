// authRoutes.js
import express from "express";
import {
  login,
  register,
  getUserByRole,
  getStudentsByClass,
  getStudentById,
} from "../controller/authController.js";
import authenticateUser from "../middleware/authMiddleware.js";
const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.get("/users/:role", getUserByRole);
router.get("/students/:id", getStudentById);
router.get("/student/:className", getStudentsByClass); // New route for getting students by class

export default router;
