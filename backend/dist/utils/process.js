"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.spawnYtDlp = spawnYtDlp;
const node_child_process_1 = require("node:child_process");
const environment_js_1 = require("../config/environment.js");
function spawnYtDlp(args) {
    return (0, node_child_process_1.spawn)(environment_js_1.ENV.YT_DLP_PATH, args);
}
