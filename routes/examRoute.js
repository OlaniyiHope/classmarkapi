// examRoutes.js

import express from "express";
import { submitExam } from "../controller/examController.js";
import authenticateUser from "../middleware/authMiddleware.js";

const router = express.Router();

// Create a route for submitting an exam
router.post("/exams/submit", authenticateUser, submitExam);

export default router;
