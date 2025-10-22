import imaps from "imap-simple";
import { simpleParser } from "mailparser";
import dotenv from "dotenv";

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
    //socketTimeout: 10000,
    //connTimeout: 10000,
  },
};

/*export async function fetchIncomingEmails() {
  try {
    const connection = await imaps.connect(config);
    await connection.openBox("INBOX");

    const searchCriteria = ["UNSEEN"];
    const fetchOptions = { bodies: ["HEADER", "TEXT"], markSeen: true };

    const messages = await connection.search(searchCriteria, fetchOptions);

    const emails = await Promise.all(
      messages.map(async (msg: any) => {
        const all = msg.parts.find((part: any) => part.which === "TEXT");
        const parsed = await simpleParser(all?.body);
        return {
          from: parsed.from?.text,
          subject: parsed.subject,
          text: parsed.text,
        };
      })
    );

    await connection.end();
    return emails;
  } catch (err) {
    console.error("Error fetching emails:", err);
    return [];
  }
}*/

/*export async function fetchOneUnreadEmail() {
  const connection = await imaps.connect(config);
  await connection.openBox("INBOX");

  const searchCriteria = ["UNSEEN"];
  const fetchOptions = { bodies: ["HEADER", "TEXT"], markSeen: true };

  const messages = await connection.search(searchCriteria, fetchOptions);

  if (messages.length === 0) {
    await connection.end();
    return null; // no unread emails
  }

  const msg = messages[0];
  const all = msg.parts.find((part: any) => part.which === "TEXT");
  const parsed = await simpleParser(all?.body);

  await connection.end();

  return {
    from: parsed.from?.text,
    subject: parsed.subject,
    text: parsed.text,
  };
}*/

export async function fetchOneUnreadEmail() {
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

    return {
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
  } catch (err) {
    console.error(" Error fetching one unread email:", err);
    return null;
  }
}
