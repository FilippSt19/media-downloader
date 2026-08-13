"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.downloadMedia = downloadMedia;
exports.removeDownloadedFile = removeDownloadedFile;
const promises_1 = __importDefault(require("node:fs/promises"));
const node_crypto_1 = require("node:crypto");
const audio_js_1 = require("./download/audio.js");
const video_js_1 = require("./download/video.js");
const file_js_1 = require("./download/file.js");
let downloadQueue = Promise.resolve();
function enqueueDownload(task) {
    const result = downloadQueue.then(task, task);
    downloadQueue = result.then(() => undefined, () => undefined);
    return result;
}
async function downloadMedia({ url, type, quality, title, }) {
    const id = (0, node_crypto_1.randomUUID)();
    const safeTitle = (0, file_js_1.sanitizeFileName)(title || "media") || "media";
    if (type === "audio") {
        const filePath = await enqueueDownload(() => (0, audio_js_1.downloadAudio)(id, url, quality));
        return {
            filePath,
            fileName: `${safeTitle}.mp3`,
        };
    }
    const filePath = await enqueueDownload(() => (0, video_js_1.downloadVideo)(id, url, quality));
    return {
        filePath,
        fileName: `${safeTitle}.mp4`,
    };
}
async function removeDownloadedFile(filePath) {
    await promises_1.default.rm(filePath, { force: true });
}
