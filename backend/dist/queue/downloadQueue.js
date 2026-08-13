"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DownloadQueue = void 0;
class DownloadQueue {
    concurrency;
    running = 0;
    queue = [];
    constructor(concurrency = 2) {
        this.concurrency = concurrency;
    }
    async add(job) {
        if (this.running >= this.concurrency) {
            await new Promise((resolve) => {
                this.queue.push(resolve);
            });
        }
        this.running++;
        try {
            return await job();
        }
        finally {
            this.running--;
            const next = this.queue.shift();
            if (next) {
                next();
            }
        }
    }
}
exports.DownloadQueue = DownloadQueue;
