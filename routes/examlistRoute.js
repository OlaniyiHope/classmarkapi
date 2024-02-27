// examRoutes.js
import express from "express";
import {
  createExam,
  getAllExams,
  getExamById,
  deleteExam,
  getExamsByClass,
  getExamForStudent,
  getTheoryAnswer,
  getTheoryAnswerByName,
} from "../controller/examlistController.js";
import authenticateUser from "../middleware/authMiddleware.js";
const router = express.Router();

// Create a new exam (accessible only to admins)
router.post("/create-exam", authenticateUser, createExam);
router.get("/get-exams-by-class/:classId", authenticateUser, getExamsByClass);

// Get a list of all exams
router.get("/get-exam", getAllExams);

// Get a specific exam by ID
router.get("/get-exam/:id", getExamById);
// Get a specific exam for a specific student by IDs
router.get("/get-exam/:examId/student/:studentId", getExamForStudent);

// router.get(
//   "/get-theory-answer/className/:studentId/:subjectId",
//   getTheoryAnswer
// );
router.get(
  "/get-theory-answer/className/:className/student/:studentId/subject/:subject",
  getTheoryAnswer
);

router.get(
  "/get-theory-answer-by-name/className/:className/student/:studentName/subject/:subject",
  getTheoryAnswerByName
);

// Update an existing exam by ID (accessible only to admins)
// router.put("/:id", updateExam);

// Delete an exam by ID (accessible only to admins)
router.delete("/exam/:id", deleteExam);

export default router;
