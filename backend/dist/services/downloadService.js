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
const socket_js_1 = require("../socket.js");
function parseProgress(line) {
    const match = line.match(/\[download\]\s+(\d+(?:\.\d+)?)%/);
    if (!match)
        return null;
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
    if (type === "audio") {
        const outputTemplate = node_path_1.default.join(TEMP_DIR, `${id}.%(ext)s`);
        await new Promise((resolve, reject) => {
            const io = (0, socket_js_1.getSocket)();
            const process = (0, node_child_process_1.spawn)("yt-dlp", [
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
            process.stdout.on("data", (chunk) => {
                const text = chunk.toString();
                const progress = parseProgress(text);
                if (progress !== null) {
                    io.emit("download-progress", {
                        progress,
                        status: "Downloading..."
                    });
                }
            });
            process.stderr.on("data", console.error);
            process.on("close", (code) => {
                if (code === 0) {
                    io.emit("download-progress", {
                        progress: 100,
                        status: "Finished"
                    });
                    resolve();
                    return;
                }
                reject(new Error("Download failed"));
            });
        });
        return {
            filePath: node_path_1.default.join(TEMP_DIR, `${id}.mp3`),
            fileName: `${safeTitle}.mp3`,
        };
    }
    const filePath = node_path_1.default.join(TEMP_DIR, `${id}.mp4`);
    await new Promise((resolve, reject) => {
        const proc = (0, node_child_process_1.spawn)("yt-dlp", [
            "--no-playlist",
            "-f",
            `bestvideo[height<=${quality}]+bestaudio/best[height<=${quality}]`,
            "--merge-output-format",
            "mp4",
            "-o",
            filePath,
            url,
        ]);
        proc.on("close", (code) => {
            if (code === 0)
                resolve();
            else
                reject(new Error(`Process exited with code ${code}`));
        });
        proc.on("error", reject);
    });
    return {
        filePath,
        fileName: `${safeTitle}.mp4`,
    };
}
async function removeDownloadedFile(filePath) {
    await promises_1.default.rm(filePath, { force: true });
}
