import express from "express";
import {
  deleteGrade,
  getGrade,
  getsingleGrade,
  createGrade,
} from "../controller/gradeController.js";

const router = express.Router();

//CREATE
router.post("/", createGrade);
router.delete("/:id", deleteGrade);

router.get("/", getGrade);
router.get("/find/:id", getsingleGrade);

export default router;
