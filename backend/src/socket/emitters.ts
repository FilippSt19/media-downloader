import { getSocket } from "./index.js";
import { SocketEvents } from "./events.js";

export function emitDownloadStarted(): void {
    getSocket().emit(SocketEvents.DOWNLOAD_STARTED);
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
    getSocket().emit(SocketEvents.DOWNLOAD_COMPLETED);
}

export function emitDownloadFailed(message: string): void {
    getSocket().emit(SocketEvents.DOWNLOAD_FAILED, {
        message,
    });
}