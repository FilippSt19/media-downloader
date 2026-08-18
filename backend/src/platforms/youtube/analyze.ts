import { getMetadata } from "../shared/metadata.js";

export async function getYouTubeMetadata(
    url: string
): Promise<ReturnType<typeof getMetadata>> {
    return getMetadata(url, "youtube");
}