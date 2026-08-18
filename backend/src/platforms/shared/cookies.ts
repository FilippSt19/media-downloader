import fs from "node:fs/promises";

import { ENV } from "../../config/environment.js";
import { logger } from "../../logger/logger.js";

export async function getYouTubeCookiesArgs(): Promise<string[]> {
    try {
        await fs.access(ENV.YOUTUBE_COOKIES_PATH);

        logger.info(
            `Using YouTube cookies: ${ENV.YOUTUBE_COOKIES_PATH}`
        );

        return [
            "--cookies",
            ENV.YOUTUBE_COOKIES_PATH,
        ];
    } catch {
        logger.warn(
            "YouTube cookies not found."
        );

        return [];
    }
}