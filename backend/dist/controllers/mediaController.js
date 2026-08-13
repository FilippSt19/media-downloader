"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.analyzeMedia = analyzeMedia;
exports.downloadMediaFile = downloadMediaFile;
const AppError_js_1 = require("../errors/AppError.js");
const logger_js_1 = require("../logger/logger.js");
const mediaService_js_1 = require("../services/mediaService.js");
const downloadService_js_1 = require("../services/downloadService.js");
async function analyzeMedia(req, res) {
    try {
        const { url } = req.body;
        const result = await (0, mediaService_js_1.analyzeMediaUrl)(url);
        res.status(200).json(result);
    }
    catch (error) {
        logger_js_1.logger.error(error);
        if (error instanceof AppError_js_1.AppError) {
            res.status(error.statusCode).json({
                success: false,
                message: error.message,
            });
            return;
        }
        res.status(500).json({
            success: false,
            message: "Unable to analyze media.",
        });
    }
}
async function downloadMediaFile(req, res) {
    let downloadedFile = null;
    try {
        const { url, type, quality, title } = req.body;
        const result = await (0, downloadService_js_1.downloadMedia)({
            url,
            type,
            quality,
            title,
        });
        downloadedFile = result.filePath;
        res.download(result.filePath, result.fileName, async (error) => {
            await (0, downloadService_js_1.removeDownloadedFile)(result.filePath);
            if (error) {
                logger_js_1.logger.error(error);
            }
        });
    }
    catch (error) {
        if (downloadedFile) {
            await (0, downloadService_js_1.removeDownloadedFile)(downloadedFile);
        }
        logger_js_1.logger.error(error);
        if (error instanceof AppError_js_1.AppError) {
            res.status(error.statusCode).json({
                success: false,
                message: error.message,
            });
            return;
        }
        res.status(500).json({
            success: false,
            message: "Unable to download media.",
        });
    }
}
