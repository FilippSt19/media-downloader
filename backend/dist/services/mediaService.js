"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MediaValidationError = void 0;
exports.analyzeMediaUrl = analyzeMediaUrl;
const detector_js_1 = require("../platforms/detector.js");
const index_js_1 = require("../platforms/youtube/index.js");
class MediaValidationError extends Error {
    constructor(message) {
        super(message);
        this.name = "MediaValidationError";
    }
}
exports.MediaValidationError = MediaValidationError;
async function analyzeMediaUrl(url) {
    const normalizedUrl = url.trim();
    if (!normalizedUrl) {
        throw new MediaValidationError("URL is required.");
    }
    const platform = (0, detector_js_1.detectPlatform)(normalizedUrl);
    if (!platform) {
        throw new MediaValidationError("Unsupported or invalid media URL. Include the full link (e.g. https://...).");
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
