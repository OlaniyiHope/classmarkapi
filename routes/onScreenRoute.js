// import express from "express";
// import multer from "multer";
// import { onScreenController } from "../controller/onScreenController.js";

// const router = express.Router();
// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, "uploads/");
//   },
//   filename: (req, file, cb) => {
//     cb(null, `${Date.now()}-${file.originalname}`);
//   },
// });

// const upload = multer({ storage });

// router.post("/upload", upload.single("onScreenFile"), onScreenController);

// export default router;
import express from "express";
import multer from "multer";
import { onScreenController } from "../controller/onScreenController.js";
import path from "path";
import fs from "fs";

const router = express.Router();
const uploadDir = path.join(
  path.dirname(new URL(import.meta.url).pathname),
  "uploads"
);

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

const upload = multer({ storage });

router.post("/upload", upload.single("onScreenFile"), onScreenController);

export default router;
