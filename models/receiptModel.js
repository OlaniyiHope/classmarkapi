// models/Receipt.js
import mongoose from "mongoose";

const ReceiptSchema = new mongoose.Schema(
  {
    typeOfPayment: {
      type: String,
      enum: ["Cash", "Transfer", "Cheque"],
      required: true,
    },
    status: {
      type: String,
      enum: ["Pending", "Success"],
      required: true,
    },
    reason: {
      type: String,
      required: true,
    },
    studentName: {
      type: String, // Assuming the student's name is a string
      required: true,
    },
    classname: {
      type: String,
      required: true,
    },
    balance: {
      type: Number,
      required: true,
    },
    amount: {
      type: Number,
      required: true,
    },
    date: {
      type: Date,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Receipt", ReceiptSchema);
