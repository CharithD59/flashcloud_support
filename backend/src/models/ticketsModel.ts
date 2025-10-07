import { pool } from "../config/db.js";
import type { RowDataPacket } from "mysql2/promise";

export type Ticket = {
  id: number;
  subject: string;
  status: string;
  author: string;
  company: string;
  priority: string;
  assignee: string;
  state: string;
  daysAgo: number;
  overdueBy: number;
  initial: string;
};

export type PaginatedTickets = {
  items: Ticket[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
};

export async function getTickets(
  page = 1,
  pageSize = 6
): Promise<PaginatedTickets> {
  const limit = pageSize;
  const offset = (page - 1) * pageSize;

  // Total count
  const [countRows] = await pool.query<RowDataPacket[]>(
    `SELECT COUNT(*) AS total FROM tickets`
  );
  const total = Number((countRows[0] as any)?.total ?? 0);

  // Items (compute fields to match your frontend)
  const [rows] = await pool.query<RowDataPacket[]>(
    `
    SELECT
      id,
      subject,
      status,
      author,
      company,
      priority,
      assignee,
      state,
      -- days since created
      GREATEST(TIMESTAMPDIFF(DAY, created_at, NOW()), 0) AS daysAgo,
      -- overdue days (0 if not overdue yet)
      GREATEST(TIMESTAMPDIFF(DAY, due_at, NOW()), 0) AS overdueBy,
      -- initial from author's first non-empty char
      UPPER(LEFT(TRIM(author), 1)) AS initial
    FROM tickets
    ORDER BY id DESC
    LIMIT ? OFFSET ?;
    `,
    [limit, offset]
  );

  const items = rows as unknown as Ticket[];
  return {
    items,
    total,
    page,
    pageSize,
    totalPages: Math.max(1, Math.ceil(total / pageSize)),
  };
}
