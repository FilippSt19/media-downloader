import { detectPlatform } from "../platforms/detector.js";
import { getYouTubeMetadata } from "../platforms/youtube/index.js";

export async function analyzeMediaUrl(url: string) {
  const normalizedUrl = url.trim();

  if (!normalizedUrl) {
    throw new Error("URL is required.");
  }

  const platform = detectPlatform(normalizedUrl);

  if (!platform) {
    throw new Error("Unsupported or invalid media URL.");
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