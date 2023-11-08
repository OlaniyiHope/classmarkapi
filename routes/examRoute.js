// examRoutes.js

import express from "express";
import {
  getAllScore,
  getExamScore,
  submitExam,
} from "../controller/examController.js";
import authenticateUser from "../middleware/authMiddleware.js";

const router = express.Router();

// Create a route for submitting an exam
router.post("/exams/submit", authenticateUser, submitExam);

// Create a route to get the student's score and name
router.get("/exams/score/:examId/:userId", authenticateUser, getExamScore);

// Create a route to get all students' scores for a specific exam
router.get("/exams/all-scores/:examId", getAllScore);

export default router;
