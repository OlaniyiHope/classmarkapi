// following is the es modules declaration style in nodejs
import express from "express";
import adRoutes from "./routes/adRoutes.js";
import classRoute from "./routes/classRoute.js";
import examlistRoute from "./routes/examlistRoute.js";
import gradeRoute from "./routes/gradeRoute.js";
import stuRoute from "./routes/stuRoute.js";
import teRoute from "./routes/teRoute.js";
import commonRoute from "./routes/commonRoute.js";
import questionRoute from "./routes/questionRoute.js";
import examRoute from "./routes/examRoute.js";
import subRoute from "./routes/subRoute.js";
import markRoute from "./routes/markRoute.js";
import dotenv from "dotenv";
import connectDB from "./config/db2.js";
import cors from "cors";
dotenv.config();
const app = express();
connectDB();

app.use(express.json());
app.use(cors());
app.use("/api/ad", adRoutes);

app.use("/api/class", classRoute);
app.use("/api/", examlistRoute);
app.use("/api/", commonRoute);
app.use("/api/grade", gradeRoute);
app.use("/api/mark", markRoute);
app.use("/api/", stuRoute);
app.use("/api/", teRoute);
app.use("/api/", subRoute);
app.use("/api/", questionRoute);
app.use("/api/", examRoute);

const PORT = process.env.PORT || 3003;
app.listen(PORT, console.log(`Server running on port ${PORT}`));
