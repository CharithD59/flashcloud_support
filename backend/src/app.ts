import express from "express";
import cors from "cors";
import path from "path";
//import dashboardRoutes from "./routes/dashboardRoutes";
//import ticketsRoutes from "./routes/ticketsRoutes";
//import contactRoutes from "./routes/contactRoutes";
//import companiesRoutes from "./routes/companiesRoutes";

const app = express();

app.use(
  cors({
    origin: process.env.FRONTEND_ORIGIN ?? "http://localhost:5173",
    credentials: true,
  })
);

app.use(express.json());

// serve /uploads statically
/*app.use(
  "/uploads",
  express.static(path.resolve("uploads"), {
    maxAge: "7d",
    extensions: ["jpg", "jpeg", "png", "gif", "webp"],
  })
);*/

//app.use("/api/dashboard", dashboardRoutes);
//app.use("/api/tickets", ticketsRoutes);
//app.use("/api/contacts", contactRoutes);
//app.use("/api/companies", companiesRoutes);

export default app;
