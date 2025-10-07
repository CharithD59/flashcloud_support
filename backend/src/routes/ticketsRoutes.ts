import { Router } from "express";
import { list } from "../controllers/ticketsController.js";

const router = Router();

router.get("/ticket", list);

export default router;
