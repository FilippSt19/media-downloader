"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ENV = void 0;
const node_path_1 = __importDefault(require("node:path"));
exports.ENV = {
    PORT: Number(process.env.PORT) || 4000,
    TEMP_DIR: process.env.TEMP_DIR || "temp",
    YT_DLP_PATH: process.env.YT_DLP_PATH ?? "yt-dlp",
    YOUTUBE_COOKIES_PATH: process.env.YOUTUBE_COOKIES_PATH ??
        node_path_1.default.resolve("cookies", "youtube.txt"),
};
