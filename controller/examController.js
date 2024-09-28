import Exam from "../models/examlistModel.js";
import User from "../models/userModel.js";

<<<<<<< HEAD
export const submitExam = async (req, res) => {
  try {
    const { examId, answers, userId, score } = req.body; // Include the "score" in the destructuring

=======
import mongoose from "mongoose";


export const submitExam = async (req, res) => {
  const { sessionId } = req.params;

  try {
    const { examId, answers, userId, score } = req.body; // Include the "score" in the destructuring

    const sessionObjectId = mongoose.Types.ObjectId(sessionId);

>>>>>>> newNifemi
    if (!examId || !answers || !userId) {
      return res.status(400).json({ message: "Invalid submission data" });
    }

    // Fetch the exam and ensure it exists
<<<<<<< HEAD
    const exam = await Exam.findById(examId).populate("questions");
=======
    const exam = await Exam.findOne({
      _id: examId,
      session: sessionObjectId,
    }).populate("questions");
>>>>>>> newNifemi

    if (!exam) {
      return res.status(404).json({ message: "Exam not found" });
    }

<<<<<<< HEAD
    // Update the user's score in the exam
=======
>>>>>>> newNifemi
    const userSubmittedAnswers = {
      userId,
      answers,
      score, // Use the received score
    };

<<<<<<< HEAD
    exam.submittedAnswers.push(userSubmittedAnswers);
=======
    // Check if the user has already submitted answers
    const existingSubmissionIndex = exam.submittedAnswers.findIndex(
      (submission) => submission.userId.toString() === userId
    );

    if (existingSubmissionIndex !== -1) {
      // If the user has already submitted, update the existing submission
      exam.submittedAnswers[existingSubmissionIndex] = userSubmittedAnswers;
      console.log("Updating existing submission:", userSubmittedAnswers);
    } else {
      // If the user hasn't submitted yet, add a new submission
      exam.submittedAnswers.push(userSubmittedAnswers);
      console.log("New submission:", userSubmittedAnswers);
    }

>>>>>>> newNifemi
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

<<<<<<< HEAD
=======
export const findExam = async (req, res) => {
  const { name, session } = req.body;

  try {
    const exam = await Exam.findOne({ title: name, session: session }).exec();

    if (exam) {
      return res.status(200).json({ success: true, examId: exam._id });
    } else {
      return res.status(404).json({ success: false, message: 'Exam not found' });
    }
  } catch (error) {
    console.error('Error finding exam:', error);
    return res.status(500).json({ success: false, message: 'Server error' });
  }
};



export const getSubmissions = async (req, res) => {
  const { examId, userId } = req.params;

  try {
    // Fetch the exam and ensure it exists
    const exam = await Exam.findOne({
      _id: examId,
    }).populate("questions");

    if (!exam) {
      return res.status(404).json({ message: "Exam not found" });
    }

    // Find the user's submission
    const userSubmission = exam.submittedAnswers.find(
      (submission) => submission.userId.toString() === userId
    );

    if (!userSubmission) {
      return res.status(404).json({ message: "No submission found for this user" });
    }

    // Send the user's answers and score back in the response
    res.json({
      answers: userSubmission.answers,
      score: userSubmission.score,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};



>>>>>>> newNifemi
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
<<<<<<< HEAD
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
=======

export const getAllStudentScores = async (req, res) => {
  try {
    const { userId, sessionId } = req.params;

    if (!userId || !sessionId) {
      return res.status(400).json({ message: "Invalid parameters" });
    }

    const userObjectId = mongoose.Types.ObjectId(userId);
    const sessionObjectId = mongoose.Types.ObjectId(sessionId);

    // Find all exams where the student has submitted answers and sessionId matches
    const exams = await Exam.find({
      "submittedAnswers.userId": userObjectId, // Match userId in submittedAnswers
      session: sessionObjectId, // Match sessionId
    }).populate({
      path: "submittedAnswers.userId", // Populate the userId to get student details
>>>>>>> newNifemi
    });

    // Extract student names, exam titles, and scores
    const studentScores = exams.map((exam) => {
      const { title, subject } = exam;
<<<<<<< HEAD
      const submission = exam.submittedAnswers.find(
        (answer) => answer.userId.toString() === userId
      );
      const { score } = submission;
=======

      console.log(title)

      // Find the specific user's submission in each exam
      const submission = exam.submittedAnswers.find(
        (answer) => answer.userId.equals(userObjectId) // Use equals for ObjectId comparison
      );


      console.log(submission)

      // Handle case where no submission is found (if needed)
      if (!submission) {
        return null;
      }

      const { score } = submission;

>>>>>>> newNifemi
      return {
        examTitle: title,
        subject,
        score,
      };
<<<<<<< HEAD
    });
=======
    }).filter(Boolean); // Filter out any null values
>>>>>>> newNifemi

    console.log("Student Scores:", studentScores);

    res.json(studentScores);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};
<<<<<<< HEAD
=======

>>>>>>> newNifemi
