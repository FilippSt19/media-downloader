import { AppError } from "../../errors/AppError.js";

export async function getInstagramMetadata(
    _url: string
) {
    throw new AppError(
        501,
        "Instagram support is not implemented yet."
    );
}