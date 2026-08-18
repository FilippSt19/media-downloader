import { getMetadata } from "../shared/metadata.js";

export async function getInstagramMetadata(
    url: string
) {
    return getMetadata(
        url,
        "instagram"
    );
}