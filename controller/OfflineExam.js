import Exam from "../models/examModel.js";
import User from "../models/userModel.js";

export const submitExam = async (req, res) => {
  const newExam = new Exam(req.body); // Include the "score" in the destructuring

  try {
    const savedExam = await newExam.save();
    res.status(200).json(savedExam);
  } catch (err) {
    console.error("Error:", err);
    res.status(500).json({ error: "Internal server error" });
  }
};
export const getExam = async (req, res) => {
  try {
    const list = await Exam.find();
    res.status(200).json(list);
  } catch (err) {
    res.status(500).json(err);
  }
};
// Save exam marks
