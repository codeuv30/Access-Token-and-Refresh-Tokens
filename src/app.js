import "dotenv/config";
import express from "express";
import dns from "dns";
import cookieParser from "cookie-parser";
import authRouter from "./routes/auth.routes.js";

dns.setServers(["1.1.1.1", "8.8.8.8"]);

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use("/auth", authRouter);

export default app;