import fs from "node:fs/promises";
import path from "node:path";

import { AppError } from "../../errors/AppError.js";
import { logger } from "../../logger/logger.js";
import {
    emitDownloadCompleted,
    emitDownloadFailed,
    emitDownloadProgress,
    emitDownloadStarted,
} from "../../socket/emitters.js";
import { spawnYtDlp } from "../../utils/process.js";
import { parseProgress } from "./progress.js";

const TEMP_DIR = path.resolve("temp");

export async function downloadVideo(
    id: string,
    url: string,
    quality: number,
    platform: "youtube" | "instagram" | "tiktok"
): Promise<string> {
    await fs.mkdir(TEMP_DIR, { recursive: true });

    const filePath = path.join(TEMP_DIR, `${id}.mp4`);

    emitDownloadStarted();

    const args =
        platform === "youtube"
            ? [
                  "--no-playlist",
                  "-f",
                  `bestvideo[height<=${quality}]+bestaudio/best[height<=${quality}]`,
                  "--merge-output-format",
                  "mp4",
                  "-o",
                  filePath,
                  url,
              ]
            : [
                  "--no-playlist",
                  "-f",
                  `best[height<=${quality}]/best`,
                  "-o",
                  filePath,
                  url,
              ];

    await new Promise<void>((resolve, reject) => {
        const process = spawnYtDlp(args);

        process.stderr.on("data", (chunk) => {
            const text = chunk.toString();

            logger.info(text.trim());

            const progress = parseProgress(text);

            if (progress !== null) {
                emitDownloadProgress(progress, "Downloading");
            }
        });

        process.on("close", (code) => {
            if (code === 0) {
                emitDownloadCompleted();
                resolve();
                return;
            }

            emitDownloadFailed(`Process exited with code ${code}`);

            reject(
                new AppError(
                    500,
                    `Process exited with code ${code}.`
                )
            );
        });

        process.on("error", (error) => {
            emitDownloadFailed(error.message);
            reject(error);
        });
    });

    return filePath;
}