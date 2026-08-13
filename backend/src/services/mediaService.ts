import { AppError } from "../errors/AppError.js";

import { detectPlatform } from "../platforms/detector.js";

import { getInstagramMetadata } from "../platforms/instagram/index.js";
import { getTikTokMetadata } from "../platforms/tiktok/index.js";
import { getYouTubeMetadata } from "../platforms/youtube/index.js";

export async function analyzeMediaUrl(url: string) {
    const normalizedUrl = url.trim();

    if (!normalizedUrl) {
        throw new AppError(400, "URL is required.");
    }

    const platform = detectPlatform(normalizedUrl);

    if (!platform) {
        throw new AppError(
            400,
            "Unsupported or invalid media URL."
        );
    }

    switch (platform) {
        case "youtube":
            return {
                success: true,
                platform,
                url: normalizedUrl,
                media: await getYouTubeMetadata(
                    normalizedUrl
                ),
            };

        case "instagram":
            return {
                success: true,
                platform,
                url: normalizedUrl,
                media: await getInstagramMetadata(
                    normalizedUrl
                ),
            };

        case "tiktok":
            return {
                success: true,
                platform,
                url: normalizedUrl,
                media: await getTikTokMetadata(
                    normalizedUrl
                ),
            };

        default:
            throw new AppError(
                400,
                "Unsupported platform."
            );
    }
}