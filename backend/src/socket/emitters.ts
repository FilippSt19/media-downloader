import { getSocket } from "./index.js";
import { SocketEvents } from "./events.js";

export function emitDownloadProgress(
    downloadId: string,
    progress: number
): void {
    getSocket().emit(SocketEvents.DOWNLOAD_PROGRESS, {
        downloadId,
        progress,
    });
}