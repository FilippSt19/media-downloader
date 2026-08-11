"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.analyzeMedia = analyzeMedia;
const mediaService_js_1 = require("../services/mediaService.js");
function analyzeMedia(req, res) {
    try {
        const { url } = req.body;
        if (typeof url !== "string") {
            return res.status(400).json({
                success: false,
                error: "URL is required.",
            });
        }
        const result = (0, mediaService_js_1.analyzeMediaUrl)(url);
        return res.status(200).json(result);
    }
    catch (error) {
        const message = error instanceof Error
            ? error.message
            : "Unable to analyze media.";
        return res.status(400).json({
            success: false,
            error: message,
        });
    }
}
