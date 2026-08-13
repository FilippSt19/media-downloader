import { randomUUID } from "node:crypto";

export function createDownloadId(): string {
    return randomUUID();
}

export function sanitizeFileName(value: string): string {
    return value
        .replace(/[<>:"/\\|?*\x00-\x1F]/g, "")
        .replace(/\s+/g, " ")
        .trim()
        .slice(0, 150);
}