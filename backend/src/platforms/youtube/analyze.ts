import { getMetadata } from "../shared/metadata.js";

export async function getYouTubeMetadata(
    url: string
) {
    return getMetadata(url);
}