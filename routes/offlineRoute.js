import express from "express";
import { getExam, submitExam, deleteExam } from "../controller/OfflineExam.js";
import {
  getMark,
  getMarkbyStudent,
  getScores,
  saveMark,
  updateMark,
  updateMarks,
} from "../controller/offMarkController.js";
import authenticateUser from "../middleware/authMiddleware.js";

const router = express.Router();

//CREATE route
router.post("/offlineexam", submitExam);

router.get("/getofflineexam", getExam);
router.post("/save-marks", saveMark);
// Add the new route for getting scores
router.get("/get-scores/:examName", getMark);

router.get(
  "/get-scores-by-student/:studentId",
  authenticateUser,
  getMarkbyStudent
);

router.get("/get-all-scores/:examId/:subjectId", getScores);

router.put("/update-all-marks", updateMarks);

router.put("/update-marks/:studentId", updateMark);
router.delete("/deleteexam/:examId", deleteExam);

export default router;