import jwt from "jsonwebtoken";
import mongoose from "mongoose";
import User from "../models/userModel.js";
import Setting from "../models/settingModel.js";
import Class from "../models/classModel.js";
import Download from "../models/downloadModel.js";

// export const createDownload = async (req, res, s3) => {
//   try {
//     const { date, title, desc, className, subject } = req.body;

//     console.log("Received request body:", req.body);

//     // Check if school profile exists, create if not
//     let school = await Download.findOne();
//     if (!school) {
//       school = new Download();
//     }

//     school.date = date;
//     school.title = title;
//     school.desc = desc;
//     school.className = className;
//     school.subject = subject;

//     if (req.file) {
//       console.log("Received file:", req.file);

//       // Add this function to handle the actual S3 upload
//       const uploadParams = {
//         Bucket: "edupros", // Replace with your bucket name
//         Key: `${Date.now()}-${req.file.originalname}`,
//         Body: req.file.buffer,
//         ACL: "public-read",
//         ContentType: req.file.mimetype,
//       };

//       console.log("Upload Parameters:", uploadParams);

//       // Use the putObject method
//       const result = await s3.putObject(uploadParams);
//       console.log("S3 Upload Result:", result);

//       console.log("File uploaded successfully:", result.Location);
//       if (result && result.ETag) {
//         school.Download = uploadParams.Key;
//         console.log("File URL:", school.Download);
//       } else {
//         console.error("Error uploading file to S3:", result);
//       }
//     }

//     await school.save();
//     console.log("Updated School Profile:", school);

//     // Add this console log to see the data in the database
//     const updatedSchool = await Download.findOne();
//     console.log("Data in the database:", updatedSchool);

//     res
//       .status(200)
//       .json({ success: true, message: "File updated successfully" });
//   } catch (error) {
//     console.error("Error updating File:", error);
//     res.status(500).json({ success: false, message: "Internal server error" });
//   }
// };

export const createDownload = async (req, res, s3) => {
  try {
    const { date, title, desc, className, subject } = req.body;

    console.log("Received request body:", req.body);

    // Create a new instance of Download model
    const newDownload = new Download({
      date,
      title,
      desc,
      className,
      subject,
    });

    if (req.file) {
      console.log("Received file:", req.file);

      // Generate a unique filename
      const fileName = `${Date.now()}-${req.file.originalname}`;

      const uploadParams = {
        Bucket: "edupros", // Replace with your bucket name
        Key: fileName, // Use the generated filename
        Body: req.file.buffer,
        ACL: "public-read",
        ContentType: req.file.mimetype,
      };

      console.log("Upload Parameters:", uploadParams);

      // Use the putObject method to upload the file to S3
      const result = await s3.putObject(uploadParams);
      console.log("S3 Upload Result:", result);

      console.log("File uploaded successfully:", result.Location);

      // Save the filename to the newDownload object
      newDownload.Download = fileName;
    }

    // Save the newDownload object to the database
    const savedDownload = await newDownload.save();
    console.log("Saved Download:", savedDownload);

    res
      .status(200)
      .json({ success: true, message: "File uploaded successfully" });
  } catch (error) {
    console.error("Error uploading file:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};
