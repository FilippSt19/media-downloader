import { detectPlatform } from "../platforms/platformDetector.js";
import type { AnalyzeMediaResponse } from "../types/media.js";

export function analyzeMediaUrl(url: string): AnalyzeMediaResponse {
  const normalizedUrl = url.trim();

  if (!normalizedUrl) {
    throw new Error("URL is required.");
  }

  const platform = detectPlatform(normalizedUrl);

  if (!platform) {
    throw new Error("Unsupported or invalid media URL.");
  }

  return {
    success: true,
    platform,
    url: normalizedUrl,
  };
}