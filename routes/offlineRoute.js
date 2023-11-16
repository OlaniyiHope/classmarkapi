import express from "express";
import { getExam, submitExam } from "../controller/OfflineExam.js";
import { getMark, saveMark } from "../controller/offMarkController.js";

const router = express.Router();

//CREATE
router.post("/offlineexam", submitExam);
router.get("/getofflineexam", getExam);
router.post("/save-marks", saveMark);
// Add the new route for getting scores
router.get("/get-scores/:examId", getMark);

export default router;
