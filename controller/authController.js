import jwt from "jsonwebtoken";
import User from "../models/userModel.js";

export const register = async (req, res) => {
  try {
    const { role, ...userData } = req.body; // Capture role and user data

    if (!["admin", "teacher", "student"].includes(role)) {
      return res.status(400).json({ error: "Invalid role" });
    }

    const user = new User({ role, ...userData });
    await user.save();

    const token = jwt.sign({ user, role: user.role }, process.env.JWT_SECRET);

    return res.status(201).json({ token, user });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Registration failed" });
  }
};

// export const login = async (req, res) => {
//   const { email, password, role } = req.body;

//   try {
//     // Find the user by email, password, and role
//     const user = await User.findOne({ email, password, role }).exec();

//     if (!user) {
//       return res.status(401).json({ error: "Invalid credentials" });
//     }

//     // Create a JWT with user information

//     const token = jwt.sign({ user, role: user.role }, process.env.JWT_SECRET);

//     return res.status(200).json({ token, user });
//   } catch (error) {
//     console.error(error);
//     return res.status(500).json({ error: "Login failed" });
//   }
// };
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
export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Find the user by email and password
    const user = await User.findOne({ email, password }).exec();

    if (!user) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    // The user's role can be determined from the 'user' object
    const role = user.role;

    // Create a JWT with user information
    const token = jwt.sign({ user, role }, process.env.JWT_SECRET);

    return res.status(200).json({ token, user });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Login failed" });
  }
};
