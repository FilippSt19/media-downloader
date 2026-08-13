import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import helmet from "helmet";
import http from "node:http";

import { errorHandler } from "./errors/errorHandler.js";
import { logger } from "./logger/logger.js";
import mediaRoutes from "./routes/mediaRoutes.js";
import { initializeSocket } from "./socket/index.js";

dotenv.config();

const app = express();
const PORT = Number(process.env.PORT) || 4000;

app.use(
    cors({
        origin: "http://localhost:3000",
    })
);

app.use(helmet());
app.use(express.json());

app.use("/api/media", mediaRoutes);

app.get("/health", (_req, res) => {
    res.status(200).json({
        status: "ok",
        service: "media-downloader-api",
    });
});

app.use(errorHandler);

const server = http.createServer(app);

initializeSocket(server);

server.listen(PORT, () => {
    logger.info(`Server listening on port ${PORT}`);
});