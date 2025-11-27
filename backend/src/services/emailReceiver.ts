import Imap from "imap";
import { simpleParser } from "mailparser";
import dotenv from "dotenv";
import { pool } from "../config/db";
import fs from "fs";
import path from "path";

dotenv.config();

// IMAP CONFIG
const imapConfig = {
  user: process.env.EMAIL_USER || "",
  xoauth2: process.env.EMAIL_PASS || "",
  host: "outlook.office365.com",
  port: 993,
  tls: true,
  tlsOptions: { rejectUnauthorized: false },
};

if (!imapConfig.user || !imapConfig.xoauth2) {
  throw new Error(
    "EMAIL_USER and EMAIL_PASS must be set in .env (EMAIL_PASS must be an OAuth2 Access Token)"
  );
}

// FETCH + SAVE LAST 10 EMAILS
export const fetchAndSaveLatestEmails = () => {
  return new Promise((resolve, reject) => {
    const imap = new Imap({
      user: imapConfig.user,
      password: "",
      xoauth2: Buffer.from(
        `user=${imapConfig.user}\x01auth=Bearer ${imapConfig.xoauth2}\x01\x01`
      ).toString("base64"),
      host: imapConfig.host,
      port: imapConfig.port,
      tls: true,
      tlsOptions: imapConfig.tlsOptions,
    });

    const openInbox = (cb: any) => {
      imap.openBox("INBOX", false, cb);
    };

    imap.once("ready", () => {
      openInbox(async (err: any, box: any) => {
        if (err) return reject(err);

        console.log("IMAP Connected. Total Emails:", box.messages.total);

        const startSeq = Math.max(1, box.messages.total - 9);
        const range = `${startSeq}:*`;

        const f = imap.fetch(range, {
          bodies: "",
          struct: true,
        });

        f.on("message", (msg: any) => {
          let buffer = "";

          msg.on("body", (stream: any) => {
            stream.on("data", (chunk: any) => {
              buffer += chunk.toString("utf8");
            });
          });

          msg.once("end", async () => {
            const parsed = await simpleParser(buffer);

            const formatAddr = (addr: any): string => {
              if (!addr) return "";
              if (Array.isArray(addr))
                return addr
                  .map((a: any) => a?.text || a?.address || "")
                  .join(", ");
              return addr.text || addr.address || "";
            };

            //Folder to save attachments
            const attachmentsFolder = path.join(__dirname, "../uploads/emails");
            if (!fs.existsSync(attachmentsFolder))
              fs.mkdirSync(attachmentsFolder, { recursive: true });

            const attachmentsPaths =
              parsed.attachments?.map((a: any) => {
                const filePath = path.join(attachmentsFolder, a.filename);
                fs.writeFileSync(filePath, a.content); // Save file to disk
                return {
                  filename: a.filename,
                  path: `/uploads/emails/${a.filename}`,
                };
              }) || null;

            const emailData = {
              from: formatAddr(parsed.from),
              to: formatAddr(parsed.to),
              cc: formatAddr(parsed.cc),
              subject: parsed.subject || "(No Subject)",
              body: parsed.html || parsed.text || "",
              attachments: attachmentsPaths
                ? JSON.stringify(attachmentsPaths)
                : null,
              date: parsed.date ? new Date(parsed.date) : new Date(),
            };

            try {
              // Check for duplicates based on sender + subject + date
              const [rows] = await pool.query(
                `SELECT id FROM received_emails WHERE sender = ? AND subject = ? AND date_received = ?`,
                [emailData.from, emailData.subject, emailData.date]
              );

              // If no duplicate, insert
              if ((rows as any[]).length === 0) {
                await pool.query(
                  `INSERT INTO received_emails
                    (sender, recipient, cc, subject, body, attachments, date_received, status)
                    VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
                  [
                    emailData.from,
                    emailData.to,
                    emailData.cc,
                    emailData.subject,
                    emailData.body,
                    emailData.attachments,
                    emailData.date,
                    "unread",
                  ]
                );
                console.log(`Saved email: ${emailData.subject}`);
              } else {
                console.log(`Skipped duplicate email: ${emailData.subject}`);
              }
            } catch (dbErr: any) {
              console.error("DB Error:", dbErr);
            }
          });
        });

        f.once("end", () => {
          console.log("Finished fetching emails.");
          imap.end();
          resolve(true);
        });
      });
    });

    imap.once("error", (err: any) => {
      reject("IMAP Error: " + err);
    });

    imap.connect();
  });
};
