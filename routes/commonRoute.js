// authRoutes.js
import express from "express";
import {
  login,
  register,
  getUserByRole,
  getStudentsByClass,
  getStudentById,
  getAdmin,
  deleteUser,
  createSetting,
  getSetting,
  createAccount,
  getAccountSetting,
  updateStudentById,
  updateTeacherById,
  getTeacherById,
} from "../controller/authController.js";
import multer from "multer";
import AWS from "aws-sdk";
import multerS3 from "multer-s3";

import authenticateUser from "../middleware/authMiddleware.js";
import path from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";
import fs from "fs";
const router = express.Router();

const s3 = new AWS.S3();

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const uploadDir = path.join(__dirname, "..", "uploads");

// Create the 'uploads' directory if it doesn't exist
fs.mkdirSync(uploadDir, { recursive: true });

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});
const upload = multer({
  storage: multerS3({
    s3: s3,
    bucket: "edupros",
    acl: "public-read", // Set the appropriate ACL
    contentType: multerS3.AUTO_CONTENT_TYPE,
    key: function (req, file, cb) {
      cb(null, `${Date.now()}-${file.originalname}`);
    },
  }),
});
router.post("/register", register);
router.post("/login", login);
router.get("/users/:role", getUserByRole);
router.get("/students/:id", authenticateUser, getStudentById);
router.get("/teachers/:id", authenticateUser, getTeacherById);

router.get("/student/:className", getStudentsByClass); // New route for getting students by class
router.get("/get-admin", authenticateUser, getAdmin);
router.put("/students/:id", authenticateUser, updateStudentById);
router.put("/teachers/:id", authenticateUser, updateTeacherById);

router.delete("/users/:userId", deleteUser);
// router.post("/setting", createSetting);

// const upload = multer({ storage });
router.post("/setting", upload.single("signature"), createSetting);
router.post("/account-setting", upload.single("schoolLogo"), createAccount);

router.get("/setting", getSetting);
router.get("/account-setting", getAccountSetting);

export default router;
