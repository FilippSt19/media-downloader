"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.downloadSchema = void 0;
const zod_1 = require("zod");
exports.downloadSchema = zod_1.z.object({
    url: zod_1.z.url("Invalid URL."),
    type: zod_1.z.enum(["audio", "video"]),
    quality: zod_1.z.number().positive(),
    title: zod_1.z.string().optional(),
});
