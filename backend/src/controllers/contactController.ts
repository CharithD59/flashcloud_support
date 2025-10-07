import type { Request, Response } from "express";
import { getContacts, createContact } from "../models/contactModel.js";

export async function list(req: Request, res: Response) {
  try {
    const page = Number(req.query.page ?? 1);
    const pageSize = Number(req.query.pageSize ?? 100);

    const data = await getContacts(
      Number.isFinite(page) && page > 0 ? page : 1,
      Number.isFinite(pageSize) && pageSize > 0 ? pageSize : 100
    );

    res.json(data);
  } catch (err) {
    console.error("Error fetching contacts:", err);
    res.status(500).json({ error: "Failed to fetch contacts" });
  }
}

export async function create(req: Request, res: Response) {
  try {
    const { firstName, lastName, phone, email, company } = req.body;

    if (!firstName || !lastName || !email) {
      return res
        .status(400)
        .json({ error: "firstName, lastName, and email are required" });
    }

    // If multer processed an image
    let profileImage: string | null = null;
    if (req.file) {
      profileImage = `/uploads/${req.file.filename}`;
    }

    const created = await createContact({
      firstName,
      lastName,
      phone: phone || null,
      email,
      company: company || null,
      profileImage,
    });

    res.status(201).json(created);
  } catch (err: any) {
    if (err?.code === "ER_DUP_ENTRY") {
      return res.status(409).json({ error: "Email already exists" });
    }
    console.error("Error creating contact:", err);
    res.status(500).json({ error: "Failed to create contact" });
  }
}
