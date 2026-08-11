import { execFile } from "node:child_process";
import { randomUUID } from "node:crypto";
import fs from "node:fs/promises";
import path from "node:path";
import { promisify } from "node:util";

const execFileAsync = promisify(execFile);

export type DownloadType = "video" | "audio";

type DownloadOptions = {
  url: string;
  type: DownloadType;
  quality: number;
};

export type DownloadResult = {
  filePath: string;
  fileName: string;
};

const TEMP_DIR = path.resolve("temp");

export async function downloadMedia({
  url,
  type,
  quality,
}: DownloadOptions): Promise<DownloadResult> {
  await fs.mkdir(TEMP_DIR, { recursive: true });

  const id = randomUUID();

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
      fileName: `audio-${id}.mp3`,
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
    fileName: `video-${id}.mp4`,
  };
}

export async function removeDownloadedFile(filePath: string) {
  await fs.rm(filePath, { force: true });
}