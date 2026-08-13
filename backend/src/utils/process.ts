import { spawn } from "node:child_process";
import { ENV } from "../config/environment.js";

export function spawnYtDlp(args: string[]) {
    return spawn(ENV.YT_DLP_PATH, args);
}