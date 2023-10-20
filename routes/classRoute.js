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
router.post("/", authenticateUser, createClass);
router.delete("/:id", deleteClass);

router.get("/", getClass);
router.get("/find/:id", getsingleClass);

export default router;
