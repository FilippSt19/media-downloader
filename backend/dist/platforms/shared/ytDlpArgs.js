"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.buildMetadataArgs = buildMetadataArgs;
exports.buildVideoArgs = buildVideoArgs;
exports.buildAudioArgs = buildAudioArgs;
const cookies_js_1 = require("./cookies.js");
async function buildMetadataArgs(url, platform) {
    const args = [];
    if (platform === "youtube") {
        args.push("--js-runtimes", "node");
        args.push(...await (0, cookies_js_1.getYouTubeCookiesArgs)());
    }
    args.push("--dump-single-json", "--skip-download", "--no-playlist", url);
    return args;
}
async function buildVideoArgs(url, output, quality, platform) {
    const args = [];
    if (platform === "youtube") {
        args.push("--js-runtimes", "node");
        args.push(...await (0, cookies_js_1.getYouTubeCookiesArgs)());
        args.push("--no-playlist", "-f", `bestvideo[height<=${quality}]+bestaudio/best[height<=${quality}]`, "--merge-output-format", "mp4");
    }
    else {
        args.push("--no-playlist", "-f", `best[height<=${quality}]/best`);
    }
    args.push("-o", output, url);
    return args;
}
async function buildAudioArgs(url, output, quality, platform) {
    const args = [];
    if (platform === "youtube") {
        args.push("--js-runtimes", "node");
        args.push(...await (0, cookies_js_1.getYouTubeCookiesArgs)());
    }
    args.push("--no-playlist", "-x", "--audio-format", "mp3", "--audio-quality", `${quality}K`, "-o", output, url);
    return args;
}
