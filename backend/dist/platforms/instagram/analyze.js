"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getInstagramMetadata = getInstagramMetadata;
const metadata_js_1 = require("../shared/metadata.js");
async function getInstagramMetadata(url) {
    return (0, metadata_js_1.getMetadata)(url);
}
