"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.downloadTikTokMedia = downloadTikTokMedia;
const AppError_js_1 = require("../../errors/AppError.js");
async function downloadTikTokMedia() {
    throw new AppError_js_1.AppError(501, "TikTok support is not implemented yet.");
}
