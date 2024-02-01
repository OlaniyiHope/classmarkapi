import express from "express";
import {
  login,
  register,
  getUserByRole,
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
// commonRoute.js

import multer from "multer";
import multerS3 from "multer-s3";
import { S3 } from "@aws-sdk/client-s3";
import authenticateUser from "../middleware/authMiddleware.js";
import path from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";
import fs from "fs";
import { createDownload } from "../controller/downloadController.js";
const router = express.Router();
const applyAuthMiddleware = (method, path, middleware) => {
  if (middleware) {
    router[method](path, middleware);
  }
};

// Modify the commonRoute function to accept the s3 instance and authentication routes
const commonRoute = (s3, authRoutes = []) => {
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = dirname(__filename);

  const uploadDir = path.join(__dirname, "..", "uploads");

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
      bucket: "edupros", // Replace with your bucket name
      acl: "public-read",
      contentType: multerS3.AUTO_CONTENT_TYPE,
      key: function (req, file, cb) {
        cb(null, `${Date.now()}-${file.originalname}`);
      },
    }),
  });

  // Apply authenticateUser only to specified routes
  authRoutes.forEach(({ method, path, middleware }) => {
    applyAuthMiddleware(method, path, middleware);
  });

  router.post("/register", register);
  router.post("/login", login);
  router.get("/users/:role", getUserByRole);
  router.get("/students/:id", authenticateUser, getStudentById);
  router.get("/teachers/:id", authenticateUser, getTeacherById);
  router.get("/get-admin", authenticateUser, getAdmin);
  router.put("/students/:id", authenticateUser, updateStudentById);
  router.put("/teachers/:id", authenticateUser, updateTeacherById);
  router.delete("/users/:userId", deleteUser);
  router.post("/setting", upload.single("signature"), createSetting);

  router.post("/account-setting", multer().single("schoolLogo"), (req, res) => {
    createAccount(req, res, s3);
  });
  router.post("/download", multer().single("Download"), (req, res) => {
    createDownload(req, res, s3);
  });

  router.get("/setting", getSetting);
  router.get("/account-setting", getAccountSetting);

  return router;
};

export default commonRoute;
