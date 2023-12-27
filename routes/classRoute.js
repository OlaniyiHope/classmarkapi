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
router.post("/class", authenticateUser, createClass);
router.delete("/class/:id", authenticateUser, deleteClass);

router.get("/class", authenticateUser, getClass);
router.get("/class/:id", getsingleClass);

export default router;
