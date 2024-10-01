// import express from "express";
// import {
//   login,
//   register,
//   getUserByRole,
//   getStudentById,
//   getAdmin,
//   deleteUser,
//   createSetting,
//   getSetting,
//   createAccount,
//   getAccountSetting,
//   updateStudentById,
//   updateTeacherById,
//   getTeacherById,
//   updateAdmin,
//   getAdminById,
//   updateParent,
//   addSessionToUsersWithoutSession,
//   addSessionToDownloadWithoutSession,
//   addAnotherSessionToUserWithSession,
// } from "../controller/authController.js";
// // commonRoute.js

// import multer from "multer";
// import multerS3 from "multer-s3";

// import authenticateUser from "../middleware/authMiddleware.js";
// import path from "path";
// import { fileURLToPath } from "url";
// import { dirname } from "path";
// import fs from "fs";
// import {
//   createDownload,
//   getDownload,
// } from "../controller/downloadController.js";
// import {
//   createBook,
//   getBook,
//   getBookById,
// } from "../controller/bookController.js";
// const router = express.Router();
// const applyAuthMiddleware = (method, path, middleware) => {
//   if (middleware) {
//     router[method](path, middleware);
//   }
// };

// // Modify the commonRoute function to accept the s3 instance and authentication routes
// const commonRoute = (s3, authRoutes = []) => {
//   const __filename = fileURLToPath(import.meta.url);
//   const __dirname = dirname(__filename);

//   // const uploadDir = path.join(__dirname, "..", "uploads");

//   // fs.mkdirSync(uploadDir, { recursive: true });

//   // const uploadDir = process.env.UPLOADS_DIR || "/var/task/uploads";
//   // fs.mkdirSync(uploadDir, { recursive: true });

//   // const storage = multer.diskStorage({
//   //   destination: (req, file, cb) => {
//   //     cb(null, uploadDir);
//   //   },
//   //   filename: (req, file, cb) => {
//   //     cb(null, `${Date.now()}-${file.originalname}`);
//   //   },
//   // });

//   const upload = multer({
//     storage: multerS3({
//       s3: s3,
//       bucket: "edupros", // Replace with your bucket name
//       acl: "public-read",
//       contentType: multerS3.AUTO_CONTENT_TYPE,
//       key: function (req, file, cb) {
//         cb(null, `${Date.now()}-${file.originalname}`);
//       },
//     }),
//   });

//   // Apply authenticateUser only to specified routes
//   authRoutes.forEach(({ method, path, middleware }) => {
//     applyAuthMiddleware(method, path, middleware);
//   });
//   // router.post(
//   //   "/book",
//   //   upload.fields([{ name: "bookFile" }, { name: "imgUrl" }]),
//   //   (req, res) => {
//   //     createBook(req, res, s3);
//   //   }
//   // );
//   router.post("/register", register);
//   router.post("/login", login);
//   router.get("/users/:role/:sessionId", getUserByRole);
//   router.post(
//     "/addSessionToUsersWithoutSession",
//     addSessionToUsersWithoutSession
//   );
//   router.post(
//     "/addSessionToDownloadWithoutSession",
//     addSessionToDownloadWithoutSession
//   );
//   router.post(
//     "/addAnotherSessionToUserWithSession",
//     addAnotherSessionToUserWithSession
//   );

//   router.get("/students/:id", authenticateUser, getStudentById);
//   router.get("/teachers/:id", authenticateUser, getTeacherById);
//   router.get("/get-admin/:id", authenticateUser, getAdminById);
//   // router.get("/get-parent/:id", authenticateUser, getParentById);
//   // router.get("/get-admin", authenticateUser, getAdmin);

//   router.get("/get-session-admin/:sessionId", getAdmin);

//   router.put("/admin/:id", authenticateUser, updateAdmin);
//   router.put("/parent/:id", authenticateUser, updateParent);
//   router.put("/students/:id", authenticateUser, updateStudentById);
//   router.put("/teachers/:id", authenticateUser, updateTeacherById);
//   router.delete("/users/:userId", deleteUser);

//   router.post("/setting", upload.single("signature"), createSetting);

//   router.post("/account-setting", multer().single("schoolLogo"), (req, res) => {
//     createAccount(req, res, s3);
//   });
//   router.post("/download", multer().single("Downloads"), (req, res) => {
//     createDownload(req, res, s3);
//   });
//   // router.post("/book", multer().single("Download"), (req, res) => {
//   //   createBook(req, res, s3);
//   // });

//   router.post(
//     "/book",
//     multer().fields([{ name: "Download" }, { name: "imageUrl" }]),
//     (req, res) => {
//       createBook(req, res, s3);
//     }
//   );

//   router.get("/setting", getSetting);
//   router.get("/download/:sessionId", getDownload);

//   router.get("/book", getBook);
//   router.get("/book/:id", getBookById);

//   router.get("/account-setting", getAccountSetting);

//   return router;
// };

// // export default commonRoute;
// import express from "express";
// import multer from "multer";
// import multerS3 from "multer-s3";
// import authenticateUser from "../middleware/authMiddleware.js";
// import { fileURLToPath } from "url";
// import { dirname } from "path";

// import {
//   login,
//   register,
//   getUserByRole,
//   getStudentById,
//   getAdmin,
//   deleteUser,
//   createSetting,
//   getSetting,
//   createAccount,
//   getAccountSetting,
//   updateStudentById,
//   updateTeacherById,
//   getTeacherById,
//   updateAdmin,
//   getAdminById,
//   updateParent,
//   addSessionToUsersWithoutSession,
//   addSessionToDownloadWithoutSession,
//   addAnotherSessionToUserWithSession,
//   deleteUserFromSpecificSession,
//   getStudentByIdBySession,
// } from "../controller/authController.js";
// import {
//   createDownload,
//   getDownload,
// } from "../controller/downloadController.js";
// import {
//   createBook,
//   getBook,
//   getBookById,
// } from "../controller/bookController.js";

// const router = express.Router();

// // Utility function to apply middleware
// const applyAuthMiddleware = (method, path, middleware) => {
//   if (middleware) {
//     router[method](path, middleware);
//   }
// };

// // Modify the commonRoute function to accept the S3 instance and authRoutes
// const commonRoute = (s3, authRoutes = []) => {
//   const __filename = fileURLToPath(import.meta.url);
//   const __dirname = dirname(__filename);

//   const upload = multer({
//     storage: multerS3({
//       s3: s3,
//       bucket: "edupros", // Replace with your bucket name
//       acl: "public-read",
//       contentType: multerS3.AUTO_CONTENT_TYPE,
//       key: function (req, file, cb) {
//         cb(null, `${Date.now()}-${file.originalname}`);
//       },
//     }),
//   });

//   // Apply middleware to specific routes
//   authRoutes.forEach(({ method, path, middleware }) => {
//     applyAuthMiddleware(method, path, middleware);
//   });

//   // Define your routes
//   router.post("/register", register);
//   router.post("/login", login);
//   router.get("/users/:role/:sessionId", getUserByRole);

//   router.post(
//     "/addSessionToUsersWithoutSession",
//     addSessionToUsersWithoutSession
//   );
//   router.post(
//     "/addSessionToDownloadWithoutSession",
//     addSessionToDownloadWithoutSession
//   );
//   router.post(
//     "/addAnotherSessionToUserWithSession",
//     addAnotherSessionToUserWithSession
//   );

//   router.get("/students/:id", authenticateUser, getStudentById);
//   router.get(
//     "/get-students/:id/:sessionId",
//     authenticateUser,
//     getStudentByIdBySession
//   );
//   router.get("/teachers/:id", authenticateUser, getTeacherById);
//   router.get("/get-admin/:id", authenticateUser, getAdminById);
//   router.get("/get-session-admin/:sessionId", authenticateUser, getAdmin);

//   router.put("/admin/:id", authenticateUser, updateAdmin);
//   router.put("/parent/:id", authenticateUser, updateParent);
//   router.put("/put-students/:id", authenticateUser, updateStudentById);
//   router.put("/teachers/:id", authenticateUser, updateTeacherById);
//   router.delete("/users/:userId", deleteUser);

//   router.delete(
//     "/session/:sessionId/users/:userId",
//     deleteUserFromSpecificSession
//   );

//   router.post("/setting", upload.single("signature"), createSetting);

//   // router.post("/account-setting", multer().single("schoolLogo"), (req, res) => {
//   //   createAccount(req, res, s3);
//   // });

//   router.post("/account-setting", upload.single("schoolLogo"), (req, res) => {
//     createAccount(req, res, s3);
//   });

//   router.post("/download", multer().single("Downloads"), (req, res) => {
//     createDownload(req, res, s3);
//   });

//   // router.post(
//   //   "/book",
//   //   multer().fields([{ name: "Download" }, { name: "imageUrl" }]),
//   //   (req, res) => {
//   //     createBook(req, res, s3);
//   //   }
//   // );
//   router.post(
//     "/book",
//     upload.fields([{ name: "Download" }, { name: "imageUrl" }]),
//     (req, res) => {
//       createBook(req, res, s3);
//     }
//   );

//   router.get("/setting", getSetting);
//   router.get("/download/:sessionId", getDownload);
//   router.get("/book", getBook);
//   router.get("/book/:id", getBookById);
//   router.get("/account-setting", getAccountSetting);

//   return router;
// };

// export default commonRoute;
import express from "express";
import multer from "multer";
import multerS3 from "multer-s3";
import { fileURLToPath } from "url";
import { dirname } from "path";
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
  updateParent,
  addSessionToUsersWithoutSession,
  addSessionToDownloadWithoutSession,
  addAnotherSessionToUserWithSession,
  deleteUserFromSpecificSession,
  getStudentByIdBySession,
} from "../controller/authController.js";
import {
  createDownload,
  getDownload,
} from "../controller/downloadController.js";
import {
  createBook,
  getBook,
  getBookById,
} from "../controller/bookController.js";
import authenticateUser from "../middleware/authMiddleware.js";
const router = express.Router();

// Utility function to apply middleware
const applyAuthMiddleware = (method, path, middleware) => {
  if (middleware) {
    router[method](path, middleware);
  }
};

// Modify the commonRoute function to accept the S3 instance and authRoutes
const commonRoute = (s3, authRoutes = []) => {
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = dirname(__filename);

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

  // Apply middleware to specific routes
  authRoutes.forEach(({ method, path, middleware }) => {
    applyAuthMiddleware(method, path, middleware);
  });

  // Define your routes
  router.post("/register", register);
  router.post("/login", login);
  router.get("/users/:role/:sessionId", getUserByRole);

  router.post(
    "/addSessionToUsersWithoutSession",
    addSessionToUsersWithoutSession
  );
  router.post(
    "/addSessionToDownloadWithoutSession",
    addSessionToDownloadWithoutSession
  );
  router.post(
    "/addAnotherSessionToUserWithSession",
    addAnotherSessionToUserWithSession
  );

  router.get("/students/:id", authenticateUser, getStudentById);
  router.get(
    "/get-students/:id/:sessionId",
    authenticateUser,
    getStudentByIdBySession
  );
  router.get("/teachers/:id", authenticateUser, getTeacherById);
  router.get("/get-admin/:id", authenticateUser, getAdminById);
  router.get("/get-session-admin/:sessionId", authenticateUser, getAdmin);

  router.put("/admin/:id", authenticateUser, updateAdmin);
  router.put("/parent/:id", authenticateUser, updateParent);
  router.put("/put-students/:id", authenticateUser, updateStudentById);
  router.put("/teachers/:id", authenticateUser, updateTeacherById);
  router.delete("/users/:userId", deleteUser);
  router.delete(
    "/session/:sessionId/users/:userId",
    deleteUserFromSpecificSession
  );

  // Adjust the following routes to ensure they work with your S3 setup
  router.post("/setting", upload.single("signature"), createSetting);
  router.post("/account-setting", upload.single("schoolLogo"), (req, res) => {
    createAccount(req, res, s3);
  });
  router.post("/download", multer().single("Downloads"), (req, res) => {
    createDownload(req, res, s3);
  });

  router.post(
    "/book",
    upload.fields([{ name: "Download" }, { name: "imageUrl" }]),
    (req, res) => {
      createBook(req, res, s3);
    }
  );

  router.get("/setting", getSetting);
  router.get("/download/:sessionId", getDownload);
  router.get("/book", getBook);
  router.get("/book/:id", getBookById);
  router.get("/account-setting", getAccountSetting);

  return router;
};

export default commonRoute;
