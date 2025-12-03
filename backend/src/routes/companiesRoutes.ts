import { Router } from "express";
import {
  list,
  create,
  getContactsByCompany,
  updateCompany,
  deleteCompany,
} from "../controllers/companiesController.js";

const router = Router();

// GET /api/companies → list with contact counts
router.get("/", list);

// POST /api/companies → create new company
router.post("/", create);

router.get("/by-company/:companyId", getContactsByCompany);

router.put("/:id", updateCompany);

router.delete("/:id", deleteCompany);

export default router;
