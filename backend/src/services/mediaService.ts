import { detectPlatform } from "../platforms/detector.js";
import { getYouTubeMetadata } from "../platforms/youtube/index.js";

export class MediaValidationError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "MediaValidationError";
  }
}

export async function analyzeMediaUrl(url: string) {
  const normalizedUrl = url.trim();

  if (!normalizedUrl) {
    throw new MediaValidationError("URL is required.");
  }

  const platform = detectPlatform(normalizedUrl);

  if (!platform) {
    throw new MediaValidationError(
      "Unsupported or invalid media URL. Include the full link (e.g. https://...)."
    );
  }

  if (platform === "youtube") {
    const media = await getYouTubeMetadata(normalizedUrl);

    return {
      success: true,
      platform,
      
      url: normalizedUrl,
      media,
    };
  }

  return {
    success: true,
    platform,
    url: normalizedUrl,
    media: null,
  };
}