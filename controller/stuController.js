import User from "../models/userModel.js";

export const getStudentsByClass = async (req, res) => {
  const classname = req.params.classname; // Get the class name from the request params

  try {
    // Find students by class name
    const students = await User.find({ role: "student", classname }).exec();

    if (!students) {
      return res.status(404).json({ error: "No students found in that class" });
    }

    return res.status(200).json(students);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Failed to get students" });
  }
};
// authController.js
// ... (other imports)

export const getStudentById = async (req, res) => {
  const studentId = req.params.id;

  try {
    // Find the student by ID
    const student = await User.findOne({
      _id: studentId,
      role: "student",
    }).exec();

    if (!student) {
      return res.status(404).json({ error: "Student not found" });
    }

    return res.status(200).json(student);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Failed to get student" });
  }
};
