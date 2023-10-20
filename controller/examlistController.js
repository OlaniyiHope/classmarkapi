import Exam from "../models/examlistModel.js";
// Create a new exam
export const createExam = async (req, res) => {
  try {
    const exam = new Exam(req.body);
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
export const updateExam = async (req, res) => {
  try {
    const updatedExam = await Exam.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!updatedExam) {
      return res.status(404).json({ error: "Exam not found" });
    }
    res.status(200).json(updatedExam);
  } catch (error) {
    res
      .status(500)
      .json({ error: "An error occurred while updating the exam." });
  }
};

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
