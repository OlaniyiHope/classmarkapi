import mongoose from "mongoose";

const ClassSchema = new mongoose.Schema(
  {
    classId: {
      type: Number,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    teacher: {
      type: String,
      required: true,
    },
    students: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User", // Assuming your student model is named 'Student'
      },
    ],
<<<<<<< HEAD
    session: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Session", // Reference to the Session model
      required: true,
    },
=======
    session: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Session' }],
>>>>>>> newNifemi
  },
  { timestamps: true }
);

export default mongoose.model("Class", ClassSchema);
