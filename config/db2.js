import express from "express";
import mongoose from "mongoose";
import cors from "cors";
const connectDB = async () => {
  const app = express();
  app.use(cors());
  try {
    const conn = await mongoose.connect(
      "mongodb://127.0.0.1:27017/hopeOla",
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
        useFindAndModify: false,
      }
    );
    console.log("MongoDB connected.");
  } catch (error) {
    console.error(`Error:${error.message}`);
    process.exit(1);
  }
};

export default connectDB;
