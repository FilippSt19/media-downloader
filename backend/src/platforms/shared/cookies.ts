import fs from "node:fs/promises";

import { ENV } from "../../config/environment.js";
import { logger } from "../../logger/logger.js";

async function buildCookieArgs(
    path: string,
    platform: string
): Promise<string[]> {
    try {
        await fs.access(path);

        logger.info(
            `Using ${platform} cookies: ${path}`
        );

        return [
            "--cookies",
            path,
        ];
    } catch {
        logger.warn(
            `${platform} cookies not found.`
        );

        return [];
    }
}

export function getYouTubeCookiesArgs() {
    return buildCookieArgs(
        ENV.YOUTUBE_COOKIES_PATH,
        "YouTube"
    );
}

export function getInstagramCookiesArgs() {
    return buildCookieArgs(
        ENV.INSTAGRAM_COOKIES_PATH,
        "Instagram"
    );
}