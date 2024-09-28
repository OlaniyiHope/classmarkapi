// examRoutes.js
import express from "express";
<<<<<<< HEAD

=======
 
>>>>>>> newNifemi
import authenticateUser from "../middleware/authMiddleware.js";
import {
  createQuestion,
  deleteQuestion,
  getQuestionById,
  getQuestions,
  updateQuestion,
} from "../controller/questionController.js";
const router = express.Router();

// Create a new question
<<<<<<< HEAD
router.post("/questions", authenticateUser, createQuestion);
=======
router.post("/questions/:sessionId", authenticateUser, createQuestion);
>>>>>>> newNifemi
// Retrieve questions for a specific exam
router.get("/questions/:examId", authenticateUser, getQuestions);
router.get("/:questionId", getQuestionById);

// Delete a question by ID
router.delete("/questions/:questionId", authenticateUser, deleteQuestion);
// Create a new route for updating a question
router.put("/questions/:questionId", authenticateUser, updateQuestion);

export default router;
