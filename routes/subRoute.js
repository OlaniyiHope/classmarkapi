import express from "express";
import {
  createSubject,
  // deleteSubject,
  getallSubject,
  getSubjectsByClass,
} from "../controller/subController.js";
import authenticateUser from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/create-subject", authenticateUser, createSubject);

router.get("/get-subject", authenticateUser, getallSubject);

router.get("/get-subject/:classname", authenticateUser, getSubjectsByClass); // Define a route with a parameter

export default router;
