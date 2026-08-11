import cors from "cors";
import dotenv from "dotenv";
import express from "express";

import mediaRoutes from "./routes/mediaRoutes.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;

app.use(
  cors({
    origin: "http://localhost:3000",
  }),
);

app.use(express.json());

app.use("/api/media", mediaRoutes);

app.get("/health", (_req, res) => {
  res.status(200).json({
    status: "ok",
    service: "media-downloader-api",
  });
});

app.listen(PORT, () => {
  console.log(`API running on http://localhost:${PORT}`);
});