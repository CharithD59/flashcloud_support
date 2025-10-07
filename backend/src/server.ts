import dotenv from "dotenv";
import app from "./app";
import { pool } from "./config/db";
import type { Server } from "http";

dotenv.config();

const PORT = Number(process.env.PORT || 5000);
const NODE_ENV = process.env.NODE_ENV || "development";

let server: Server;

(async function bootstrap() {
  try {
    await pool.query("SELECT 1");
    console.log("MySQL connection OK");
  } catch (err) {
    console.error("Unable to connect to MySQL on startup:", err);
  }

  server = app.listen(PORT, () => {
    console.log(`${NODE_ENV} server listening on http://localhost:${PORT}`);
  });
})();
