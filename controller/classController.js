import Class from "../models/classModel.js";
import express from "express";
// export const createClass = async (req, res, next) => {
//   const newClas = new Class(req.body);
//   try {
//     const savedClas = await newClas.save();
//     res.status(200).json(savedClas);
//   } catch (err) {
//     res.status(500).json(err);
//   }
// };

export const createClass = async (req, res, next) => {
  try {
    // Find the latest class to get its classId
    const latestClass = await Class.findOne({}, {}, { sort: { classId: -1 } });

    // Calculate the next classId
    const nextClassId = (latestClass && latestClass.classId + 1) || 1;

    const newClass = new Class({
      classId: nextClassId,
      name: req.body.name,
      teacher: req.body.teacher,
    });

    const savedClass = await newClass.save();
    res.status(200).json(savedClass);
  } catch (err) {
    res.status(500).json(err);
  }
};

//GET CATEGORY
export const getClass = async (req, res) => {
  try {
    const clas = await Class.find();
    res.status(200).json(clas);
  } catch (err) {
    res.status(500).json(err);
  }
};
export const getsingleClass = async (req, res, next) => {
  try {
    const classes = await Class.findById(req.params.id);
    res.status(200).json(classes);
  } catch (err) {
    next(err);
  }
};
export const deleteClass = async (req, res, next) => {
  try {
    await Class.findByIdAndDelete(req.params.id);
    res.status(200).json("Class has been deleted.");
  } catch (err) {
    next(err);
  }
};
