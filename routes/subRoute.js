import express from "express";
import {
  createSubject,
  deleteSubject,
  // deleteSubject,
  getallSubject,
  getStudentSubjects,
  getSubjectsByClass,
} from "../controller/subController.js";
import authenticateUser from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/create-subject", authenticateUser, createSubject);

router.get("/get-subject", authenticateUser, getallSubject);
router.delete("/delete-subject/:subjectId", deleteSubject);

router.get("/get-subject/:classname", getSubjectsByClass); // Define a route with a parameter
router.get("/get-student-subjects", authenticateUser, getStudentSubjects);

export default router;
