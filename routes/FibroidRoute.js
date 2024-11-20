// routes/fibroidRoutes.js
import express from "express";

import {
  getFibroid,
  createFibroid,
  updateFibroid,
} from "../controller/FibroidController.js";

const router = express.Router();

// Route to get the fibroid description
router.get("/get-fibroid", getFibroid);

// Route to create a new fibroid description
router.post("/create-fibroid", createFibroid);

// Route to update the fibroid description
router.put("/put-fibroid", updateFibroid);

export default router;
