import { AppError } from "../../errors/AppError.js";

export async function downloadInstagramMedia() {
    throw new AppError(
        501,
        "Instagram support is not implemented yet."
    );
}