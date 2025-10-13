import type { Request, Response } from "express";
import { getTickets } from "../models/ticketsModel";

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
