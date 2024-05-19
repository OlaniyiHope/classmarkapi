import express from "express";
import { getExam, submitExam, deleteExam } from "../controller/OfflineExam.js";

const router = express.Router();

router.get("/getofflineexam", getExam);

export default router;
