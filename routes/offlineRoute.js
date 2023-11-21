import express from "express";
import { getExam, submitExam } from "../controller/OfflineExam.js";
import {
  getMark,
  getMarkbyStudent,
  saveMark,
} from "../controller/offMarkController.js";
import authenticateUser from "../middleware/authMiddleware.js";

const router = express.Router();

//CREATE route
router.post("/offlineexam", submitExam);
router.get("/getofflineexam", getExam);
router.post("/save-marks", saveMark);
// Add the new route for getting scores
router.get("/get-scores/:examName", authenticateUser, getMark);
router.get(
  "/get-scores-by-student/:studentId",
  authenticateUser,
  getMarkbyStudent
);

export default router;
