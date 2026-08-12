import { spawn } from "node:child_process";
import { randomUUID } from "node:crypto";
import fs from "node:fs/promises";
import path from "node:path";
import { getSocket } from "../socket.js";
import { ENV } from "../config/environment.js";

export type DownloadType = "video" | "audio";

function parseProgress(line: string): number | null {
  const match = line.match(/\[download\]\s+(\d+(?:\.\d+)?)%/);

  if (!match) return null;

  return Math.floor(Number(match[1]));
}

type DownloadOptions = {
  url: string;
  type: DownloadType;
  quality: number;
  title?: string;
};

export type DownloadResult = {
  filePath: string;
  fileName: string;
};

const TEMP_DIR = path.resolve("temp");

function sanitizeFileName(value: string): string {
  return value
    .replace(/[<>:"/\\|?*\x00-\x1F]/g, "")
    .replace(/\s+/g, " ")
    .trim()
    .slice(0, 150);
}

export async function downloadMedia({
  url,
  type,
  quality,
  title,
}: DownloadOptions): Promise<DownloadResult> {
  await fs.mkdir(TEMP_DIR, { recursive: true });

  const id = randomUUID();

  const safeTitle =
    sanitizeFileName(title || "media") || "media";

  if (type === "audio") {
    const outputTemplate = path.join(TEMP_DIR, `${id}.%(ext)s`);

    await new Promise<void>((resolve, reject) => {
      const io = getSocket();

      const process = spawn("yt-dlp", [
        "--no-playlist",
        "-x",
        "--audio-format",
        "mp3",
        "--audio-quality",
        `${quality}K`,
        "-o",
        outputTemplate,
        url,
      ]);

      process.stdout.on("data", (chunk) => {
        const text = chunk.toString();

        const progress = parseProgress(text);

        if (progress !== null) {
          io.emit("download-progress", {
            progress,
            status: "Downloading..."
          });
        }
      });

      process.stderr.on("data", console.error);

      process.on("close", (code) => {
        if (code === 0) {
          io.emit("download-progress", {
            progress: 100,
            status: "Finished"
          });

          resolve();
          return;
        }

        reject(new Error("Download failed"));
      });
    });

    return {
      filePath: path.join(TEMP_DIR, `${id}.mp3`),
      fileName: `${safeTitle}.mp3`,
    };
  }

  const filePath = path.join(TEMP_DIR, `${id}.mp4`);

  await new Promise<void>((resolve, reject) => {
    const proc = spawn("yt-dlp", [
      "--no-playlist",
      "-f",
      `bestvideo[height<=${quality}]+bestaudio/best[height<=${quality}]`,
      "--merge-output-format",
      "mp4",
      "-o",
      filePath,
      url,
    ]);
    proc.on("close", (code) => {
      if (code === 0) resolve();
      else reject(new Error(`Process exited with code ${code}`));
    });
    proc.on("error", reject);
  });

  return {
    filePath,
    fileName: `${safeTitle}.mp4`,
  };
}

export async function removeDownloadedFile(filePath: string) {
  await fs.rm(filePath, { force: true });
}