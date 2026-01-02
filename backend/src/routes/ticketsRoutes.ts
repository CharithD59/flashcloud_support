import { Router } from "express";
import {
  list,
  sendTicketEmail,
  //getSavedEmails,
  getEmailsByTicket,
  replyEmail,
  forwardEmailController,
  updateTicket,
} from "../controllers/ticketsController";
import multer from "multer";

const upload = multer({ dest: "uploads/" });

const router = Router();

router.get("/ticket", list);

router.post("/:id/send-email", sendTicketEmail);

//router.get("/emails/inbox", getSavedEmails);

router.get("/:ticketId/emails", getEmailsByTicket);

router.post("/emails/reply", upload.array("attachments"), replyEmail);

router.post(
  "/emails/forward",
  upload.array("attachments"),
  forwardEmailController
);

router.put("/:id", updateTicket);

export default router;
