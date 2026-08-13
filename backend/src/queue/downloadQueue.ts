type Job<T> = () => Promise<T>;

export class DownloadQueue {
    private running = 0;
    private readonly queue: (() => void)[] = [];

    constructor(
        private readonly concurrency = 2
    ) {}

    async add<T>(job: Job<T>): Promise<T> {
        if (this.running >= this.concurrency) {
            await new Promise<void>((resolve) => {
                this.queue.push(resolve);
            });
        }

        this.running++;

        try {
            return await job();
        } finally {
            this.running--;

            const next = this.queue.shift();

            if (next) {
                next();
            }
        }
    }
}