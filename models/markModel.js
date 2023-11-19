// import mongoose from "mongoose";

// const MarkSchema = new mongoose.Schema(
//   {
//     examId: {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: "Exam",
//       required: true,
//     },
//     subjectId: {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: "Subject",
//     },
//     marks: [
//       {
//         studentId: { type: String, required: true },
//         examscore: { type: Number, required: true },
//         testscore: { type: Number, required: true },
//         marksObtained: { type: Number, required: true },
//         comment: { type: String },
//       },
//     ],
//   },
//   { timestamps: true }
// );

// export default mongoose.model("Mark", MarkSchema);

import mongoose from "mongoose";

const MarkSchema = new mongoose.Schema(
  {
    examId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Exam",
      required: true,
    },
    marks: [
      {
        subjectName: { type: String, required: true }, // Add subjectName
        subjectId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Subject",
        },
        studentId: { type: String, required: true },
        examscore: { type: Number, required: true },
        testscore: { type: Number, required: true },
        marksObtained: { type: Number, required: true },
        comment: { type: String },
      },
    ],
  },
  { timestamps: true }
);

export default mongoose.model("Mark", MarkSchema);
