"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ENV = void 0;
exports.ENV = {
    PORT: Number(process.env.PORT) || 4000,
    TEMP_DIR: process.env.TEMP_DIR || "temp",
};
