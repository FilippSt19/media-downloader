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
import { buildVideoArgs } from "../../platforms/shared/ytDlpArgs.js";
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

    const args = await buildVideoArgs(
        url,
        filePath,
        quality,
        platform
    );

    await new Promise<void>((resolve, reject) => {
        logger.info(args.join(" "));

        const process = spawnYtDlp(args);

        process.stdout.on("data", (chunk) => {
            const text = chunk.toString();
            logger.info(`[stdout] ${text.trim()}`);
        });

        process.stderr.on("data", (chunk) => {
            const text = chunk.toString();

            logger.info(text.trim());

            const progress = parseProgress(text);

            if (progress !== null) {
                emitDownloadProgress(
                    progress,
                    "Downloading"
                );
            }
        });

        process.on("close", (code) => {
            logger.info(`yt-dlp exited with code ${code}`);

            if (code === 0) {
                emitDownloadCompleted();
                resolve();
                return;
            }

            emitDownloadFailed(
                `Process exited with code ${code}`
            );

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