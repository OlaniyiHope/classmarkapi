// authRoutes.js
import express from "express";
import {
  login,
  register,
  getUserByRole,
  getStudentsByClass,
  getStudentById,
  getAdmin,
} from "../controller/authController.js";
import authenticateUser from "../middleware/authMiddleware.js";
const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.get("/users/:role", getUserByRole);
router.get("/students/:id", authenticateUser, getStudentById);
router.get("/student/:className", getStudentsByClass); // New route for getting students by class
router.get("/get-admin", authenticateUser, getAdmin);

export default router;
