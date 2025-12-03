import { Router } from "express";
import {
  fetchRoles,
  fetchRoleById,
  createNewRole,
} from "../controllers/RoleController.js";

const router = Router();

router.get("/user-role", fetchRoles);

router.get("/user-role/:id", fetchRoleById);

router.post("/user-role", createNewRole);

export default router;
