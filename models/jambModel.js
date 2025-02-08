import mongoose from "mongoose";

const JambSchema = new mongoose.Schema(
  {
    className: {
      type: String,
      default: "JAMB", // Default class name
    },
    subject: {
      type: String,
      required: true,
    },
    year: {
      type: Number,
      required: true,
    },
    date: {
      type: Date,
      required: true,
    },
    session: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Session", // Reference to the Session model
      required: true,
    },
    fromTime: {
      type: String,
      required: true,
    },
    toTime: {
      type: String,
      required: true,
    },
    instruction: {
      type: String,
    },
    questions: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Question", // Reference to the "Question" model
      },
    ],
    submittedAnswers: [
      {
        userId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User", // Reference to the User model
          select: "studentName",
        },
        answers: {
          type: Object, // Store answers with question IDs as keys
          of: String, // Assuming answers are strings
        },
        score: {
          type: Number, // Store exam score
        },
      },
    ],
  },
  { timestamps: true }
);

export default mongoose.model("Jamb", JambSchema);
