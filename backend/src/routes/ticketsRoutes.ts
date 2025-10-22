import { Router } from "express";
import {
  list,
  sendTicketEmail,
  getReceivedEmail,
  replyEmail,
  forwardEmailController,
} from "../controllers/ticketsController";

const router = Router();

router.get("/ticket", list);

router.post("/:id/send-email", sendTicketEmail);

router.get("/emails/inbox", getReceivedEmail);

router.post("/emails/reply", replyEmail);

router.post("/emails/forward", forwardEmailController);

export default router;
