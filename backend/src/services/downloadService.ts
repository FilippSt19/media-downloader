import { execFile } from "node:child_process";
import { randomUUID } from "node:crypto";
import fs from "node:fs/promises";
import path from "node:path";
import { promisify } from "node:util";
import { getSocket } from "../socket.js";

const execFileAsync = promisify(execFile);

export type DownloadType = "video" | "audio";

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

    await execFileAsync(
      "yt-dlp",
      [
        "--no-playlist",
        "-x",
        "--audio-format",
        "mp3",
        "--audio-quality",
        `${quality}K`,
        "-o",
        outputTemplate,
        url,
      ],
      {
        maxBuffer: 20 * 1024 * 1024,
      }
    );

    return {
      filePath: path.join(TEMP_DIR, `${id}.mp3`),
      fileName: `${safeTitle}.mp3`,
    };
  }

  const filePath = path.join(TEMP_DIR, `${id}.mp4`);

  await execFileAsync(
    "yt-dlp",
    [
      "--no-playlist",
      "-f",
      `bestvideo[height<=${quality}]+bestaudio/best[height<=${quality}]`,
      "--merge-output-format",
      "mp4",
      "-o",
      filePath,
      url,
    ],
    {
      maxBuffer: 20 * 1024 * 1024,
    }
  );

  return {
    filePath,
    fileName: `${safeTitle}.mp4`,
  };
}

export async function removeDownloadedFile(filePath: string) {
  await fs.rm(filePath, { force: true });
}