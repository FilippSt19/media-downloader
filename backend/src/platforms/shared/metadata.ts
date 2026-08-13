import { execFile } from "node:child_process";
import { promisify } from "node:util";

import type {
    AudioFormat,
    MediaMetadata,
    YtDlpOutput,
} from "./types.js";

const execFileAsync = promisify(execFile);

const AUDIO_PRESETS: AudioFormat[] = [
    {
        quality: "128 kbps",
        bitrate: 128,
    },
    {
        quality: "192 kbps",
        bitrate: 192,
    },
    {
        quality: "320 kbps",
        bitrate: 320,
    },
];

export async function getMetadata(
    url: string
): Promise<MediaMetadata> {
    const { stdout } = await execFileAsync(
        "yt-dlp",
        [
            "--js-runtimes",
            "node:/usr/bin/node",
            "--dump-single-json",
            "--skip-download",
            "--no-playlist",
            url,
        ],
        {
            maxBuffer: 20 * 1024 * 1024,
        }
    );

    const data = JSON.parse(stdout) as YtDlpOutput;

    const heights = new Set<number>();

    for (const format of data.formats ?? []) {
        if (
            typeof format.height === "number" &&
            format.vcodec &&
            format.vcodec !== "none"
        ) {
            heights.add(format.height);
        }
    }

    const videoFormats = Array.from(heights)
        .sort((a, b) => b - a)
        .map((height) => ({
            quality: `${height}p`,
            height,
        }));

    return {
        title: data.title ?? "Unknown title",
        thumbnail: data.thumbnail ?? null,
        duration: data.duration ?? null,
        uploader: data.uploader ?? null,

        formats: {
            video: videoFormats,
            audio: AUDIO_PRESETS,
        },
    };
}