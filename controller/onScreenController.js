import mongoose from "mongoose";

import path from "path";
import onScreen from "../models/onScreenModel.js";

export const onScreenController = async (req, res) => {
  try {
    const { file } = req;

    if (!file) {
      return res.status(400).json({ error: "No file provided" });
    }

    const { class: examClass, subject, studentName } = req.body;

    const onScreened = new onScreen({
      class: examClass,
      subject,
      studentName,
      filePath: file.filename,
    });

    await onScreened.save();

    return res.status(200).json({ filename: file.filename });
  } catch (error) {
    console.error("Error uploading on-screen file:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};
