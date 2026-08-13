"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.downloadAudio = downloadAudio;
const promises_1 = __importDefault(require("node:fs/promises"));
const node_path_1 = __importDefault(require("node:path"));
const AppError_js_1 = require("../../errors/AppError.js");
const logger_js_1 = require("../../logger/logger.js");
const emitters_js_1 = require("../../socket/emitters.js");
const process_js_1 = require("../../utils/process.js");
const progress_js_1 = require("./progress.js");
const TEMP_DIR = node_path_1.default.resolve("temp");
async function downloadAudio(id, url, quality) {
    await promises_1.default.mkdir(TEMP_DIR, { recursive: true });
    const outputTemplate = node_path_1.default.join(TEMP_DIR, `${id}.%(ext)s`);
    (0, emitters_js_1.emitDownloadStarted)();
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
            const progress = (0, progress_js_1.parseProgress)(text);
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
    return node_path_1.default.join(TEMP_DIR, `${id}.mp3`);
}
