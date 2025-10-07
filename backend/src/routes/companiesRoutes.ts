import { Router } from "express";
import { list, create } from "../controllers/companiesController.js";

const router = Router();

// GET /api/companies → list with contact counts
router.get("/", list);

// POST /api/companies → create new company
router.post("/", create);

export default router;
