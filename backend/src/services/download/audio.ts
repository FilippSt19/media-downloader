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

export async function downloadAudio(
    id: string,
    url: string,
    quality: number
): Promise<string> {
    await fs.mkdir(TEMP_DIR, { recursive: true });

    const outputTemplate = path.join(TEMP_DIR, `${id}.%(ext)s`);

    emitDownloadStarted();

    await new Promise<void>((resolve, reject) => {
        const process = spawnYtDlp([
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

            emitDownloadFailed("Download failed");
            reject(
                new AppError(
                    500,
                    `Download failed (exit code ${code}).`
                )
            );
        });

        process.on("error", (error) => {
            emitDownloadFailed(error.message);
            reject(error);
        });
    });

    return path.join(TEMP_DIR, `${id}.mp3`);
}