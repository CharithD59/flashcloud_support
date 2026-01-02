import express from "express";
import path from "path";
import fs from "fs";

const router = express.Router();

router.get("/download/:filename", (req, res) => {
  const filename = req.params.filename;

  const fullPath = path.resolve("uploads", filename);

  if (!fs.existsSync(fullPath)) {
    return res.status(404).json({ error: "File not found" });
  }

  res.download(fullPath);
});

export default router;
