import { Router } from "express";
import {
  list,
  sendTicketEmail,
  getReceivedEmail,
} from "../controllers/ticketsController";

const router = Router();

router.get("/ticket", list);

router.post("/:id/send-email", sendTicketEmail);

router.get("/emails/inbox", getReceivedEmail);

export default router;
