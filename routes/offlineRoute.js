import express from "express";
import { getExam, submitExam } from "../controller/OfflineExam.js";

const router = express.Router();

//CREATE
router.post("/offlineexam", submitExam);
router.get("/getofflineexam", getExam);

export default router;
