import { pool } from "../config/db.js";
import type { RowDataPacket, ResultSetHeader } from "mysql2/promise";

export type Company = {
  id: number;
  name: string;
  phone: string | null;
  email: string | null;
  address: string | null;
  contacts: number; // computed
  createdAt: string; // from created_at
};

export type NewCompanyInput = {
  name: string;
  phone?: string;
  email?: string;
  address?: string;
};

export async function listCompanies(): Promise<Company[]> {
  // Contacts are counted by matching contacts.company (string) against companies.name
  const sql = `
    SELECT
      c.id,
      c.name,
      c.phone,
      c.email,
      c.address,
      DATE_FORMAT(c.created_at, '%Y-%m-%d %H:%i:%s') AS createdAt,
      COUNT(ct.id) AS contacts
    FROM companies c
    LEFT JOIN contacts ct
      ON ct.company = c.name
    GROUP BY c.id;
  `;
  const [rows] = await pool.query<RowDataPacket[]>(sql);
  return rows.map((r) => ({
    id: Number(r.id),
    name: String(r.name),
    phone: r.phone ? String(r.phone) : null,
    email: r.email ? String(r.email) : null,
    address: r.address ? String(r.address) : null,
    contacts: Number(r.contacts ?? 0),
    createdAt: String(r.createdAt),
  }));
}

export async function createCompany(input: NewCompanyInput): Promise<Company> {
  // Basic insert
  const [result] = await pool.query<ResultSetHeader>(
    `INSERT INTO companies (name, phone, email, address)
     VALUES (?, ?, ?, ?)`,
    [
      input.name,
      input.phone ?? null,
      input.email ?? null,
      input.address ?? null,
    ]
  );

  const insertedId = result.insertId;

  // Return the created row with computed contacts (0)
  const [rows] = await pool.query<RowDataPacket[]>(
    `SELECT
       c.id, c.name, c.phone, c.email, c.address, c.created_at AS createdAt
     FROM companies c
     WHERE c.id = ?`,
    [insertedId]
  );

  const row = rows[0];
  if (!row) {
    throw new Error("Failed to retrieve inserted company row.");
  }
  return {
    id: Number(row.id),
    name: String(row.name),
    phone: row.phone ? String(row.phone) : null,
    email: row.email ? String(row.email) : null,
    address: row.address ? String(row.address) : null,
    contacts: 0,
    createdAt: String(row.createdAt),
  };
}
