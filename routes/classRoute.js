import express from "express";
import {
  createClass,
  deleteClass,
  getClass,
  getsingleClass,
} from "../controller/classController.js";
import authenticateUser from "../middleware/authMiddleware.js";

const router = express.Router();

//CREATE
router.post("/class", createClass);
router.delete("/class/:id", deleteClass);

router.get("/class", getClass);
router.get("/class/:id", getsingleClass);

export default router;
