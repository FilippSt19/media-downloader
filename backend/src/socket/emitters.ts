import { getSocket } from "./index.js";
import { SocketEvents } from "./events.js";

export function emitDownloadStarted(status = "Starting"): void {
    getSocket().emit(SocketEvents.DOWNLOAD_STARTED, {
        progress: 0,
        status,
    });
}

export function emitDownloadProgress(
    progress: number,
    status: string
): void {
    getSocket().emit(SocketEvents.DOWNLOAD_PROGRESS, {
        progress,
        status,
    });
}

export function emitDownloadCompleted(): void {
    getSocket().emit(SocketEvents.DOWNLOAD_COMPLETED, {
        progress: 100,
        status: "Finished",
    });
}

export function emitDownloadFailed(message: string): void {
    getSocket().emit(SocketEvents.DOWNLOAD_FAILED, {
        message,
    });
}