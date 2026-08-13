import { AppError } from "../../errors/AppError.js";

export async function getTikTokMetadata(
    _url: string
) {
    throw new AppError(
        501,
        "TikTok support is not implemented yet."
    );
}