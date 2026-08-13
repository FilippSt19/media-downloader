import type { NextFunction, Request, Response } from "express";
import { AppError } from "./AppError.js";
import { logger } from "../logger/logger.js";

export function errorHandler(
    error: Error,
    _req: Request,
    res: Response,
    _next: NextFunction
): void {
    logger.error(error);

    if (error instanceof AppError) {
        res.status(error.statusCode).json({
            success: false,
            message: error.message,
        });

        return;
    }

    res.status(500).json({
        success: false,
        message: "Internal server error.",
    });
}