import type { Request, Response } from "express";

import { AppError } from "../errors/AppError.js";
import { logger } from "../logger/logger.js";
import { analyzeMediaUrl } from "../services/mediaService.js";
import {
    downloadMedia,
    removeDownloadedFile,
    type DownloadType,
} from "../services/downloadService.js";
import type { AnalyzeMediaRequest } from "../types/media.js";

export async function analyzeMedia(
    req: Request,
    res: Response
): Promise<void> {
    try {
        const { url } = req.body as AnalyzeMediaRequest;

        if (typeof url !== "string") {
            throw new AppError(400, "URL is required.");
        }

        const result = await analyzeMediaUrl(url);

        res.status(200).json(result);
    } catch (error) {
        logger.error(error);

        if (error instanceof AppError) {
            res.status(error.statusCode).json({
                success: false,
                message: error.message,
            });
            return;
        }

        res.status(500).json({
            success: false,
            message: "Unable to analyze media.",
        });
    }
}

export async function downloadMediaFile(
    req: Request,
    res: Response
): Promise<void> {
    let downloadedFile: string | null = null;

    try {
        const { url, type, quality, title } = req.body as {
            url?: string;
            type?: DownloadType;
            quality?: number;
            title?: string;
        };

        if (!url || typeof url !== "string") {
            throw new AppError(400, "URL is required.");
        }

        if (type !== "video" && type !== "audio") {
            throw new AppError(400, "Invalid download type.");
        }

        if (
            typeof quality !== "number" ||
            !Number.isFinite(quality) ||
            quality <= 0
        ) {
            throw new AppError(400, "Invalid quality.");
        }

        const result = await downloadMedia({
            url,
            type,
            quality,
            title,
        });

        downloadedFile = result.filePath;

        res.download(
            result.filePath,
            result.fileName,
            async (error) => {
                await removeDownloadedFile(result.filePath);

                if (error) {
                    logger.error(error);
                }
            }
        );
    } catch (error) {
        if (downloadedFile) {
            await removeDownloadedFile(downloadedFile);
        }

        logger.error(error);

        if (error instanceof AppError) {
            res.status(error.statusCode).json({
                success: false,
                message: error.message,
            });
            return;
        }

        res.status(500).json({
            success: false,
            message: "Unable to download media.",
        });
    }
}