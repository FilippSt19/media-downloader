export function parseProgress(line: string): number | null {
    const match = line.match(/\[download\]\s+(\d+(?:\.\d+)?)%/);

    if (!match) {
        return null;
    }

    return Math.floor(Number(match[1]));
}