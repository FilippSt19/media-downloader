"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getYouTubeMetadata = getYouTubeMetadata;
const node_child_process_1 = require("node:child_process");
const node_util_1 = require("node:util");
const execFileAsync = (0, node_util_1.promisify)(node_child_process_1.execFile);
const AUDIO_PRESETS = [
    { quality: "128 kbps", bitrate: 128 },
    { quality: "192 kbps", bitrate: 192 },
    { quality: "320 kbps", bitrate: 320 },
];
async function getYouTubeMetadata(url) {
    const { stdout } = await execFileAsync("yt-dlp", [
        "--dump-single-json",
        "--skip-download",
        "--no-playlist",
        url,
    ], {
        maxBuffer: 20 * 1024 * 1024,
    });
    const data = JSON.parse(stdout);
    const heights = new Set();
    for (const format of data.formats ?? []) {
        if (typeof format.height === "number" &&
            format.vcodec &&
            format.vcodec !== "none") {
            heights.add(format.height);
        }
    }
    const videoFormats = Array.from(heights)
        .sort((a, b) => b - a)
        .map((height) => ({
        quality: `${height}p`,
        height,
    }));
    return {
        title: data.title ?? "Unknown title",
        thumbnail: data.thumbnail ?? null,
        duration: data.duration ?? null,
        uploader: data.uploader ?? null,
        formats: {
            video: videoFormats,
            audio: AUDIO_PRESETS,
        },
    };
}
