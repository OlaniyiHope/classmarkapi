// schoolModel.js
import mongoose from "mongoose";

const settingSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  signature: {
    type: String, // You can store the file path or base64 representation
  },
  principalName: {
    type: String,
  },
  resumptionDate: {
    type: Date,
  },
  session: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Session", // Reference to the Session model
    required: true,
  },
});

const School = mongoose.model("Setting", settingSchema);

export default School;
