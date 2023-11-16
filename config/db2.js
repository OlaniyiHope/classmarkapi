import express from "express";
import mongoose from "mongoose";
import cors from "cors";
// const connectDB = async () => {
//   const app = express();
//   app.use(cors());
//   try {
//     const conn = await mongoose.connect(
//       "mongodb+srv://olaniyihoppee:take100@cluster0.fzjtw.mongodb.net/yoo?retryWrites=true&w=majority",
//       {
//         useNewUrlParser: true,
//         useUnifiedTopology: true,
//         useCreateIndex: true,
//         useFindAndModify: false,
//       }
//     );
//     console.log("MongoDB connected.");
//   } catch (error) {
//     console.error(`Error:${error.message}`);
//     process.exit(1);
//   }
// };

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false,
    });
    console.log("MongoDB connected.");
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

export default connectDB;
