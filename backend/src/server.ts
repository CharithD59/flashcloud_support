import dotenv from "dotenv";
import app from "./app";
import { pool } from "./config/db";
import type { Server } from "http";
import { fetchAndSaveLatestEmails } from "./services/emailReceiver";

dotenv.config();

const PORT = Number(process.env.PORT || 5000);
const NODE_ENV = process.env.NODE_ENV || "development";

let server: Server;

(async function bootstrap() {
  try {
    await pool.query("SELECT 1");
    console.log("MySQL connection OK");

    try {
      await fetchAndSaveLatestEmails();
      console.log("Initial email sync completed");
    } catch (err) {
      console.error("Initial email sync failed:", err);
    }

    setInterval(async () => {
      try {
        await fetchAndSaveLatestEmails();
        console.log("Email sync completed");
      } catch (err) {
        console.error("Email sync failed:", err);
      }
    }, 60000);

    server = app.listen(PORT, () => {
      console.log(`${NODE_ENV} server listening on http://localhost:${PORT}`);
    });
  } catch (err) {
    console.error("Unable to connect to MySQL on startup:", err);
  }
})();
