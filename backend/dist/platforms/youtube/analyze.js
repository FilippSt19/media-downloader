"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getYouTubeMetadata = getYouTubeMetadata;
const metadata_js_1 = require("../shared/metadata.js");
async function getYouTubeMetadata(url) {
    return (0, metadata_js_1.getMetadata)(url, "youtube");
}
