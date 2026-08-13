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
        throw new AppError(400, "Unsupported or invalid media URL.");
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

    if (platform === "instagram") {
        const media = await getInstagramMetadata(normalizedUrl);

        return {
            success: true,
            platform,
            url: normalizedUrl,
            media,
        };
    }

    if (platform === "tiktok") {
        const media = await getTikTokMetadata(normalizedUrl);

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