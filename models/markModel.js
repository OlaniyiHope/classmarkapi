import mongoose from "mongoose";

const MarkSchema = new mongoose.Schema(
  {
    examId: { type: String, required: true },
    marks: [
      {
        studentId: { type: String, required: true },
        examscore: { type: Number, required: true },
        marksObtained: { type: Number, required: true },
        comment: { type: String },
      },
    ],
  },
  { timestamps: true }
);

export default mongoose.model("Mark", MarkSchema);
