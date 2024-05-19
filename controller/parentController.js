import express from "express";
import jwt from "jsonwebtoken";
import User from "../models/userModel.js"; // Replace with your actual model

const router = express.Router();

// Create a Teacher (Authenticated Route)

export const createParent = async (req, res, next) => {
  try {
    // Verify the user role (only "admin" can create teachers)
    if (req.user.role !== "admin") {
      return res.status(403).json({ message: "Permission denied" });
    }

    // Create a teacher (You may customize this)
    const parent = new User({
      role: "parent",
      username: req.body.username,
      email: req.body.email,
      password: req.body.password,
      address: req.body.address,
      phone: req.body.phone,
      role: req.body.role,
      // subjectTaught: req.body.subjectTaught, // Add other teacher-specific fields
    });

    const createdParent = await parent.save();
    res.status(201).json(createdParent);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

// Get All Teachers (Authenticated Route)

export const getParent = async (req, res, next) => {
  try {
    // Verify the user role (only "admin" can get teachers)
    // if (req.user.role !== "admin") {
    //   return res.status(403).json({ message: "Permission denied" });
    // }

    const parent = await User.find({ role: "parent" });
    res.status(200).json(parent);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

export default router;
