import mongoose from "mongoose";

const MarkSchema = new mongoose.Schema(
  {
    student_name: {
      type: String,
      required: true,
    },
    classname: {
      type: String,
      required: true,
    },
    term: {
      type: String,
      required: true,
    },
    subject: {
      type: String,
      required: true,
    },
    ca: {
      type: String,
      required: true,
    },
    exam: {
      type: String,
      required: true,
    },
    markobtained: {
      type: String,
      required: true,
    },
    comment: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Mark", MarkSchema);
