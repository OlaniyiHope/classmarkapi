import mongoose from "mongoose";

const GradeSchema = new mongoose.Schema(
  {
    grade_name: {
      type: String,
      required: true,
    },
    gradepoint: {
      type: String,
      required: true,
    },
    markfrom: {
      type: String,
      required: true,
    },
    markupto: {
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

export default mongoose.model("Grade", GradeSchema);
