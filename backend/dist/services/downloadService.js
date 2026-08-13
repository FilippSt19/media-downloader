"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.downloadMedia = downloadMedia;
exports.removeDownloadedFile = removeDownloadedFile;
const node_crypto_1 = require("node:crypto");
const promises_1 = __importDefault(require("node:fs/promises"));
const node_path_1 = __importDefault(require("node:path"));
const process_js_1 = require("../utils/process.js");
const logger_js_1 = require("../logger/logger.js");
const AppError_js_1 = require("../errors/AppError.js");
const emitters_js_1 = require("../socket/emitters.js");
function parseProgress(line) {
    const match = line.match(/\[download\]\s+(\d+(?:\.\d+)?)%/);
    if (!match) {
        return null;
    }
    return Math.floor(Number(match[1]));
}
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
    (0, emitters_js_1.emitDownloadStarted)();
    if (type === "audio") {
        const outputTemplate = node_path_1.default.join(TEMP_DIR, `${id}.%(ext)s`);
        await new Promise((resolve, reject) => {
            const process = (0, process_js_1.spawnYtDlp)([
                "--no-playlist",
                "-x",
                "--audio-format",
                "mp3",
                "--audio-quality",
                `${quality}K`,
                "-o",
                outputTemplate,
                url,
            ]);
            process.stderr.on("data", (chunk) => {
                const text = chunk.toString();
                logger_js_1.logger.info(text.trim());
                const progress = parseProgress(text);
                if (progress !== null) {
                    (0, emitters_js_1.emitDownloadProgress)(progress, "Downloading");
                }
            });
            process.on("close", (code) => {
                if (code === 0) {
                    (0, emitters_js_1.emitDownloadCompleted)();
                    resolve();
                    return;
                }
                (0, emitters_js_1.emitDownloadFailed)("Download failed");
                reject(new AppError_js_1.AppError(500, "Download failed."));
            });
            process.on("error", (error) => {
                (0, emitters_js_1.emitDownloadFailed)(error.message);
                reject(error);
            });
        });
        return {
            filePath: node_path_1.default.join(TEMP_DIR, `${id}.mp3`),
            fileName: `${safeTitle}.mp3`,
        };
    }
    const filePath = node_path_1.default.join(TEMP_DIR, `${id}.mp4`);
    await new Promise((resolve, reject) => {
        const process = (0, process_js_1.spawnYtDlp)([
            "--no-playlist",
            "-f",
            `bestvideo[height<=${quality}]+bestaudio/best[height<=${quality}]`,
            "--merge-output-format",
            "mp4",
            "-o",
            filePath,
            url,
        ]);
        process.stderr.on("data", (chunk) => {
            const text = chunk.toString();
            logger_js_1.logger.info(text.trim());
            const progress = parseProgress(text);
            if (progress !== null) {
                (0, emitters_js_1.emitDownloadProgress)(progress, "Downloading");
            }
        });
        process.on("close", (code) => {
            if (code === 0) {
                (0, emitters_js_1.emitDownloadCompleted)();
                resolve();
                return;
            }
            (0, emitters_js_1.emitDownloadFailed)(`Process exited with code ${code}`);
            reject(new AppError_js_1.AppError(500, `Process exited with code ${code}.`));
        });
        process.on("error", (error) => {
            (0, emitters_js_1.emitDownloadFailed)(error.message);
            reject(error);
        });
    });
    return {
        filePath,
        fileName: `${safeTitle}.mp4`,
    };
}
async function removeDownloadedFile(filePath) {
    await promises_1.default.rm(filePath, { force: true });
}
