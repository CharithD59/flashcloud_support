import { Router } from "express";
import {
  list,
  sendTicketEmail,
  getReceivedEmail,
  replyEmail,
  forwardEmailController,
} from "../controllers/ticketsController";
import multer from "multer";

const upload = multer({ dest: "uploads/" });

const router = Router();

router.get("/ticket", list);

router.post("/:id/send-email", sendTicketEmail);

router.get("/emails/inbox", getReceivedEmail);

router.post("/emails/reply", upload.array("attachments"), replyEmail);

router.post(
  "/emails/forward",
  upload.array("attachments"),
  forwardEmailController
);

export default router;
