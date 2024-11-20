// controllers/fibroidController.js

import mongoose from "mongoose";
import Fibroid from "../models/FibroidModel.js";

export const createFibroid = async (req, res) => {
  try {
    const { description } = req.body;

    if (!description) {
      return res.status(400).json({ message: "Description is required" });
    }

    // Create and save the new fibroid document
    const fibroid = new Fibroid({ description });
    await fibroid.save();

    res
      .status(201)
      .json({ message: "Fibroid description created successfully", fibroid });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};
// Fetch the fibroid description
export const getFibroid = async (req, res) => {
  try {
    const fibroid = await Fibroid.findOne(); // Assumes a single fibroid document exists
    if (!fibroid) {
      return res.status(404).json({ message: "No fibroid description found" });
    }
    res.status(200).json(fibroid);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

export const updateFibroid = async (req, res) => {
  try {
    const { description } = req.body;

    if (!description) {
      return res.status(400).json({ message: "Description is required" });
    }

    let fibroid = await Fibroid.findOne();

    if (!fibroid) {
      // If no fibroid exists, create a new one
      fibroid = new Fibroid({ description });
    } else {
      // Otherwise, update the existing description
      fibroid.description = description;
      fibroid.updatedAt = Date.now();
    }

    await fibroid.save();

    res
      .status(200)
      .json({ message: "Description updated successfully", fibroid });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};
