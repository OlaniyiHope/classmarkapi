// examRoutes.js
import express from "express";

import authenticateUser from "../middleware/authMiddleware.js";
import {
  createQuestion,
  getQuestions,
} from "../controller/questionController.js";
const router = express.Router();

// Create a new question
router.post("/questions", authenticateUser, createQuestion);
// Retrieve questions for a specific exam
router.get("/questions/:examId", authenticateUser, getQuestions);
export default router;
