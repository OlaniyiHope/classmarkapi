import Exam from "../models/examlistModel.js";
import { parseISO } from "date-fns";
import User from "../models/userModel.js";
// Create a new exam
// export const createExam = async (req, res) => {
//   try {
//     const exam = new Exam(req.body);
//     const createdExam = await exam.save();
//     res.status(201).json(createdExam);
//   } catch (error) {
//     res
//       .status(500)
//       .json({ error: "An error occurred while creating the exam." });
//   }
// };

export const createExam = async (req, res) => {
  try {
    const { date } = req.body;
    const exam = new Exam({
      ...req.body,
      date: parseISO(date),
    });
    const createdExam = await exam.save();
    res.status(201).json(createdExam);
  } catch (error) {
    res
      .status(500)
      .json({ error: "An error occurred while creating the exam." });
  }
};

// Get a list of all exams
export const getAllExams = async (req, res) => {
  try {
    const exams = await Exam.find();
    res.status(200).json(exams);
  } catch (error) {
    res.status(500).json({ error: "An error occurred while fetching exams." });
  }
};

// Get a specific exam by ID
export const getExamById = async (req, res) => {
  try {
    const exam = await Exam.findById(req.params.id);
    if (!exam) {
      return res.status(404).json({ error: "Exam not found" });
    }
    res.status(200).json(exam);
  } catch (error) {
    res
      .status(500)
      .json({ error: "An error occurred while fetching the exam." });
  }
};

// Update an existing exam by ID
// export const updateExam = async (req, res) => {
//   try {
//     const updatedExam = await Exam.findByIdAndUpdate(req.params.id, req.body, {
//       new: true,
//     });
//     if (!updatedExam) {
//       return res.status(404).json({ error: "Exam not found" });
//     }
//     res.status(200).json(updatedExam);
//   } catch (error) {
//     res
//       .status(500)
//       .json({ error: "An error occurred while updating the exam." });
//   }
// };

// Delete an exam by ID
export const deleteExam = async (req, res) => {
  try {
    const deletedExam = await Exam.findByIdAndRemove(req.params.id);
    if (!deletedExam) {
      return res.status(404).json({ error: "Exam not found" });
    }
    res.status(200).json({ message: "Exam deleted successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ error: "An error occurred while deleting the exam." });
  }
};

// examlistController.js
// ... other imports ...

// Function to get exams by class
export const getExamsByClass = async (req, res) => {
  try {
    const classId = req.params.classId; // Get the class identifier from the request parameters

    // Use a database query to fetch exams by class
    const exams = await Exam.find({ className: classId }); // Assuming your schema field for class is 'className'

    // Return the filtered exams as a response
    res.status(200).json(exams);
  } catch (error) {
    console.error("Error fetching exams by class:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// Get a specific exam for a specific student by IDs
export const getExamForStudent = async (req, res) => {
  try {
    const { examId, studentId } = req.params;

    const exam = await Exam.findById(examId);
    if (!exam) {
      return res.status(404).json({ error: "Exam not found" });
    }

    const studentAnswer = exam.submittedAnswers.find(
      (answer) => String(answer.userId) === studentId
    );

    if (!studentAnswer) {
      return res.status(404).json({ error: "Student answer not found" });
    }

    res.status(200).json({ exam, studentAnswer });
  } catch (error) {
    res
      .status(500)
      .json({ error: "An error occurred while fetching the exam." });
  }
};

// export const getTheoryAnswer = async (req, res) => {
//   try {
//     const { className, studentId, subjectId } = req.params;
//     console.log("className:", className);
//     console.log("studentId:", studentId);
//     console.log("subjectId:", subjectId);

//     // Find the exam based on className and subject
//     const exam = await Exam.findOne({ className, subject: subjectId });
//     console.log("exam:", exam);
//     if (!exam) {
//       return res.status(404).json({ error: "Exam not found" });
//     }

//     // Find the theory answer for the specified studentId
//     const theoryAnswer = exam.submittedAnswers.find(
//       (answer) => String(answer.userId) === studentId
//     );

//     if (!theoryAnswer) {
//       return res.status(404).json({ error: "Theory answer not found" });
//     }

//     // Return the theory answer
//     res.status(200).json({ theoryAnswer });
//   } catch (error) {
//     console.error("Error fetching theory answer:", error);
//     res
//       .status(500)
//       .json({ error: "An error occurred while fetching the theory answer" });
//   }
// };

export const getTheoryAnswer = async (req, res) => {
  try {
    const { className, studentId, subject } = req.params;
    console.log("className:", className);
    console.log("studentId:", studentId);
    console.log("subject:", subject);
    // Find the exam based on className and subject
    const exam = await Exam.findOne({ className, subject });
    console.log("where is the exam", exam);
    if (!exam) {
      return res.status(404).json({ error: "Exam not found" });
    }

    // Find the theory answer for the specified studentId
    const theoryAnswer = exam.submittedAnswers.find(
      (answer) => String(answer.userId) === studentId
    );

    if (!theoryAnswer) {
      return res.status(404).json({ error: "Theory answer not found" });
    }

    // Return the theory answer
    res.status(200).json({ theoryAnswer });
  } catch (error) {
    console.error("Error fetching theory answer:", error);
    res
      .status(500)
      .json({ error: "An error occurred while fetching the theory answer" });
  }
};
export const getTheoryAnswerByName = async (req, res) => {
  try {
    const { className, studentName, subject } = req.params;
    console.log("className:", className);
    console.log("studentName:", studentName);
    console.log("subject:", subject);

    // Find the exam based on className and subject
    const exam = await Exam.findOne({ className, subject });
    console.log("Exam:", exam);

    if (!exam) {
      console.log("Exam not found");
      return res.status(404).json({ error: "Exam not found" });
    }

    // Find the student based on the studentName
    const student = await User.findOne({ studentName });
    if (!student) {
      console.log("Student not found");
      return res.status(404).json({ error: "Student not found" });
    }

    // Find the theory answer for the specified studentId (based on studentName)
    const theoryAnswer = exam.submittedAnswers.find(
      (answer) => String(answer.userId) === String(student._id)
    );

    if (!theoryAnswer) {
      console.log("Theory answer not found");
      return res.status(404).json({ error: "Theory answer not found" });
    }

    // Return the theory answer
    console.log("Theory Answer:", theoryAnswer);
    res.status(200).json({ theoryAnswer });
  } catch (error) {
    console.error("Error fetching theory answer by name:", error);
    res.status(500).json({
      error: "An error occurred while fetching the theory answer by name",
    });
  }
};
