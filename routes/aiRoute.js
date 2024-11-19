// examRoutes.js

import express from "express";

import authenticateUser from "../middleware/authMiddleware.js";
import {
  generateLessonNote,
  generateQuestion,
} from "../controller/aiController.js";

const router = express.Router();

// Create a route for submitting an exam
router.post("/generate-questions", authenticateUser, generateQuestion);
router.post("/generate-lesson-note", authenticateUser, generateLessonNote);

export default router;
