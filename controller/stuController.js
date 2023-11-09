import jwt from "jsonwebtoken";
import User from "../models/userModel.js";
import studentReceipt from "../models/createStudentReceipt.js";

export const getStudentsByClass = async (req, res) => {
  const classname = req.params.classname; // Get the class name from the request params

  try {
    // Find students by class name
    const students = await User.find({ role: "invoice", classname }).exec();

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
export const getInvoiceId = async (req, res) => {
  const invId = req.params.id;

  try {
    // Find the Invoice by ID
    const invoice = await studentReceipt.findOne({
      _id: invId
    }).exec();

    if (!invoice) {
      return res.status(404).json({ error: "Invoice not found" });
    }

    return res.status(200).json(invoice);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Failed to get invoice" });
  }
};
export const getStudentInvoiceId = async (req, res) => {
  const invId = req.params.id;

  try {
    // Find the Invoice Of student by ID
    const invoice = await studentReceipt.find({
      stuId: invId
    }).exec();

    if (!invoice) {
      return res.status(404).json({ error: "Invoice Of student not found" });
    }

    return res.status(200).json(invoice);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Failed to get invoice" });
  }
};
export const getTransactionHistInv = async (req, res) => {
  const invId = req.params.id;

  try {
    // Find the Invoice Hist by ID
    const invoice = await studentReceipt.find({
      specialId: invId
    }).exec();

    req.invoice = invoice

    const invoiced = req.invoice;
    // Delete the invoice
    await invoiced.remove();

    if (!invoice) {
      return res.status(404).json({ error: "Invoice History not found" });
    }

    return res.status(200).json(invoice);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Failed to get invoice" });
  }
};
export const deleteInv = async (req, res) => {
  const receiptId = req.params.id;
  studentReceipt.deleteOne({ _id: receiptId }, (err) => {
    if (err) {
      res.status(500).send('Failed to delete the receipt');
    } else {
      res.status(200).send('Receipt deleted successfully');
    }
  });
};

