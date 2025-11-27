import { pool } from "../config/db.js";
import type { RowDataPacket, ResultSetHeader } from "mysql2/promise";
import bcrypt from "bcryptjs";

export type User = {
  id: number;
  fname: string;
  lname: string;
  email: string;
  roleId: number;
  roleName?: string;
  status: "active" | "inactive";
  password?: string;
  createdAt: string;
  updatedAt: string;
};

//get users by email (for login)
export async function getUserByEmail(email: string): Promise<User | null> {
  const [rows] = await pool.query<RowDataPacket[]>(
    `
    SELECT u.id, u.fname, u.lname, u.email, u.role_id AS roleId, r.role_name AS roleName,
           u.password, u.status,
           DATE_FORMAT(u.created_at, '%Y-%m-%d %H:%i:%s') AS createdAt,
           DATE_FORMAT(u.updated_at, '%Y-%m-%d %H:%i:%s') AS updatedAt
    FROM tbl_user_accounts u
    LEFT JOIN user_roles r ON u.role_id = r.id
    WHERE u.email = ?
    LIMIT 1
  `,
    [email]
  );

  const row = rows[0];
  if (!row) return null;

  return {
    id: Number(row.id),
    fname: String(row.fname),
    lname: String(row.lname),
    email: String(row.email),
    roleId: Number(row.roleId),
    roleName: row.roleName ? String(row.roleName) : undefined,
    password: row.password ? String(row.password) : undefined,
    status: row.status as "active" | "inactive",
    createdAt: String(row.createdAt),
    updatedAt: String(row.updatedAt),
  };
}

// Verify password
export async function verifyPassword(
  user: User,
  password: string
): Promise<boolean> {
  if (!user.password) return false;
  return bcrypt.compare(password, user.password);
}

/*export async function verifyPassword(
  user: User,
  password: string
): Promise<boolean> {
  return user.password === password;
}*/

//create user
export async function createUser(user: {
  fname: string;
  lname: string;
  email: string;
  password: string;
  roleId: number;
  status: "active" | "inactive";
}): Promise<User> {
  const { fname, lname, email, password, roleId, status } = user;

  const hashedPassword = await bcrypt.hash(password, 10);

  const [result] = await pool.query<ResultSetHeader>(
    `
    INSERT INTO tbl_user_accounts
      (fname, lname, email, password, role_id, status, created_at, updated_at)
    VALUES (?, ?, ?, ?, ?, ?, NOW(), NOW())
  `,
    [fname, lname, email, hashedPassword, roleId, status]
  );

  const insertId = result.insertId;

  return {
    id: insertId,
    fname,
    lname,
    email,
    roleId,
    status,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
}
