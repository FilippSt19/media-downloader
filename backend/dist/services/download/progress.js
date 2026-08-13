"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseProgress = parseProgress;
function parseProgress(line) {
    const match = line.match(/\[download\]\s+(\d+(?:\.\d+)?)%/);
    if (!match) {
        return null;
    }
    return Math.floor(Number(match[1]));
}
