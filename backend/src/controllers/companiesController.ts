import type { Request, Response } from "express";
import { listCompanies, createCompany } from "../models/companiesModel.js";

export async function list(req: Request, res: Response) {
  try {
    const items = await listCompanies();
    res.json(items);
  } catch (err) {
    console.error("Error fetching companies:", err);
    res.status(500).json({ error: "Failed to fetch companies" });
  }
}

export async function create(req: Request, res: Response) {
  try {
    const { companyName, name, phone, email, address } = req.body;

    // Support either 'name' or 'companyName' in body
    const finalName = name ?? companyName;

    if (!finalName || String(finalName).trim().length === 0) {
      return res.status(400).json({ error: "Company name is required" });
    }

    const companyInput: {
      name: string;
      phone?: string;
      email?: string;
      address?: string;
    } = {
      name: String(finalName).trim(),
    };
    if (phone) companyInput.phone = String(phone);
    if (email) companyInput.email = String(email);
    if (address) companyInput.address = String(address);

    const created = await createCompany(companyInput);

    res.status(201).json(created);
  } catch (err: any) {
    console.error("Error creating company:", err?.message || err);
    // Duplicate name error
    if (err?.code === "ER_DUP_ENTRY") {
      return res.status(409).json({ error: "Company name already exists" });
    }
    res.status(500).json({ error: "Failed to create company" });
  }
}
