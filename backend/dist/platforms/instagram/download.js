"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.downloadInstagramMedia = downloadInstagramMedia;
const AppError_js_1 = require("../../errors/AppError.js");
async function downloadInstagramMedia() {
    throw new AppError_js_1.AppError(501, "Instagram support is not implemented yet.");
}
