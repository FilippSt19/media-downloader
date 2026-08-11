"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const mediaController_js_1 = require("../controllers/mediaController.js");
const router = (0, express_1.Router)();
router.post("/analyze", mediaController_js_1.analyzeMedia);
exports.default = router;
