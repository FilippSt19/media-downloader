"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.analyzeMediaSchema = void 0;
const zod_1 = require("zod");
exports.analyzeMediaSchema = zod_1.z.object({
    url: zod_1.z.url("Invalid URL."),
});
