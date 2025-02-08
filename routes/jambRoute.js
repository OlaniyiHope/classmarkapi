import express from "express";
import authenticateUser from "../middleware/authMiddleware.js";

import {
  createJambExam,
  getAllJambExams,
  getJambExamById,
  submitJambExamAnswers,
} from "../controller/jambController.js";

const router = express.Router();

// Create JAMB Exam
router.post("/create-jamb-exam", authenticateUser, createJambExam);

// Get all JAMB Exams
router.get("/jamb-exams", authenticateUser, getAllJambExams);

// Get JAMB Exam by ID
// router.get("/jamb-exam/:id", authenticateUser, getJambExamById);
router.get("/jamb-exam/:examId/:sessionId", getJambExamById);

// Submit JAMB Exam Answers
router.post("/submit-jamb-exam", authenticateUser, submitJambExamAnswers);

export default router;
