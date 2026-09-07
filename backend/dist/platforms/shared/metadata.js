"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getMetadata = getMetadata;
const node_child_process_1 = require("node:child_process");
const node_util_1 = require("node:util");
const environment_js_1 = require("../../config/environment.js");
const ytDlpArgs_js_1 = require("./ytDlpArgs.js");
const execFileAsync = (0, node_util_1.promisify)(node_child_process_1.execFile);
const AUDIO_PRESETS = [
    {
        quality: "128 kbps",
        bitrate: 128,
    },
    {
        quality: "192 kbps",
        bitrate: 192,
    },
    {
        quality: "320 kbps",
        bitrate: 320,
    },
];
async function getMetadata(url, platform) {
    const args = await (0, ytDlpArgs_js_1.buildMetadataArgs)(url, platform);
    try {
        const { stdout } = await execFileAsync(environment_js_1.ENV.YT_DLP_PATH, args, {
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
    catch (error) {
        console.error(error);
        throw error;
    }
}
