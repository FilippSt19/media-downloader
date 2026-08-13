"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ENV = void 0;
exports.ENV = {
    PORT: Number(process.env.PORT) || 4000,
    TEMP_DIR: process.env.TEMP_DIR || "temp",
    YT_DLP_PATH: process.env.YT_DLP_PATH ?? "yt-dlp",
};
