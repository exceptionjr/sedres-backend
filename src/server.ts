import express, { urlencoded } from "express";
import helmet from "helmet";
import cors from "cors";
import { mainRouter } from "./routers/main";
import "dotenv/config";

const app = express();
app.use(helmet());

const corsOptions = {
    origin: "*",
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"]
};
app.use(cors(corsOptions));

app.use(urlencoded({ extended: true }));
app.use(express.json());

app.get("/health", (req, res) => {
    res.status(200).json({ status: "ok", timestamp: new Date().toISOString() });
});

app.use(mainRouter);

app.use((req, res) => {
    res.status(404).json({ error: "Not Found", message: `Route ${req.method} ${req.path} not found` });
});

// For local development
if (process.env.NODE_ENV !== "production") {
    const port = process.env.PORT || 4000;
    const host = process.env.HOST || "0.0.0.0";

    app.listen(Number(port), host, () => {
        console.log(`Server is running on ${host}:${port}`);
        console.log(`Environment: ${process.env.NODE_ENV || "development"}`);
    });
}

// Export for Vercel serverless
export default app;