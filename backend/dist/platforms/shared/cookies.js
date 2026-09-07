"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getYouTubeCookiesArgs = getYouTubeCookiesArgs;
exports.getInstagramCookiesArgs = getInstagramCookiesArgs;
const promises_1 = __importDefault(require("node:fs/promises"));
const environment_js_1 = require("../../config/environment.js");
const logger_js_1 = require("../../logger/logger.js");
async function buildCookieArgs(path, platform) {
    try {
        await promises_1.default.access(path);
        logger_js_1.logger.info(`Using ${platform} cookies: ${path}`);
        return [
            "--cookies",
            path,
        ];
    }
    catch {
        logger_js_1.logger.warn(`${platform} cookies not found.`);
        return [];
    }
}
function getYouTubeCookiesArgs() {
    return buildCookieArgs(environment_js_1.ENV.YOUTUBE_COOKIES_PATH, "YouTube");
}
function getInstagramCookiesArgs() {
    return buildCookieArgs(environment_js_1.ENV.INSTAGRAM_COOKIES_PATH, "Instagram");
}
