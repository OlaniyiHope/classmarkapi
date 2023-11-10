import jwt from "jsonwebtoken";
import mongoose from "mongoose";
import User from "../models/userModel.js";

export const register = async (req, res) => {
  try {
    const { role, ...userData } = req.body; // Capture role and user data

    if (!["admin", "teacher", "student"].includes(role)) {
      return res.status(400).json({ error: "Invalid role" });
    }

    const user = new User({ role, ...userData });
    await user.save();

    const token = jwt.sign({ user, role: user.role }, process.env.JWT_SECRET);

    return res.status(201).json({ token, user });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Registration failed" });
  }
};

// export const login = async (req, res) => {
//   const { email, password, role } = req.body;

//   try {
//     // Find the user by email, password, and role
//     const user = await User.findOne({ email, password, role }).exec();

//     if (!user) {
//       return res.status(401).json({ error: "Invalid credentials" });
//     }

//     // Create a JWT with user information

//     const token = jwt.sign({ user, role: user.role }, process.env.JWT_SECRET);

//     return res.status(200).json({ token, user });
//   } catch (error) {
//     console.error(error);
//     return res.status(500).json({ error: "Login failed" });
//   }
// };
export const getUserByRole = async (req, res) => {
  const role = req.params.role;

  try {
    // Find users based on their role
    const users = await User.find({ role: role }).exec();

    if (!users) {
      return res.status(404).json({ error: "No users found with that role" });
    }

    return res.status(200).json(users);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Failed to get users" });
  }
};
export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Find the user by email and password
    const user = await User.findOne({ email, password }).exec();

    if (!user) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    // The user's role can be determined from the 'user' object
    const role = user.role;

    // Create a JWT with user information
    const token = jwt.sign({ user, role }, process.env.JWT_SECRET);

    return res.status(200).json({ token, user });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Login failed" });
  }
};
// authController.js
// export const getStudentsByClass = async (req, res) => {
//   const className = req.params.className;

//   try {
//     const students = await User.find({
//       role: "student",
//       classname: className,
//     }).exec();

//     if (!students) {
//       return res.status(404).json({ error: "No students found in that class" });
//     }

//     return res.status(200).json(students);
//   } catch (error) {
//     console.error(error);
//     return res.status(500).json({ error: "Failed to get students" });
//   }
// };
export const getStudentsByClass = async (req, res) => {
  const className = req.params.className;

  try {
    const students = await User.find({
      role: "student",
      classname: className,
    }).exec();

    if (students.length === 0) {
      return res.status(404).json({ error: "No students found in that class" });
    }

    return res.status(200).json(students);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Failed to get students" });
  }
};

export const getStudentById = async (req, res) => {
  const studentId = req.params.id;
  console.log("Received student ID:", studentId);

  if (!mongoose.Types.ObjectId.isValid(studentId)) {
    return res.status(400).json({ error: "Invalid student ID" });
  }

  try {
    const student = await User.findById(studentId).exec();

    if (!student) {
      return res.status(404).json({ error: "No student found with that ID" });
    }

    // Check if the user's role is "student"
    if (student.role !== "student") {
      return res.status(403).json({ error: "Access denied. Not a student." });
    }

    return res.status(200).json(student); // Directly return the user object
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Failed to get student" });
  }
};
