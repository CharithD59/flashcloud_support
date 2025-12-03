import { Router } from "express";
import {
  list,
  create,
  edit,
  remove,
} from "../controllers/contactController.js";
import multer from "multer";
import path from "node:path";
import fs from "node:fs";

const router = Router();

const uploadsDir = path.resolve("uploads");
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

const storage = multer.diskStorage({
  destination: (_req, _file, cb) => cb(null, uploadsDir),
  filename: (_req, file, cb) => {
    const ext = path.extname(file.originalname);
    const name = path.basename(file.originalname, ext).replace(/\s+/g, "_");
    cb(null, `${name}-${Date.now()}${ext}`);
  },
});

const upload = multer({ storage });

router.get("/", list);

router.post("/", upload.single("profileImage"), create);

router.put("/:id", upload.single("profileImage"), edit);

router.delete("/:id", remove);

export default router;
