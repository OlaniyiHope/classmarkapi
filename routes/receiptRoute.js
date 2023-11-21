import express from "express";

import {
  createReceipt,
  deleteInv,
  getAll,
  getAllReceipts,
  //   getInvoiceId,
  getReceiptsByStudentId,
  getStudentInvoiceId,
} from "../controller/receiptController.js";
import authenticateUser from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/receipt", createReceipt);

// routes/receiptRoutes.js
router.get("/receipt/:studentId", authenticateUser, getReceiptsByStudentId);

// router.get("/receipt/:id", getInvoiceId);
router.get("/receipt/student/:id", getStudentInvoiceId);
// router.get("/receipt/", getAll);
router.get("/receipt", getAllReceipts);
// Define the route with parameters
// Define the route with parameters

router.delete("/receipt/:id", deleteInv);

export default router;
