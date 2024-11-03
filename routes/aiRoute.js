// examRoutes.js

import express from "express";

import authenticateUser from "../middleware/authMiddleware.js";
import { generateQuestion } from "../controller/aiController.js";

const router = express.Router();

// Create a route for submitting an exam
router.post("/generate-questions", authenticateUser, generateQuestion);

export default router;
