import Exam from "../models/examlistModel.js";
import User from "../models/userModel.js";

export const submitExam = async (req, res) => {
  try {
    const { examId, answers, userId, score } = req.body; // Include the "score" in the destructuring

    if (!examId || !answers || !userId) {
      return res.status(400).json({ message: "Invalid submission data" });
    }

    // Fetch the exam and ensure it exists
    const exam = await Exam.findById(examId).populate("questions");

    if (!exam) {
      return res.status(404).json({ message: "Exam not found" });
    }

    // Update the user's score in the exam
    const userSubmittedAnswers = {
      userId,
      answers,
      score, // Use the received score
    };

    exam.submittedAnswers.push(userSubmittedAnswers);
    await exam.save();

    res.json({
      message: "Exam submitted successfully",
      score, // Respond with the received score
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const getExamScore = async (req, res) => {
  try {
    const { examId, userId } = req.params;

    if (!examId || !userId) {
      return res.status(400).json({ message: "Invalid parameters" });
    }

    // Find the exam by its ID
    const exam = await Exam.findById(examId);

    if (!exam) {
      return res.status(404).json({ message: "Exam not found" });
    }

    // Find the student's submission within the exam
    const submission = exam.submittedAnswers.find(
      (answer) => answer.userId.toString() === userId
    );

    if (!submission) {
      return res.status(404).json({ message: "Student submission not found" });
    }

    // Retrieve the student's score and user details
    const { score } = submission;
    const student = await User.findById(userId);

    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }

    // Respond with the student's name and score
    res.json({
      studentName: student.studentName,
      score,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const getAllScore = async (req, res) => {
  try {
    const { examId } = req.params;

    if (!examId) {
      return res.status(400).json({ message: "Invalid parameters" });
    }

    // Find the exam by its ID and populate the submittedAnswers field
    const exam = await Exam.findById(examId).populate({
      path: "submittedAnswers.userId", // Reference to the User model
      select: "studentName", // Include the studentName field
    });

    // Log the userId
    console.log(
      "User IDs:",
      exam.submittedAnswers.map((submission) => submission.userId)
    );

    // Extract the student names and scores
    const studentScores = exam.submittedAnswers.map((submission) => {
      const { userId, score } = submission;
      return {
        studentName: userId.studentName,
        score,
      };
    });

    console.log("Student Scores:", studentScores);

    res.json(studentScores);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};
export const getAllStudentScores = async (req, res) => {
  try {
    const { userId } = req.params;

    if (!userId) {
      return res.status(400).json({ message: "Invalid parameters" });
    }

    // Find all exams that the student has submitted answers for
    const exams = await Exam.find({
      "submittedAnswers.userId": userId,
    }).populate({
      path: "submittedAnswers",
      match: { userId }, // Filter by userId
    });

    // Extract student names, exam titles, and scores
    const studentScores = exams.map((exam) => {
      const { title, subject } = exam;
      const submission = exam.submittedAnswers.find(
        (answer) => answer.userId.toString() === userId
      );
      const { score } = submission;
      return {
        examTitle: title,
        subject,
        score,
      };
    });

    console.log("Student Scores:", studentScores);

    res.json(studentScores);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};
