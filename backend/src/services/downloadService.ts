import fs from "node:fs/promises";
import { randomUUID } from "node:crypto";

import { downloadAudio } from "./download/audio.js";
import { downloadVideo } from "./download/video.js";
import { sanitizeFileName } from "./download/file.js";

let downloadQueue: Promise<void> = Promise.resolve();

function enqueueDownload<T>(task: () => Promise<T>): Promise<T> {
    const result = downloadQueue.then(task, task);
    downloadQueue = result.then(
        () => undefined,
        () => undefined
    );
    return result;
}

export type DownloadType = "video" | "audio";

type DownloadOptions = {
    url: string;
    type: DownloadType;
    quality: number;
    title?: string;
};

export type DownloadResult = {
    filePath: string;
    fileName: string;
};

export async function downloadMedia({
    url,
    type,
    quality,
    title,
}: DownloadOptions): Promise<DownloadResult> {
    const id = randomUUID();

    const safeTitle =
        sanitizeFileName(title || "media") || "media";

    if (type === "audio") {
        const filePath = await enqueueDownload(() =>
            downloadAudio(id, url, quality)
        );

        return {
            filePath,
            fileName: `${safeTitle}.mp3`,
        };
    }

    const filePath = await enqueueDownload(() =>
        downloadVideo(id, url, quality)
    );

    return {
        filePath,
        fileName: `${safeTitle}.mp4`,
    };
}

export async function removeDownloadedFile(
    filePath: string
): Promise<void> {
    await fs.rm(filePath, { force: true });
}