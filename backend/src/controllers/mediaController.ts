import type { Request, Response } from "express";

import {
  analyzeMediaUrl,
  MediaValidationError,
} from "../services/mediaService.js";
import type { AnalyzeMediaRequest } from "../types/media.js";

import {
  downloadMedia,
  removeDownloadedFile,
  type DownloadType,
} from "../services/downloadService.js";

export async function analyzeMedia(req: Request, res: Response) {
  try {
    const { url } = req.body as AnalyzeMediaRequest;

    if (typeof url !== "string") {
      return res.status(400).json({
        success: false,
        error: "URL is required.",
      });
    }

    const result = await analyzeMediaUrl(url);

    return res.status(200).json(result);
  } catch (error) {
    if (error instanceof MediaValidationError) {
      return res.status(400).json({
        success: false,
        error: error.message,
      });
    }

    const message =
      error instanceof Error
        ? error.message
        : "Unable to analyze media.";

    return res.status(500).json({
      success: false,
      error: message,
    });
  }
}

export async function downloadMediaFile(
  req: Request,
  res: Response
) {
  let downloadedFile: string | null = null;

  try {
    const { url, type, quality, title } = req.body as {
      url?: string;
      type?: DownloadType;
      quality?: number;
      title?: string;
    };

    if (!url || typeof url !== "string") {
      return res.status(400).json({
        success: false,
        error: "URL is required.",
      });
    }

    if (type !== "video" && type !== "audio") {
      return res.status(400).json({
        success: false,
        error: "Invalid download type.",
      });
    }

    if (
      typeof quality !== "number" ||
      !Number.isFinite(quality) ||
      quality <= 0
    ) {
      return res.status(400).json({
        success: false,
        error: "Invalid quality.",
      });
    }

    const result = await downloadMedia({
      url,
      type,
      quality,
    });

    downloadedFile = result.filePath;

    res.download(
      result.filePath,
      result.fileName,
      async (error) => {
        await removeDownloadedFile(result.filePath);

        if (error) {
          console.error("Download response failed:", error);
        }
      }
    );

    return;
  } catch (error) {
    if (downloadedFile) {
      await removeDownloadedFile(downloadedFile);
    }

    console.error(error);

    return res.status(500).json({
      success: false,
      error: "Unable to download media.",
    });
  }
}