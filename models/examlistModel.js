import mongoose from "mongoose";

const ExamlistSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    className: {
      type: String,
      required: true,
    },
    subject: {
      type: String,
      required: true,
    },
    date: {
      type: Date,
      required: true,
    },
    fromTime: {
      type: String, // Change the type as needed (e.g., String for HH:mm format)
      required: true,
    },
    toTime: {
      type: String, // Change the type as needed (e.g., String for HH:mm format)
      required: true,
    },
    percent: {
      type: Number,
      required: true,
    },
    instruction: {
      type: String,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Examlist", ExamlistSchema);
