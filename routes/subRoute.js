import express from "express";
import {
  createSubject,
  deleteSubject,
  // deleteSubject,
  getallSubject,
  getStudentSubjects,
  getSubjectsByClass,
  updateSubject,
} from "../controller/subController.js";
import authenticateUser from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/create-subject", authenticateUser, createSubject);

router.get("/get-subject", authenticateUser, getallSubject);

router.get("/get-subject/:classname", getSubjectsByClass); // Define a route with a parameter
router.get("/get-student-subjects", authenticateUser, getStudentSubjects);
router.put("/update-subject/:subjectId", updateSubject);

router.delete("/delete-subject/:subjectId", deleteSubject);
export default router;
