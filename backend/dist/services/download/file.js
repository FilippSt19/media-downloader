"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createDownloadId = createDownloadId;
exports.sanitizeFileName = sanitizeFileName;
const node_crypto_1 = require("node:crypto");
function createDownloadId() {
    return (0, node_crypto_1.randomUUID)();
}
function sanitizeFileName(value) {
    return value
        .replace(/[<>:"/\\|?*\x00-\x1F]/g, "")
        .replace(/\s+/g, " ")
        .trim()
        .slice(0, 150);
}
