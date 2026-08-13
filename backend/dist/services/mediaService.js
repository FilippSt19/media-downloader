"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.analyzeMediaUrl = analyzeMediaUrl;
const AppError_js_1 = require("../errors/AppError.js");
const detector_js_1 = require("../platforms/detector.js");
const index_js_1 = require("../platforms/youtube/index.js");
async function analyzeMediaUrl(url) {
    const normalizedUrl = url.trim();
    if (!normalizedUrl) {
        throw new AppError_js_1.AppError(400, "URL is required.");
    }
    const platform = (0, detector_js_1.detectPlatform)(normalizedUrl);
    if (!platform) {
        throw new AppError_js_1.AppError(400, "Unsupported or invalid media URL.");
    }
    if (platform === "youtube") {
        const media = await (0, index_js_1.getYouTubeMetadata)(normalizedUrl);
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
