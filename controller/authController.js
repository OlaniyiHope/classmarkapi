/* global process */

import jwt from "jsonwebtoken";
import mongoose from "mongoose";
import User from "../models/userModel.js";
import Setting from "../models/settingModel.js";
import Account from "../models/accountModel.js";
import bcrypt from "bcryptjs";

export const register = async (req, res) => {
  try {
    const { role, ...userData } = req.body; // Capture role and user data

    if (!["admin", "teacher", "parent", "student"].includes(role)) {
      return res.status(400).json({ error: "Invalid role" });
    }
    const hashedPassword = await bcrypt.hash(userData.password, 10);

    // const user = new User({ role, ...userData });
    const user = new User({ role, ...userData, password: hashedPassword });
    await user.save();

    const token = jwt.sign({ user, role: user.role }, process.env.JWT_SECRET);

    return res.status(201).json({ token, user });
  } catch {
    return res.status(500).json({ error: "Registration failed" });
  }
};

export const getUserByRole = async (req, res) => {
  const role = req.params.role;

  try {
    // Find users based on their role
    const users = await User.find({ role: role }).exec();

    if (!users) {
      return res.status(404).json({ error: "No users found with that role" });
    }

    return res.status(200).json(users);
  } catch {
    return res.status(500).json({ error: "Failed to get users" });
  }
};
// ...
export const login = async (req, res) => {
  const { identifier, password } = req.body;

  try {
    // Find the user by email or username
    const user = await User.findOne({
      $or: [{ email: identifier }, { username: identifier }],
    }).exec();

    console.log("User found:", user);

    if (!user) {
      console.log("User not found");
      return res.status(401).json({ error: "Invalid credentials" });
    }

    // Verify the password
    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      console.log("Password does not match");
      return res.status(401).json({ error: "Invalid credentials" });
    }

    const role = user.role;

    const token = jwt.sign({ user, role }, process.env.JWT_SECRET);

    return res.status(200).json({ token, user });
  } catch {
    return res.status(500).json({ error: "Login failed" });
  }
};

export const getAdmin = async (req, res) => {
  try {
    // Verify the user role (only "admin" can get teachers)
    const teachers = await User.find({ role: "admin" });
    res.status(200).json(teachers);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

export const updateAdmin = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedAdmin = await User.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    if (!updatedAdmin) {
      return res.status(404).json({ message: "Admin not found" });
    }
    res.status(200).json(updatedAdmin);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

export const getAdminById = async (req, res) => {
  try {
    const adminId = req.params.id;
    const admin = await User.findById(adminId); // Assuming you have an Admin model

    if (!admin) {
      return res.status(404).json({ message: "Admin not found" });
    }

    res.json({ admin });
  } catch (error) {
    console.error("Error fetching admin by ID:", error);
    res.status(500).json({ message: "Server error" });
  }
};

export const deleteUser = async (req, res) => {
  const userId = req.params.userId;

  if (!mongoose.Types.ObjectId.isValid(userId)) {
    return res.status(400).json({ error: "Invalid user ID" });
  }

  try {
    const user = await User.findById(userId).exec();

    if (!user) {
      return res.status(404).json({ error: "No user found with that ID" });
    }

    // Perform additional checks if needed (e.g., user role, permissions)

    await user.remove(); // Remove the user from the database

    return res.status(200).json({ message: "User deleted successfully" });
  } catch {
    return res.status(500).json({ error: "Failed to delete user" });
  }
};

export const createSetting = async (req, res) => {
  try {
    const { name, principalName, resumptionDate } = req.body;

    // Check if school profile exists, create if not
    let school = await Setting.findOne();
    if (!school) {
      school = new Setting();
    }

    school.name = name;
    school.principalName = principalName;
    school.resumptionDate = resumptionDate;

    // Handle file upload if a signature file is provided
    if (req.file) {
      school.signature = req.file.filename;
    }

    await school.save();

    res
      .status(200)
      .json({ success: true, message: "School profile updated successfully" });
  } catch {
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

export const getSetting = async (req, res) => {
  try {
    // Assuming you only have one school profile, you can fetch the first one
    const schoolSetting = await Setting.findOne();

    if (!schoolSetting) {
      return res
        .status(404)
        .json({ success: false, message: "School setting not found" });
    }

    res.status(200).json({ success: true, data: schoolSetting });
  } catch {
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};
export const getAccountSetting = async (req, res) => {
  try {
    // Assuming you only have one school profile, you can fetch the first one
    const schoolSetting = await Account.findOne();

    if (!schoolSetting) {
      return res
        .status(404)
        .json({ success: false, message: "School setting not found" });
    }

    res.status(200).json({ success: true, data: schoolSetting });
  } catch {
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

// export const createAccount = async (req, res, s3) => {
//   console.log("Received S3 object:", s3);
//   try {
//     const {
//       name,
//       motto,
//       address,
//       phone,
//       phonetwo,
//       currency,
//       email,
//       sessionStart,
//       sessionEnd,
//     } = req.body;

//     // Check if school profile exists, create if not
//     let school = await Account.findOne();
//     if (!school) {
//       school = new Account();
//     }

//     school.name = name;
//     school.motto = motto;
//     school.address = address;
//     school.phone = phone;
//     school.phonetwo = phonetwo;
//     school.currency = currency;
//     school.email = email;
//     school.sessionStart = sessionStart;
//     school.sessionEnd = sessionEnd;

//     if (req.file) {
//       console.log("Uploading file to S3...");

//       // Add this function to handle the actual S3 upload
//       const uploadParams = {
//         Bucket: "edupros", // Replace with your bucket name
//         Key: `${Date.now()}-${req.file.originalname}`,
//         Body: req.file.buffer,
//         ACL: "public-read",
//         ContentType: req.file.mimetype,
//       };

//       // // Use the S3 uploadParams for the upload
//       // const result = await s3.putObject(uploadParams).promise();
//       // Use the putObject method
//       const result = await s3.putObject(uploadParams);

//       console.log("File uploaded successfully:", result.Location);
//       if (result && result.Location) {
//         school.schoolLogo = result.Key; // Use result.Key for the S3 key
//         console.log("File URL:", result.Location);
//       } else {
//         console.error("Error uploading file to S3:", result);
//       }

//       school.schoolLogo = result.Key; // Use result.Key for the S3 key
//     }

//     await school.save();
//     console.log("Updated School Profile:", school);

//     res
//       .status(200)
//       .json({ success: true, message: "School profile updated successfully" });
//   } catch (error) {
//     console.error("Error updating school profile:", error);
//     res.status(500).json({ success: false, message: "Internal server error" });
//   }
// };

// export const createAccount = async (req, res, s3) => {
//   console.log("Received S3 object:", s3);
//   try {
//     const {
//       name,
//       motto,
//       address,
//       phone,
//       phonetwo,
//       currency,
//       email,
//       sessionStart,
//       sessionEnd,
//     } = req.body;

//     // Check if school profile exists, create if not
//     let school = await Account.findOne();
//     if (!school) {
//       school = new Account();
//     }

//     school.name = name;
//     school.motto = motto;
//     school.address = address;
//     school.phone = phone;
//     school.phonetwo = phonetwo;
//     school.currency = currency;
//     school.email = email;
//     school.sessionStart = sessionStart;
//     school.sessionEnd = sessionEnd;

//     if (req.file) {
//       console.log("Uploading file to S3...");

//       // Add this function to handle the actual S3 upload
//       const uploadParams = {
//         Bucket: "edupros", // Replace with your bucket name
//         Key: `${Date.now()}-${req.file.originalname}`,
//         Body: req.file.buffer,
//         ACL: "public-read",
//         ContentType: req.file.mimetype,
//       };

//       // Use the putObject method
//       const result = await s3.putObject(uploadParams);
//       console.log("S3 Upload Result:", result);
//       console.log("Upload Parameters:", uploadParams);

//       console.log("File uploaded successfully:", result.Location);
//       if (result && result.ETag) {
//         // Update the schoolLogo field with the file URL
//         // school.schoolLogo = `${uploadParams.Bucket}.s3.amazonaws.com/${uploadParams.Key}`;

//         school.schoolLogo = uploadParams.Key;

//         console.log("File URL:", school.schoolLogo);
//       } else {
//         console.error("Error uploading file to S3:", result);
//       }
//     }

//     await school.save();
//     console.log("Updated School Profile:", school);

//     // Add this console log to see the data in the database
//     const updatedSchool = await Account.findOne();
//     console.log("Data in the database:", updatedSchool);

//     res
//       .status(200)
//       .json({ success: true, message: "School profile updated successfully" });
//   } catch (error) {
//     console.error("Error updating school profile:", error);
//     res.status(500).json({ success: false, message: "Internal server error" });
//   }
// };

export const createAccount = async (req, res, s3) => {
  try {
    const {
      name,
      motto,
      address,
      phone,
      phonetwo,
      currency,
      email,
      sessionStart,
      sessionEnd,
    } = req.body;

    console.log("Received request body:", req.body);

    // Check if school profile exists, create if not
    let school = await Account.findOne();
    if (!school) {
      school = new Account();
    }

    school.name = name;
    school.motto = motto;
    school.address = address;
    school.phone = phone;
    school.phonetwo = phonetwo;
    school.currency = currency;
    school.email = email;
    school.sessionStart = sessionStart;
    school.sessionEnd = sessionEnd;

    if (req.file) {
      console.log("Received file:", req.file);

      // Add this function to handle the actual S3 upload
      const uploadParams = {
        Bucket: "edupros", // Replace with your bucket name
        Key: `${Date.now()}-${req.file.originalname}`,
        Body: req.file.buffer,
        ACL: "public-read",
        ContentType: req.file.mimetype,
      };

      console.log("Upload Parameters:", uploadParams);

      // Use the putObject method
      const result = await s3.putObject(uploadParams);
      console.log("S3 Upload Result:", result);

      console.log("File uploaded successfully:", result.Location);
      if (result && result.ETag) {
        school.schoolLogo = uploadParams.Key;
        console.log("File URL:", school.schoolLogo);
      } else {
        console.error("Error uploading file to S3:", result);
      }
    }

    await school.save();
    console.log("Updated School Profile:", school);

    // Add this console log to see the data in the database
    const updatedSchool = await Account.findOne();
    console.log("Data in the database:", updatedSchool);

    res
      .status(200)
      .json({ success: true, message: "School profile updated successfully" });
  } catch {
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

export const updateStudentById = async (req, res) => {
  try {
    const studentId = req.params.id;
    const updatedData = req.body; // Assuming you send the updated data in the request body

    // Validate and update the fields you want to allow modification for
    const allowedUpdates = [
      "studentName",
      "AdmNo",
      "classname",
      "parentsName",
      "gender",
      "username",
      "address",
      "email",
      "password",
      "phone",
    ];
    const isValidUpdate = Object.keys(updatedData).every((update) =>
      allowedUpdates.includes(update)
    );

    if (!isValidUpdate) {
      return res.status(400).json({ error: "Invalid updates" });
    }

    const updatedStudent = await User.findByIdAndUpdate(
      studentId,
      updatedData,
      {
        new: true, // Return the updated document
        runValidators: true, // Run model validators on the update
      }
    );

    if (!updatedStudent) {
      return res.status(404).json({ error: "Student not found" });
    }

    res.status(200).json(updatedStudent);
  } catch {
    res.status(500).json({ error: "Internal server error" });
  }
};

export const updateTeacherById = async (req, res) => {
  const { id } = req.params;
  const updateData = req.body;

  try {
    const updatedTeacher = await User.findByIdAndUpdate(
      id,
      updateData,
      { new: true } // This option returns the modified document
    );

    if (!updatedTeacher) {
      return res.status(404).json({ message: "Teacher not found" });
    }

    res.status(200).json(updatedTeacher);
  } catch {
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// export const getTeacherById = async (req, res) => {
//   const { id } = req.params;

//   try {
//     const teacher = await User.findOne({ _id: id, role: "teacher" });

//     if (!teacher) {
//       return res.status(404).json({ message: "Teacher not found" });
//     }

//     res.status(200).json({ teacher });
//   } catch {
//     res.status(500).json({ message: "Internal Server Error" });
//   }
// };

export const getTeacherById = async (req, res) => {
  try {
    const teacherId = req.params.id;
    const teacher = await User.findById(teacherId); // Assuming you have an Admin model

    if (!teacher) {
      return res.status(404).json({ message: "Teacher not found" });
    }

    res.json({ teacher });
  } catch (error) {
    console.error("Error fetching teacher by ID:", error);
    res.status(500).json({ message: "Server error" });
  }
};
// export const getStudentsByClass = async (req, res) => {
//   const className = req.params.className;

//   try {
//     const students = await User.find({
//       role: "student",
//       classname: className,
//     })
//       // Select all fields you want to retrieve
//       .select("AdmNo studentName address phone email parentsName classname _id")
//       .exec();

//     console.log("Backend Response:", students); // Add this line

//     if (students.length === 0) {
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
    })
      .select("AdmNo studentName address phone email parentsName classname _id")
      .exec();

    console.log("Backend Response:", students); // Add this line

    if (students.length === 0) {
      return res.status(404).json({ error: "No students found in that class" });
    }

    return res.status(200).json(students);
  } catch {
    return res.status(500).json({ error: "Failed to get students" });
  }
};

// export const getStudentById = async (req, res) => {
//   const studentId = req.params.id;
//   console.log("Requested studentId:", studentId);
//   if (!mongoose.Types.ObjectId.isValid(studentId)) {
//     return res.status(400).json({ error: "Invalid student ID" });
//   }
//   console.log("Requested studentId:", studentId);
//   try {
//     const student = await User.findById(studentId).exec();

//     if (!student) {
//       return res.status(404).json({ error: "No student found with that ID" });
//     }

//     // Check if the user's role is "student"
//     if (student.role !== "student") {
//       return res.status(403).json({ error: "Access denied. Not a student." });
//     }

//     return res.status(200).json(student);
//   } catch (error) {
//     console.error(error);
//     return res.status(500).json({ error: "Failed to get student" });
//   }
// };

export const getStudentById = async (req, res) => {
  const studentId = req.params.id;
  console.log("Requested studentId:", studentId);

  if (!mongoose.Types.ObjectId.isValid(studentId)) {
    console.log("Invalid student ID");
    return res.status(400).json({ error: "Invalid student ID" });
  }

  try {
    const student = await User.findById(studentId).exec();
    console.log("Found student in database:", student);

    if (!student) {
      console.log("No student found with that ID");
      return res.status(404).json({ error: "No student found with that ID" });
    }

    if (student.role !== "student") {
      console.log("Access denied. Not a student.");
      return res.status(403).json({ error: "Access denied. Not a student." });
    }

    return res.status(200).json(student);
  } catch {
    return res.status(500).json({ error: "Failed to get student" });
  }
};
