import mongoose from "mongoose";
import { parseISO } from "date-fns";
import Jamb from "../models/jambModel.js";

// Create JAMB Exam
// export const createJambExam = async (req, res) => {
//   try {
//     const { date, subject, fromTime, toTime, instruction, questions } =
//       req.body;

//     // Validate required fields
//     if (!subject || !date || !fromTime || !toTime) {
//       return res.status(400).json({ error: "All fields are required" });
//     }

//     // Create JAMB exam
//     const exam = new Jamb({
//       subject,
//       date: parseISO(date),
//       fromTime,
//       toTime,
//       instruction,
//       questions,
//     });

//     const createdExam = await exam.save();
//     res.status(201).json(createdExam);
//   } catch (error) {
//     console.error("Error creating JAMB exam:", error);
//     res
//       .status(500)
//       .json({ error: "An error occurred while creating the exam." });
//   }
// };

export const createJambExam = async (req, res) => {
  try {
    const {
      subject,
      year,
      date,
      fromTime,
      toTime,
      instruction,
      sessionId,
      questions,
    } = req.body;

    // Validate required fields
    if (!subject || !year || !date || !fromTime || !toTime || !sessionId) {
      return res.status(400).json({ error: "All fields are required" });
    }

    if (!mongoose.Types.ObjectId.isValid(sessionId)) {
      return res.status(400).json({ error: "Invalid session ID" });
    }

    // Create JAMB exam
    const exam = new Jamb({
      subject,
      year,
      date: parseISO(date),
      fromTime,
      toTime,
      instruction,
      session: sessionId,
      questions,
    });

    const createdExam = await exam.save();
    res.status(201).json(createdExam);
  } catch (error) {
    console.error("Error creating JAMB exam:", error);
    res
      .status(500)
      .json({ error: "An error occurred while creating the exam." });
  }
};

// Get all JAMB Exams
export const getAllJambExams = async (req, res) => {
  try {
    const exams = await Jamb.find().populate("questions");
    res.status(200).json(exams);
  } catch (error) {
    console.error("Error fetching JAMB exams:", error);
    res.status(500).json({ error: "An error occurred while fetching exams." });
  }
};

// Get JAMB Exam by ID
// export const getJambExamById = async (req, res) => {
//   try {
//     const { id } = req.params;

//     if (!mongoose.Types.ObjectId.isValid(id)) {
//       return res.status(400).json({ error: "Invalid exam ID" });
//     }

//     const exam = await Jamb.findById(id).populate("questions");
//     if (!exam) {
//       return res.status(404).json({ error: "Exam not found" });
//     }

//     res.status(200).json(exam);
//   } catch (error) {
//     console.error("Error fetching JAMB exam:", error);
//     res
//       .status(500)
//       .json({ error: "An error occurred while fetching the exam." });
//   }
// };

export const getJambExamById = async (req, res) => {
  try {
    const { examId, sessionId } = req.params;

    // Validate examId
    if (!mongoose.Types.ObjectId.isValid(examId)) {
      return res.status(400).json({ error: "Invalid exam ID" });
    }

    // Validate sessionId
    if (!mongoose.Types.ObjectId.isValid(sessionId)) {
      return res.status(400).json({ error: "Invalid session ID" });
    }

    // Convert sessionId to ObjectId for the query
    const exam = await Jamb.findOne({
      _id: examId,
      session: new mongoose.Types.ObjectId(sessionId), // Use ObjectId for session
    }).populate("questions");

    if (!exam) {
      return res.status(404).json({ error: "Exam not found for this session" });
    }

    // Allow access if className is "JAMB" or starts with "S.S.3"
    if (exam.className === "JAMB" || exam.className.startsWith("S.S.3.S")) {
      return res.status(200).json(exam);
    } else {
      return res.status(403).json({ error: "Access denied for this class" });
    }
  } catch (error) {
    console.error("Error fetching JAMB exam:", error);
    res
      .status(500)
      .json({ error: "An error occurred while fetching the exam." });
  }
};

// Submit JAMB Exam Answers
export const submitJambExamAnswers = async (req, res) => {
  try {
    const { examId, userId, answers, score } = req.body;

    if (!mongoose.Types.ObjectId.isValid(examId)) {
      return res.status(400).json({ error: "Invalid exam ID" });
    }
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({ error: "Invalid user ID" });
    }

    const exam = await Jamb.findById(examId);
    if (!exam) {
      return res.status(404).json({ error: "Exam not found" });
    }

    exam.submittedAnswers.push({ userId, answers, score });
    await exam.save();

    res.status(200).json({ message: "Exam submitted successfully" });
  } catch (error) {
    console.error("Error submitting JAMB exam:", error);
    res
      .status(500)
      .json({ error: "An error occurred while submitting the exam." });
  }
};
export const getJambExamsByYear = async (req, res) => {
  try {
    const { year } = req.params;

    const exams = await Jamb.find({ year }).populate("questions session");
    if (exams.length === 0) {
      return res.status(404).json({ error: "No exams found for this year" });
    }

    res.status(200).json(exams);
  } catch (error) {
    console.error("Error fetching JAMB exams by year:", error);
    res.status(500).json({ error: "An error occurred while fetching exams." });
  }
};
