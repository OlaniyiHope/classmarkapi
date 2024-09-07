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
  updateAdmin,
  getAdminById,
  getParent,
  getParentById,
  updateParent,
  addSessionToUsersWithoutSession,
} from "../controller/authController.js";
// commonRoute.js

import multer from "multer";
import multerS3 from "multer-s3";

import authenticateUser from "../middleware/authMiddleware.js";
import path from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";
import fs from "fs";
import {
  createDownload,
  getDownload,
} from "../controller/downloadController.js";
import {
  createBook,
  getBook,
  getBookById,
} from "../controller/bookController.js";
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

  // const uploadDir = path.join(__dirname, "..", "uploads");

  // fs.mkdirSync(uploadDir, { recursive: true });

  // const uploadDir = process.env.UPLOADS_DIR || "/var/task/uploads";
  // fs.mkdirSync(uploadDir, { recursive: true });

  // const storage = multer.diskStorage({
  //   destination: (req, file, cb) => {
  //     cb(null, uploadDir);
  //   },
  //   filename: (req, file, cb) => {
  //     cb(null, `${Date.now()}-${file.originalname}`);
  //   },
  // });

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
  // router.post(
  //   "/book",
  //   upload.fields([{ name: "bookFile" }, { name: "imgUrl" }]),
  //   (req, res) => {
  //     createBook(req, res, s3);
  //   }
  // );
  router.post("/register", register);
  router.post("/login", login);
  router.get("/users/:role/:sessionId", getUserByRole);
  router.post(
    "/addSessionToUsersWithoutSession",
    addSessionToUsersWithoutSession
  );

  router.get("/students/:id", authenticateUser, getStudentById);
  router.get("/teachers/:id", authenticateUser, getTeacherById);
  router.get("/get-admin/:id", authenticateUser, getAdminById);
  router.get("/get-parent/:id", authenticateUser, getParentById);
  // router.get("/get-admin", authenticateUser, getAdmin);

  router.get("/get-session-admin/:sessionId", getAdmin);

  router.get("/get-parent", authenticateUser, getParent);
  router.put("/admin/:id", authenticateUser, updateAdmin);
  router.put("/parent/:id", authenticateUser, updateParent);
  router.put("/students/:id", authenticateUser, updateStudentById);
  router.put("/teachers/:id", authenticateUser, updateTeacherById);
  router.delete("/users/:userId", deleteUser);

  router.post("/setting", upload.single("signature"), createSetting);

  router.post("/account-setting", multer().single("schoolLogo"), (req, res) => {
    createAccount(req, res, s3);
  });
  router.post("/download", multer().single("Downloads"), (req, res) => {
    createDownload(req, res, s3);
  });
  // router.post("/book", multer().single("Download"), (req, res) => {
  //   createBook(req, res, s3);
  // });

  router.post(
    "/book",
    multer().fields([{ name: "Download" }, { name: "imageUrl" }]),
    (req, res) => {
      createBook(req, res, s3);
    }
  );

  router.get("/setting", getSetting);
  router.get("/download", getDownload);
  router.get("/book", getBook);
  router.get("/book/:id", getBookById);

  router.get("/account-setting", getAccountSetting);

  return router;
};

export default commonRoute;
