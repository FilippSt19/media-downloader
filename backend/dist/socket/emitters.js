"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.emitDownloadStarted = emitDownloadStarted;
exports.emitDownloadProgress = emitDownloadProgress;
exports.emitDownloadCompleted = emitDownloadCompleted;
exports.emitDownloadFailed = emitDownloadFailed;
const index_js_1 = require("./index.js");
const events_js_1 = require("./events.js");
function emitDownloadStarted() {
    (0, index_js_1.getSocket)().emit(events_js_1.SocketEvents.DOWNLOAD_STARTED);
}
function emitDownloadProgress(progress, status) {
    (0, index_js_1.getSocket)().emit(events_js_1.SocketEvents.DOWNLOAD_PROGRESS, {
        progress,
        status,
    });
}
function emitDownloadCompleted() {
    (0, index_js_1.getSocket)().emit(events_js_1.SocketEvents.DOWNLOAD_COMPLETED);
}
function emitDownloadFailed(message) {
    (0, index_js_1.getSocket)().emit(events_js_1.SocketEvents.DOWNLOAD_FAILED, {
        message,
    });
}
