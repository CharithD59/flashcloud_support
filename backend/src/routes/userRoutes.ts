import { Router } from "express";
import { fetchAssignees } from "../controllers/userController.js";

const router = Router();

router.get("/assignees", fetchAssignees);

export default router;
