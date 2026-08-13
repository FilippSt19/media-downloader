"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.analyzeMedia = analyzeMedia;
exports.downloadMediaFile = downloadMediaFile;
const mediaService_js_1 = require("../services/mediaService.js");
const downloadService_js_1 = require("../services/downloadService.js");
async function analyzeMedia(req, res) {
    try {
        const { url } = req.body;
        if (typeof url !== "string") {
            return res.status(400).json({
                success: false,
                error: "URL is required.",
            });
        }
        const result = await (0, mediaService_js_1.analyzeMediaUrl)(url);
        return res.status(200).json(result);
    }
    catch (error) {
        if (error instanceof mediaService_js_1.MediaValidationError) {
            return res.status(400).json({
                success: false,
                error: error.message,
            });
        }
        const message = error instanceof Error
            ? error.message
            : "Unable to analyze media.";
        return res.status(500).json({
            success: false,
            error: message,
        });
    }
}
async function downloadMediaFile(req, res) {
    let downloadedFile = null;
    try {
        const { url, type, quality, title } = req.body;
        if (!url || typeof url !== "string") {
            return res.status(400).json({
                success: false,
                error: "URL is required.",
            });
        }
        if (type !== "video" && type !== "audio") {
            return res.status(400).json({
                success: false,
                error: "Invalid download type.",
            });
        }
        if (typeof quality !== "number" ||
            !Number.isFinite(quality) ||
            quality <= 0) {
            return res.status(400).json({
                success: false,
                error: "Invalid quality.",
            });
        }
        const result = await (0, downloadService_js_1.downloadMedia)({
            url,
            type,
            quality,
        });
        downloadedFile = result.filePath;
        res.download(result.filePath, result.fileName, async (error) => {
            await (0, downloadService_js_1.removeDownloadedFile)(result.filePath);
            if (error) {
                console.error("Download response failed:", error);
            }
        });
        return;
    }
    catch (error) {
        if (downloadedFile) {
            await (0, downloadService_js_1.removeDownloadedFile)(downloadedFile);
        }
        console.error(error);
        return res.status(500).json({
            success: false,
            error: "Unable to download media.",
        });
    }
}
