import { randomUUID } from "node:crypto";
import fs from "node:fs/promises";
import path from "node:path";

import { spawnYtDlp } from "../utils/process.js";
import { logger } from "../logger/logger.js";
import {
    emitDownloadCompleted, 
    emitDownloadFailed,
    emitDownloadProgress,
    emitDownloadStarted,
} from "../socket/emitters.js";

export type DownloadType = "video" | "audio";

function parseProgress(line: string): number | null {
    const match = line.match(/\[download\]\s+(\d+(?:\.\d+)?)%/);

    if (!match) {
        return null;
    }

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

    emitDownloadStarted();

    if (type === "audio") {
        const outputTemplate = path.join(TEMP_DIR, `${id}.%(ext)s`);

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

            process.stdout.on("data", (chunk) => {
                const progress = parseProgress(chunk.toString());

                if (progress !== null) {
                    emitDownloadProgress(progress, "Downloading");
                }
            });

            process.stderr.on("data", (chunk) => {
                logger.error(chunk.toString());
            });

            process.on("close", (code) => {
                if (code === 0) {
                    emitDownloadCompleted();
                    resolve();
                    return;
                }

                emitDownloadFailed("Download failed");
                reject(new Error("Download failed"));
            });

            process.on("error", (error) => {
                emitDownloadFailed(error.message);
                reject(error);
            });
        });

        return {
            filePath: path.join(TEMP_DIR, `${id}.mp3`),
            fileName: `${safeTitle}.mp3`,
        };
    }

    const filePath = path.join(TEMP_DIR, `${id}.mp4`);

    await new Promise<void>((resolve, reject) => {
        const process = spawnYtDlp([
            "--no-playlist",
            "-f",
            `bestvideo[height<=${quality}]+bestaudio/best[height<=${quality}]`,
            "--merge-output-format",
            "mp4",
            "-o",
            filePath,
            url,
        ]);

        process.stdout.on("data", (chunk) => {
            const progress = parseProgress(chunk.toString());

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
            reject(new Error(`Process exited with code ${code}`));
        });

        process.on("error", (error) => {
            emitDownloadFailed(error.message);
            reject(error);
        });
    });

    return {
        filePath,
        fileName: `${safeTitle}.mp4`,
    };
}

export async function removeDownloadedFile(filePath: string) {
    await fs.rm(filePath, { force: true });
}