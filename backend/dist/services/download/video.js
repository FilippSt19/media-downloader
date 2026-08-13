"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.downloadVideo = downloadVideo;
const promises_1 = __importDefault(require("node:fs/promises"));
const node_path_1 = __importDefault(require("node:path"));
const AppError_js_1 = require("../../errors/AppError.js");
const logger_js_1 = require("../../logger/logger.js");
const emitters_js_1 = require("../../socket/emitters.js");
const process_js_1 = require("../../utils/process.js");
const progress_js_1 = require("./progress.js");
const TEMP_DIR = node_path_1.default.resolve("temp");
async function downloadVideo(id, url, quality) {
    await promises_1.default.mkdir(TEMP_DIR, { recursive: true });
    const filePath = node_path_1.default.join(TEMP_DIR, `${id}.mp4`);
    (0, emitters_js_1.emitDownloadStarted)();
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
            (0, emitters_js_1.emitDownloadFailed)(`Process exited with code ${code}`);
            reject(new AppError_js_1.AppError(500, `Process exited with code ${code}.`));
        });
        process.on("error", (error) => {
            (0, emitters_js_1.emitDownloadFailed)(error.message);
            reject(error);
        });
    });
    return filePath;
}
