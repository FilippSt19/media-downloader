import { getMetadata } from "../shared/metadata.js";

export async function getTikTokMetadata(
    url: string
) {
    return getMetadata(
        url,
        "tiktok"
    );
}