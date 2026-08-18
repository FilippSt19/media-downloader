export const ENV = {
  PORT: Number(process.env.PORT) || 4000,

  TEMP_DIR: process.env.TEMP_DIR || "temp",

  YT_DLP_PATH: process.env.YT_DLP_PATH ?? "yt-dlp",

  JS_RUNTIME:
    process.env.JS_RUNTIME ??
    (process.platform === "win32"
      ? "node"
      : "node:/usr/bin/node"),
};