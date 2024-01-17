import { S3 } from "@aws-sdk/client-s3";

import express from "express";
import adRoutes from "./routes/adRoutes.js";
import classRoute from "./routes/classRoute.js";
import examlistRoute from "./routes/examlistRoute.js";
import gradeRoute from "./routes/gradeRoute.js";
import stuRoute from "./routes/stuRoute.js";
import teRoute from "./routes/teRoute.js";
import parentRoute from "./routes/parentRoute.js";
import commonRoute from "./routes/commonRoute.js";
import questionRoute from "./routes/questionRoute.js";
import examRoute from "./routes/examRoute.js";
import subRoute from "./routes/subRoute.js";
import markRoute from "./routes/markRoute.js";
import offlineRoute from "./routes/offlineRoute.js";
import receiptRoute from "./routes/receiptRoute.js";
import onScreenRoute from "./routes/onScreenRoute.js";
import noticeRoute from "./routes/noticeRoute.js";
import { fileURLToPath } from "url";
import { dirname } from "path";
import dotenv from "dotenv";
import path from "path";
import connectDB from "./config/db2.js";
import cors from "cors";

dotenv.config();

const app = express();
connectDB();

app.use(express.json());

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const uploadDir = path.join(__dirname, "uploads");

app.use("/uploads", express.static(uploadDir));
app.use(cors());

// Update the AWS SDK configuration
// Update the AWS SDK configuration
console.log("Setting up AWS SDK configuration...");
const s3 = new S3({
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
  region: process.env.AWS_REGION,
});
console.log(
  "AWS Credentials:",
  process.env.AWS_ACCESS_KEY_ID,
  process.env.AWS_SECRET_ACCESS_KEY
);

app.use("/api/ad", adRoutes);

app.use("/api/", classRoute);
app.use("/api/", examlistRoute);
// app.use("/api/", commonRoute(s3));
app.use("/api/", gradeRoute);
app.use("/api/mark", markRoute);
app.use("/api/", stuRoute);
app.use("/api/", teRoute);
app.use("/api/", parentRoute);
app.use("/api/", onScreenRoute);
app.use("/api/", subRoute);
app.use("/api/", questionRoute);
app.use("/api/", examRoute);
app.use("/api/", noticeRoute);
app.use("/api/", offlineRoute);
app.use("/api/", receiptRoute);

app.use("/api/", commonRoute(s3));
const PORT = process.env.PORT || 5000;
app.listen(PORT, console.log(`Server running on port ${PORT}`));
