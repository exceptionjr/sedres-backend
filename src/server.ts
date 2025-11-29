import express, { urlencoded } from "express";
import helmet from "helmet";
import cors from "cors";
import { mainRouter } from "./routers/main";
import "dotenv/config";

const server = express();
server.use(helmet());

const corsOptions = {
    origin: "*",
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"]
};
server.use(cors(corsOptions));

server.use(urlencoded({ extended: true }));
server.use(express.json());

server.get("/health", (req, res) => {
    res.status(200).json({ status: "ok", timestamp: new Date().toISOString() });
});

server.use(mainRouter);

server.use((req, res) => {
    res.status(404).json({ error: "Not Found", message: `Route ${req.method} ${req.path} not found` });
});

const port = process.env.PORT || 3000;
const host = process.env.HOST || "0.0.0.0";

server.listen(Number(port), host, () => {
    console.log(`Server is running on ${host}:${port}`);
    console.log(`Environment: ${process.env.NODE_ENV || "development"}`);
});