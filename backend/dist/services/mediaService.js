"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.analyzeMediaUrl = analyzeMediaUrl;
const platformDetector_js_1 = require("../platforms/platformDetector.js");
const youtube_js_1 = require("../platforms/youtube.js");
async function analyzeMediaUrl(url) {
    const normalizedUrl = url.trim();
    if (!normalizedUrl) {
        throw new Error("URL is required.");
    }
    const platform = (0, platformDetector_js_1.detectPlatform)(normalizedUrl);
    if (!platform) {
        throw new Error("Unsupported or invalid media URL.");
    }
    if (platform === "youtube") {
        const media = await (0, youtube_js_1.getYouTubeMetadata)(normalizedUrl);
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
