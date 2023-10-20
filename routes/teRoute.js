import express from "express";
import { getTeachers, createTeacher } from "../controller/teacherController.js";
import authenticateUser from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/create-teachers", authenticateUser, createTeacher);
router.get("/get-teachers", authenticateUser, getTeachers);

export default router;
