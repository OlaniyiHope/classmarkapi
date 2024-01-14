import jwt from "jsonwebtoken";
import mongoose from "mongoose";
import User from "../models/userModel.js";
import Setting from "../models/settingModel.js";
import Class from "../models/classModel.js";
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
  } catch (error) {
    console.error(error);
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
  } catch (error) {
    console.error(error);
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
  } catch (error) {
    console.error("Login error:", error);
    return res.status(500).json({ error: "Login failed" });
  }
};

// ...

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
    })
      .select("AdmNo studentName email address username _id")
      .exec();

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

    return res.status(200).json(student);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Failed to get student" });
  }
};
export const getAdmin = async (req, res, next) => {
  try {
    // Verify the user role (only "admin" can get teachers)

    const teachers = await User.find({ role: "admin" });
    res.status(200).json(teachers);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
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
  } catch (error) {
    console.error(error);
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
  } catch (error) {
    console.error(error);
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
  } catch (error) {
    console.error(error);
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
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

export const createAccount = async (req, res) => {
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
      school.schoolLogo = req.file.filename;
    }

    await school.save();

    res
      .status(200)
      .json({ success: true, message: "School profile updated successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};
