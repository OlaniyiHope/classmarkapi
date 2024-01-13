import mongoose from "mongoose";
const onScreenSchema = new mongoose.Schema(
  {
    class: {
      type: String,
      required: true,
    },
    subject: {
      type: String,
      required: true,
    },
    studentName: {
      type: String,
      required: true,
    },
    filePath: {
      type: String,
    },
    uploadDate: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

export default mongoose.model("onScreen", onScreenSchema);
