// examController.js
import Exam from "../models/examlistModel.js";

import Question from "../models/questionModel.js";

// Function to calculate the exam score
const calculateScore = (examId, answers) => {
  // Replace this with your actual scoring logic.
  // You need to compare the answers with the correct answers for the exam.
  // Calculate the score and return it.

  // Example: Calculate the score based on correct answers in the exam.
  // For simplicity, let's assume all answers are correct.
  // You should implement your own scoring logic.
  return 100; // Return a perfect score of 100 for demonstration.
};

// Create a controller function to handle exam submission
// examController.js
export const submitExam = async (req, res) => {
  try {
    // Get the submitted exam answers and user ID from the request body
    const { examId, answers, userId } = req.body;
    console.log("Received data:", req.body);

    // Fetch the exam and its associated questions
    const exam = await Exam.findById(examId).populate("questions");

    if (!exam) {
      return res.status(404).json({ message: "Exam not found" });
    }

    // Store the submitted answers and user ID in the submittedAnswers array
    exam.submittedAnswers.push({ userId, answers });
    await exam.save();

    // Extract correct answers from the questions
    const correctAnswers = exam.questions.reduce((result, question) => {
      result[question._id] = question.correctAnswer;
      return result;
    }, {});

    // You can now perform actions to evaluate the answers and calculate the score
    // Compare 'answers' with 'correctAnswers' to calculate the score
    const score = calculateScore(examId, answers, correctAnswers);

    // You can also save the score or results to the database if needed.

    res.json({ message: "Exam submitted successfully", score: score });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};
