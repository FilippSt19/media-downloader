"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.analyzeMediaUrl = analyzeMediaUrl;
const AppError_js_1 = require("../errors/AppError.js");
const detector_js_1 = require("../platforms/detector.js");
const index_js_1 = require("../platforms/instagram/index.js");
const index_js_2 = require("../platforms/tiktok/index.js");
const index_js_3 = require("../platforms/youtube/index.js");
async function analyzeMediaUrl(url) {
    const normalizedUrl = url.trim();
    if (!normalizedUrl) {
        throw new AppError_js_1.AppError(400, "URL is required.");
    }
    const platform = (0, detector_js_1.detectPlatform)(normalizedUrl);
    if (!platform) {
        throw new AppError_js_1.AppError(400, "Unsupported or invalid media URL.");
    }
    switch (platform) {
        case "youtube":
            return {
                success: true,
                platform,
                url: normalizedUrl,
                media: await (0, index_js_3.getYouTubeMetadata)(normalizedUrl),
            };
        case "instagram":
            return {
                success: true,
                platform,
                url: normalizedUrl,
                media: await (0, index_js_1.getInstagramMetadata)(normalizedUrl),
            };
        case "tiktok":
            return {
                success: true,
                platform,
                url: normalizedUrl,
                media: await (0, index_js_2.getTikTokMetadata)(normalizedUrl),
            };
        default:
            throw new AppError_js_1.AppError(400, "Unsupported platform.");
    }
}
