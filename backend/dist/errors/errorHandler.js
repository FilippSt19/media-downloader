"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = errorHandler;
const AppError_js_1 = require("./AppError.js");
const logger_js_1 = require("../logger/logger.js");
function errorHandler(error, _req, res, _next) {
    logger_js_1.logger.error(error);
    if (error instanceof AppError_js_1.AppError) {
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
