"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const multer_1 = __importDefault(require("multer"));
const mediaController_js_1 = require("../controllers/mediaController.js");
const validate_js_1 = require("../validation/validate.js");
const media_js_1 = require("../validation/media.js");
const download_js_1 = require("../validation/download.js");
const router = (0, express_1.Router)();
const upload = (0, multer_1.default)({
    storage: multer_1.default.memoryStorage(),
    limits: { fileSize: 200 * 1024 * 1024 },
});
router.post("/analyze", (0, validate_js_1.validate)(media_js_1.analyzeMediaSchema), mediaController_js_1.analyzeMedia);
router.post("/download", (0, validate_js_1.validate)(download_js_1.downloadSchema), mediaController_js_1.downloadMediaFile);
router.post("/convert", upload.single("file"), (0, validate_js_1.validate)(media_js_1.convertMediaSchema), mediaController_js_1.convertMediaFile);
exports.default = router;
