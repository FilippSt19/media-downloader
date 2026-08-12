"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.downloadMedia = downloadMedia;
exports.removeDownloadedFile = removeDownloadedFile;
const node_child_process_1 = require("node:child_process");
const node_crypto_1 = require("node:crypto");
const promises_1 = __importDefault(require("node:fs/promises"));
const node_path_1 = __importDefault(require("node:path"));
const node_util_1 = require("node:util");
const execFileAsync = (0, node_util_1.promisify)(node_child_process_1.execFile);
const TEMP_DIR = node_path_1.default.resolve("temp");
function sanitizeFileName(value) {
    return value
        .replace(/[<>:"/\\|?*\x00-\x1F]/g, "")
        .replace(/\s+/g, " ")
        .trim()
        .slice(0, 150);
}
async function downloadMedia({ url, type, quality, title, }) {
    await promises_1.default.mkdir(TEMP_DIR, { recursive: true });
    const id = (0, node_crypto_1.randomUUID)();
    const safeTitle = sanitizeFileName(title || "media") || "media";
    if (type === "audio") {
        const outputTemplate = node_path_1.default.join(TEMP_DIR, `${id}.%(ext)s`);
        await execFileAsync("yt-dlp", [
            "--no-playlist",
            "-x",
            "--audio-format",
            "mp3",
            "--audio-quality",
            `${quality}K`,
            "-o",
            outputTemplate,
            url,
        ], {
            maxBuffer: 20 * 1024 * 1024,
        });
        return {
            filePath: node_path_1.default.join(TEMP_DIR, `${id}.mp3`),
            fileName: `${safeTitle}.mp3`,
        };
    }
    const filePath = node_path_1.default.join(TEMP_DIR, `${id}.mp4`);
    await execFileAsync("yt-dlp", [
        "--no-playlist",
        "-f",
        `bestvideo[height<=${quality}]+bestaudio/best[height<=${quality}]`,
        "--merge-output-format",
        "mp4",
        "-o",
        filePath,
        url,
    ], {
        maxBuffer: 20 * 1024 * 1024,
    });
    return {
        filePath,
        fileName: `${safeTitle}.mp4`,
    };
}
async function removeDownloadedFile(filePath) {
    await promises_1.default.rm(filePath, { force: true });
}
