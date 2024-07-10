/* global process */

import { S3 } from "@aws-sdk/client-s3";

import express from "express";
import adRoutes from "./routes/adRoutes.js";
import classRoute from "./routes/classRoute.js";
import examlistRoute from "./routes/examlistRoute.js";
import gradeRoute from "./routes/gradeRoute.js";
import catRoute from "./routes/catRoute.js";
import stuRoute from "./routes/stuRoute.js";
import teRoute from "./routes/teRoute.js";
import parentRoute from "./routes/parentRoute.js";
import commonRoute from "./routes/commonRoute.js";
import questionRoute from "./routes/questionRoute.js";
import examRoute from "./routes/examRoute.js";
import subRoute from "./routes/subRoute.js";
import markRoute from "./routes/markRoute.js";
import offlineRoute from "./routes/offlineRoute.js";
import OffRoutes from "./routes/OffRoutes.js";
import psyRoute from "./routes/psyRoute.js";
import receiptRoute from "./routes/receiptRoute.js";
import onScreenRoute from "./routes/onScreenRoute.js";
import noticeRoute from "./routes/noticeRoute.js";
import { fileURLToPath } from "url";
import { dirname } from "path";
import dotenv from "dotenv";
import path from "path";
import connectDB from "./config/db2.js";
import cors from "cors";
import { getStudentsByClass } from "./controller/authController.js";
import authenticateUser from "./middleware/authMiddleware.js";

dotenv.config();

const app = express();
connectDB();

app.use(express.json());

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// const uploadDir = path.join(__dirname, "uploads");

const uploadDir = path.join(process.cwd(), "uploads");

app.use("/uploads", express.static(uploadDir));

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
// Configure CORS
const corsOptions = {
  origin: ["https://hlhs.edupro.com.ng", "http://localhost:3000"], // specify your client's URL
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
};

app.use(cors(corsOptions));
app.use("/api/ad", adRoutes);
app.use("/api/", examlistRoute);
app.use("/api/", OffRoutes);
app.use("/api/", noticeRoute);
app.use("/api/", receiptRoute);

// Use commonRouter with specific routes requiring authentication

const authRoutes = [
  { method: "get", path: "/students/:id", middleware: authenticateUser },
  { method: "get", path: "/teachers/:id", middleware: authenticateUser },
  { method: "get", path: "/get-admin", middleware: authenticateUser },
  { method: "put", path: "/students/:id", middleware: authenticateUser },
  { method: "put", path: "/teachers/:id", middleware: authenticateUser },
];

const commonRouterWithAuth = commonRoute(s3, authRoutes);
const onScreen = onScreenRoute(s3);

app.use("/api/", onScreen);
app.use("/api/", commonRouterWithAuth);
app.use("/api/student/:className", getStudentsByClass);

app.use("/api/", classRoute);

// app.use("/api/", commonRoute(s3));
app.use("/api/", gradeRoute);
app.use("/api/", catRoute);
app.use("/api/mark", markRoute);
app.use("/api/", stuRoute);
app.use("/api/", teRoute);
app.use("/api/", parentRoute);

app.use("/api/", subRoute);
app.use("/api/", questionRoute);
app.use("/api/", examRoute);

app.use("/api/", offlineRoute);

app.use("/api/", psyRoute);

// app.use("/api/", commonRoute(s3));
const PORT = process.env.PORT || 5000;
app.listen(PORT, console.log(`Server running on port ${PORT}`));
