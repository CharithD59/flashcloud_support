import type { Request, Response } from "express";
import {
  sendEmail,
  replyToEmail,
  forwardEmail,
} from "../services/emailService";
import { getTickets, getTicketById } from "../models/ticketsModel";
//import { fetchIncomingEmails } from "../services/emailReceiver";
import { fetchOneUnreadEmail } from "../services/emailReceiver";

export async function list(req: Request, res: Response) {
  try {
    const page = Number(req.query.page ?? 1);
    const pageSize = Number(req.query.pageSize ?? 6);
    const search = (req.query.search as string) ?? "";

    const data = await getTickets(
      Number.isFinite(page) && page > 0 ? page : 1,
      Number.isFinite(pageSize) && pageSize > 0 ? pageSize : 6,
      search
    );

    res.json(data);
  } catch (err) {
    console.error("Error fetching tickets:", err);
    res.status(500).json({ error: "Failed to fetch tickets" });
  }
}

export async function sendTicketEmail(req: Request, res: Response) {
  try {
    const { id } = req.params;
    const { subject, message } = req.body;

    const ticket = await getTicketById(Number(id));
    if (!ticket) return res.status(404).json({ error: "Ticket not found" });

    if (!ticket.email)
      return res.status(400).json({ error: "Ticket has no associated email" });

    await sendEmail(ticket.email, subject, message);

    res.status(200).json({ message: "Email sent successfully" });
  } catch (err) {
    console.error("Error sending email:", err);
    res.status(500).json({ error: "Failed to send email" });
  }
}

//Get all emails in the inbox

/*export async function getReceivedEmails(req: Request, res: Response) {
  try {
    const emails = await fetchIncomingEmails();
    res.status(200).json(emails);
  } catch (err) {
    console.error("Error fetching incoming emails:", err);
    res.status(500).json({ error: "Failed to fetch incoming emails" });
  }
}*/

//Get one unread email in the inbox
export async function getReceivedEmail(req: Request, res: Response) {
  try {
    const email = await fetchOneUnreadEmail();

    if (!email) {
      return res.status(404).json({ message: "No unread emails found" });
    }

    res.status(200).json(email);
  } catch (err) {
    console.error("Error fetching incoming email:", err);
    res.status(500).json({ error: "Failed to fetch incoming email" });
  }
}

// Replying to an existing email

export async function replyEmail(req: Request, res: Response) {
  try {
    const { to, subject, replyMessage, inReplyToId } = req.body;
    const info = await replyToEmail(to, subject, replyMessage, inReplyToId);
    res.status(200).json({ message: "Reply sent successfully", info });
  } catch (err) {
    console.error("Error replying to email:", err);
    res.status(500).json({ error: "Failed to reply to email" });
  }
}

// Forwarding an existing email

export async function forwardEmailController(req: Request, res: Response) {
  try {
    const { to, subject, originalBody, forwardMessage } = req.body;
    const info = await forwardEmail(to, subject, originalBody, forwardMessage);
    res.status(200).json({ message: "Email forwarded successfully", info });
  } catch (err) {
    console.error("Error forwarding email:", err);
    res.status(500).json({ error: "Failed to forward email" });
  }
}
