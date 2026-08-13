"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getTikTokMetadata = getTikTokMetadata;
const metadata_js_1 = require("../shared/metadata.js");
async function getTikTokMetadata(url) {
    return (0, metadata_js_1.getMetadata)(url);
}
