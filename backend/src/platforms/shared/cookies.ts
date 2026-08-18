import fs from "node:fs/promises";

import { ENV } from "../../config/environment.js";

export async function getYouTubeCookiesArgs(): Promise<string[]> {
    try {
        await fs.access(ENV.YOUTUBE_COOKIES_PATH);

        return [
            "--cookies",
            ENV.YOUTUBE_COOKIES_PATH,
        ];
    } catch {
        return [];
    }
}