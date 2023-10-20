import Subject from "../models/subModel.js";
import User from "../models/userModel.js";
import Class from "../models/classModel.js";
import express from "express";

export const createSubject = async (req, res, next) => {
  const { name, teacher, classname } = req.body;
  try {
    // Find the teacher and class documents by name
    const teacherDocument = await User.findOne({
      username: teacher,
      role: "teacher",
    });
    const classDocument = await Class.findOne({ name: classname });

    if (!teacherDocument || !classDocument) {
      // Handle errors if the teacher or class isn't found
      res.status(404).json({ error: "Teacher or class not found" });
      return;
    }

    const newSub = new Subject({
      name,
      teacher: teacherDocument.username, // Store teacher's username
      classname: classDocument.name, // Store class name
    });

    const savedSub = await newSub.save();
    res.status(200).json(savedSub);
  } catch (err) {
    res.status(500).json(err);
  }
};

export const getallSubject = async (req, res) => {
  try {
    const subjects = await Subject.find();
    res.status(200).json(subjects);
  } catch (err) {
    res.status(500).json(err);
  }
};

export const getSubjectsByClass = async (req, res) => {
  const { classname } = req.params; // Extract the class name from the route parameters

  try {
    const subjects = await Subject.find({ classname }); // Find subjects with the specified class name
    res.status(200).json(subjects);
  } catch (err) {
    res.status(500).json(err);
  }
};
