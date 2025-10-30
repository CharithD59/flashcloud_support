import imaps from "imap-simple";
import { simpleParser } from "mailparser";
import dotenv from "dotenv";
import { pool } from "../config/db";

dotenv.config();

const config = {
  imap: {
    user: process.env.EMAIL_USER || "",
    password: process.env.EMAIL_PASS || "",
    host: "imap.gmail.com",
    port: 993,
    tls: true,
    authTimeout: 3000,
    tlsOptions: { rejectUnauthorized: false },
  },
};

/*export async function fetchOneUnreadEmail() {
  try {
    const connection = await imaps.connect(config);
    await connection.openBox("INBOX");

    const searchCriteria = ["UNSEEN"];
    const fetchOptions = { bodies: [""], markSeen: false };

    const messages = await connection.search(searchCriteria, fetchOptions);

    if (messages.length === 0) {
      await connection.end();
      return null; // no unread emails
    }

    const msg = messages[0];
    const all = msg.parts.find((part: any) => part.which === "");
    const parsed = await simpleParser(all?.body || "");

    await connection.end();

    const emailData = {
      from: parsed.from?.text || "",
      to: Array.isArray(parsed.to)
        ? (parsed.to as any[])
            .map((t) => t?.text || "")
            .filter(Boolean)
            .join(", ")
        : parsed.to?.text || "",
      cc: Array.isArray(parsed.cc)
        ? (parsed.cc as any[])
            .map((c) => c?.text || "")
            .filter(Boolean)
            .join(", ")
        : parsed.cc?.text || "",
      subject: parsed.subject || "(No Subject)",
      date: parsed.date || "",
      //text: parsed.text || parsed.html || "",
      html: parsed.html || parsed.textAsHtml || "",
      text: parsed.text || "",
    };

    return emailData;
  } catch (err) {
    console.error(" Error fetching one unread email:", err);
    return null;
  }
}*/

export async function fetchAndSaveUnreadEmail() {
  try {
    const connection = await imaps.connect(config);
    await connection.openBox("INBOX");

    const searchCriteria = ["UNSEEN"];
    const fetchOptions = { bodies: [""], markSeen: true };

    const messages = await connection.search(searchCriteria, fetchOptions);

    if (messages.length === 0) {
      await connection.end();
      return null;
    }

    const msg = messages[0];
    const all = msg.parts.find((part: any) => part.which === "");
    const parsed = await simpleParser(all?.body || "");

    await connection.end();

    const emailData = {
      from: parsed.from?.text || "",
      to: Array.isArray(parsed.to)
        ? parsed.to.map((t) => t.text).join(", ")
        : parsed.to?.text || "",
      cc: Array.isArray(parsed.cc)
        ? parsed.cc.map((c) => c.text).join(", ")
        : parsed.cc?.text || "",
      subject: parsed.subject || "(No Subject)",
      body: parsed.html || parsed.textAsHtml || parsed.text || "",
      attachments: parsed.attachments?.length
        ? JSON.stringify(
            parsed.attachments.map((a: any) => ({
              filename: a.filename || null,
              contentType: a.contentType || null,
              size: a.size ?? null,
            }))
          )
        : null,
      date: parsed.date ? new Date(parsed.date) : new Date(),
    };

    // Save to MySQL
    await pool.query(
      `INSERT INTO received_emails (sender, recipient, cc, subject, body, attachments, date_received, status)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,

      [
        emailData.from,
        emailData.to,
        emailData.cc,
        emailData.subject,
        emailData.body,
        emailData.attachments || null,
        emailData.date,
        "unread",
      ]
    );

    return emailData;
  } catch (err) {
    console.error("Error fetching/saving unread email:", err);
    return null;
  }
}
