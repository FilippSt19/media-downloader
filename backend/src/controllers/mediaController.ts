import type { Request, Response } from "express";

import { analyzeMediaUrl } from "../services/mediaService.js";
import type { AnalyzeMediaRequest } from "../types/media.js";

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
    const message =
      error instanceof Error
        ? error.message
        : "Unable to analyze media.";

    return res.status(400).json({
      success: false,
      error: message,
    });
  }
}