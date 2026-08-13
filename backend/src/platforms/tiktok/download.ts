import { AppError } from "../../errors/AppError.js";

export async function downloadTikTokMedia() {
    throw new AppError(
        501,
        "TikTok support is not implemented yet."
    );
}