import mysql from "mysql2/promise";
import dotenv from "dotenv";
dotenv.config();

function requireEnv(name: string): string {
  const valuue = process.env[name];
  if (!valuue) throw new Error(`Missing required env var: ${name}`);
  return valuue;
}

const DB_HOST = requireEnv("DB_HOST");
const DB_USER = requireEnv("DB_USER");
const DB_PASS = requireEnv("DB_PASS");
const DB_NAME = requireEnv("DB_NAME");
const DB_PORT = Number(process.env.DB_PORT ?? "3306");

export const pool = mysql.createPool({
  host: DB_HOST,
  user: DB_USER,
  password: DB_PASS,
  database: DB_NAME,
  port: DB_PORT,
  waitForConnections: true,
  connectionLimit: 10,
});
