// examRoutes.js

import express from "express";
import {
  getAllScore,
  getExamScore,
  submitExam,
  getAllStudentScores,
<<<<<<< HEAD
=======
  getSubmissions,
  findExam
>>>>>>> newNifemi
} from "../controller/examController.js";
import authenticateUser from "../middleware/authMiddleware.js";

const router = express.Router();

// Create a route for submitting an exam
<<<<<<< HEAD
router.post("/exams/submit", authenticateUser, submitExam);

// Create a route to get the student's score and name
router.get("/exams/score/:examId/:userId", authenticateUser, getExamScore);
router.get(
  "/students/all-scores/:userId",
=======
router.post("/exams/find-exam", authenticateUser, findExam);

router.post("/exams/submit/:sessionId", authenticateUser, submitExam);
router.get("/exams/get-submission/:examId/:userId", authenticateUser, getSubmissions);

// Create a route to get the student's score and name
router.get("/exams/score/:examId/:userId/:session", authenticateUser, getExamScore);
router.get(
  "/students/all-scores/:userId/:sessionId",
>>>>>>> newNifemi
  authenticateUser,
  getAllStudentScores
);

// Create a route to get all students' scores for a specific exam
router.get("/exams/all-scores/:examId", getAllScore);

export default router;
