import "dotenv/config";
import express from "express";
import dns from "dns";
import cookieParser from "cookie-parser";
import authRouter from "./routes/auth.routes.js";
import homeRouter from "./routes/home.routes.js";
import cors from "cors";

dns.setServers(["1.1.1.1", "8.8.8.8"]);

const app = express();

app.use(express.json());
app.use(cookieParser());

app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}))

app.use("/auth", authRouter);
app.use("/home", homeRouter);

export default app;