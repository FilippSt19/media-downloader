"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.convertMediaSchema = exports.analyzeMediaSchema = void 0;
const zod_1 = require("zod");
exports.analyzeMediaSchema = zod_1.z.object({
    url: zod_1.z.url("Invalid URL."),
});
exports.convertMediaSchema = zod_1.z.object({
    category: zod_1.z.enum(["video", "photo", "document", "audio"]),
    format: zod_1.z.string().trim().toLowerCase().regex(/^[a-z0-9]+$/, "Invalid output format."),
});
