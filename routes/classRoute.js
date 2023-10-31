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
router.delete("/:id", authenticateUser, deleteClass);

router.get("/", authenticateUser, getClass);
router.get("/find/:id", authenticateUser, getsingleClass);

export default router;
