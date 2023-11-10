import express from "express";
import Grade from "../models/gradeModel.js";
export const createGrade = async (req, res, next) => {
  const newGrade = new Grade(req.body);
  try {
    const savedGrade = await newGrade.save();
    res.status(200).json(savedGrade);
  } catch (err) {
    console.error("Error:", err);
    res.status(500).json({ error: "Internal server error" });
  }
};
//GET RESULT
export const getGrade = async (req, res) => {
  try {
    const list = await Grade.find();
    res.status(200).json(list);
  } catch (err) {
    res.status(500).json(err);
  }
};
export const getsingleGrade = async (req, res, next) => {
  try {
    const grade = await Grade.findById(req.params.id);
    res.status(200).json(grade);
  } catch (err) {
    next(err);
  }
};
export const deleteGrade = async (req, res, next) => {
  try {
    await Grade.findByIdAndDelete(req.params.id);
    res.status(200).json("Grade has been deleted.");
  } catch (err) {
    next(err);
  }
};
