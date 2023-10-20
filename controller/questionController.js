import Question from "../models/questionModel.js";

// Create a new question
export const createQuestion = async (req, res) => {
  try {
    const {
      questionType,
      questionTitle,
      options,
      correctAnswer,
      mark,
      examId,
    } = req.body;

    let questionData = {
      questionType,
      questionTitle,
      mark,
      exam: examId,
    };

    if (questionType === "multiple_choice") {
      // For multiple-choice questions
      questionData.options = options;
    } else if (questionType === "true_false") {
      // For True/False questions
      questionData.correctAnswer = correctAnswer;
    }

    const question = new Question(questionData);

    await question.save();
    res.json({ message: "Question saved successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Retrieve questions for a specific exam
export const getQuestions = async (req, res) => {
  try {
    const examId = req.params.examId; // You can obtain the examId from the route params

    const questions = await Question.find({ exam: examId });

    res.json(questions);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};
