// controllers/fibroidController.js

import mongoose from "mongoose";
import Fibroid from "../models/FibroidModel.js";
import Hbp from "../models/HbpModel.js";
import Ulcer from "../models/UlcerModel.js";
import Erectile from "../models/ErectileModel.js";
import Diabetes from "../models/DiabetesModel.js";
import Stroke from "../models/StrokeModel.js";
import Hiv from "../models/HivModel.js";

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
export const createUlcer = async (req, res) => {
  try {
    const { description } = req.body;

    if (!description) {
      return res.status(400).json({ message: "Description is required" });
    }

    // Create and save the new fibroid document
    const fibroid = new Ulcer({ description });
    await fibroid.save();

    res
      .status(201)
      .json({ message: "Ulcer description created successfully", fibroid });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};
export const createErectile = async (req, res) => {
  try {
    const { description } = req.body;

    if (!description) {
      return res.status(400).json({ message: "Description is required" });
    }

    // Create and save the new fibroid document
    const fibroid = new Erectile({ description });
    await fibroid.save();

    res
      .status(201)
      .json({ message: "Ulcer description created successfully", fibroid });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};
export const createHiv = async (req, res) => {
  try {
    const { description } = req.body;

    if (!description) {
      return res.status(400).json({ message: "Description is required" });
    }

    // Create and save the new fibroid document
    const fibroid = new Hiv({ description });
    await fibroid.save();

    res
      .status(201)
      .json({ message: "Ulcer description created successfully", fibroid });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};
export const createDiabetes = async (req, res) => {
  try {
    const { description } = req.body;

    if (!description) {
      return res.status(400).json({ message: "Description is required" });
    }

    // Create and save the new fibroid document
    const fibroid = new Diabetes({ description });
    await fibroid.save();

    res
      .status(201)
      .json({ message: "Ulcer description created successfully", fibroid });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};
export const createHbp = async (req, res) => {
  try {
    const { description } = req.body;

    if (!description) {
      return res.status(400).json({ message: "Description is required" });
    }

    // Create and save the new fibroid document
    const fibroid = new Hbp({ description });
    await fibroid.save();

    res
      .status(201)
      .json({ message: "Ulcer description created successfully", fibroid });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};
export const createStroke = async (req, res) => {
  try {
    const { description } = req.body;

    if (!description) {
      return res.status(400).json({ message: "Description is required" });
    }

    // Create and save the new fibroid document
    const fibroid = new Stroke({ description });
    await fibroid.save();

    res
      .status(201)
      .json({ message: "Ulcer description created successfully", fibroid });
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
export const getHiv = async (req, res) => {
  try {
    const fibroid = await Hiv.findOne(); // Assumes a single fibroid document exists
    if (!fibroid) {
      return res.status(404).json({ message: "No fibroid description found" });
    }
    res.status(200).json(fibroid);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};
export const getStroke = async (req, res) => {
  try {
    const fibroid = await Stroke.findOne(); // Assumes a single fibroid document exists
    if (!fibroid) {
      return res.status(404).json({ message: "No fibroid description found" });
    }
    res.status(200).json(fibroid);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};
export const getErectile = async (req, res) => {
  try {
    const fibroid = await Erectile.findOne(); // Assumes a single fibroid document exists
    if (!fibroid) {
      return res.status(404).json({ message: "No fibroid description found" });
    }
    res.status(200).json(fibroid);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};
export const getDiabetes = async (req, res) => {
  try {
    const fibroid = await Diabetes.findOne(); // Assumes a single fibroid document exists
    if (!fibroid) {
      return res.status(404).json({ message: "No fibroid description found" });
    }
    res.status(200).json(fibroid);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};
export const getUlcer = async (req, res) => {
  try {
    const fibroid = await Ulcer.findOne(); // Assumes a single fibroid document exists
    if (!fibroid) {
      return res.status(404).json({ message: "No fibroid description found" });
    }
    res.status(200).json(fibroid);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};
export const getHbp = async (req, res) => {
  try {
    const fibroid = await Hbp.findOne(); // Assumes a single fibroid document exists
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
export const updateStroke = async (req, res) => {
  try {
    const { description } = req.body;

    if (!description) {
      return res.status(400).json({ message: "Description is required" });
    }

    let fibroid = await Stroke.findOne();

    if (!fibroid) {
      // If no fibroid exists, create a new one
      fibroid = new Stroke({ description });
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
export const updateHbp = async (req, res) => {
  try {
    const { description } = req.body;

    if (!description) {
      return res.status(400).json({ message: "Description is required" });
    }

    let fibroid = await Hbp.findOne();

    if (!fibroid) {
      // If no fibroid exists, create a new one
      fibroid = new Hbp({ description });
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
export const updateHiv = async (req, res) => {
  try {
    const { description } = req.body;

    if (!description) {
      return res.status(400).json({ message: "Description is required" });
    }

    let fibroid = await Hiv.findOne();

    if (!fibroid) {
      // If no fibroid exists, create a new one
      fibroid = new Hiv({ description });
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
export const updateDiabetes = async (req, res) => {
  try {
    const { description } = req.body;

    if (!description) {
      return res.status(400).json({ message: "Description is required" });
    }

    let fibroid = await Diabetes.findOne();

    if (!fibroid) {
      // If no fibroid exists, create a new one
      fibroid = new Diabetes({ description });
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
export const updateErectile = async (req, res) => {
  try {
    const { description } = req.body;

    if (!description) {
      return res.status(400).json({ message: "Description is required" });
    }

    let fibroid = await Erectile.findOne();

    if (!fibroid) {
      // If no fibroid exists, create a new one
      fibroid = new Erectile({ description });
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
export const updateUlcer = async (req, res) => {
  try {
    const { description } = req.body;

    if (!description) {
      return res.status(400).json({ message: "Description is required" });
    }

    let fibroid = await Ulcer.findOne();

    if (!fibroid) {
      // If no fibroid exists, create a new one
      fibroid = new Ulcer({ description });
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
