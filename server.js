// following is the es modules declaration style in nodejs
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
import dotenv from "dotenv";
import path from "path";
import connectDB from "./config/db2.js";
import cors from "cors";
dotenv.config();
const app = express();
connectDB();

app.use(express.json());
app.use(cors());
// app.use((err, req, res, next) => {
//   console.error(err.stack);
//   res.status(500).send("Something broke!");
// });

const uploadDir = path.join(
  path.dirname(new URL(import.meta.url).pathname),
  "uploads"
);

app.use("/uploads", express.static(uploadDir));
app.use("/api/ad", adRoutes);

app.use("/api/", classRoute);
app.use("/api/", examlistRoute);
app.use("/api/", commonRoute);
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

const PORT = process.env.PORT || 5000;
app.listen(PORT, console.log(`Server running on port ${PORT}`));
