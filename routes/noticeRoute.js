// authRoutes.js
import express from "express";

import {
  createNotice,
  deleteNotice,
  getNotice,
  getallNotice,
} from "../controller/noticeController.js";
import authenticateUser from "../middleware/authMiddleware.js";
const router = express.Router();

router.post("/create-notice", createNotice);
router.get("/get-notice/:role", getNotice);
router.get("/get-all-notices", getallNotice);
router.delete("/delete-notice/:id", deleteNotice);

export default router;
