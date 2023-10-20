// examRoutes.js
import express from "express";
import {
  createExam,
  getAllExams,
  getExamById,
  updateExam,
  deleteExam,
} from "../controller/examlistController.js";
import authenticateUser from "../middleware/authMiddleware.js";
const router = express.Router();

// Create a new exam (accessible only to admins)
router.post("/create-exam", authenticateUser, createExam);

// Get a list of all exams
router.get("/get-exam", getAllExams);

// Get a specific exam by ID
router.get("/get-exam/:id", getExamById);

// Update an existing exam by ID (accessible only to admins)
router.put("/:id", updateExam);

// Delete an exam by ID (accessible only to admins)
router.delete("/:id", deleteExam);

export default router;
