"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getYouTubeCookiesArgs = getYouTubeCookiesArgs;
const promises_1 = __importDefault(require("node:fs/promises"));
const environment_js_1 = require("../../config/environment.js");
const logger_js_1 = require("../../logger/logger.js");
async function getYouTubeCookiesArgs() {
    try {
        await promises_1.default.access(environment_js_1.ENV.YOUTUBE_COOKIES_PATH);
        logger_js_1.logger.info(`Using YouTube cookies: ${environment_js_1.ENV.YOUTUBE_COOKIES_PATH}`);
        return [
            "--cookies",
            environment_js_1.ENV.YOUTUBE_COOKIES_PATH,
        ];
    }
    catch {
        logger_js_1.logger.warn("YouTube cookies not found.");
        return [];
    }
}
