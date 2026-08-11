import { execFile } from "node:child_process";
import { promisify } from "node:util";

const execFileAsync = promisify(execFile);

export type YouTubeMetadata = {
  title: string;
  thumbnail: string | null;
  duration: number | null;
  uploader: string | null;
};

type YtDlpOutput = {
  title?: string;
  thumbnail?: string;
  duration?: number;
  uploader?: string;
};

export async function getYouTubeMetadata(
  url: string
): Promise<YouTubeMetadata> {
  const { stdout } = await execFileAsync(
    "yt-dlp",
    ["--dump-single-json", "--skip-download", "--no-playlist", url],
    {
      maxBuffer: 10 * 1024 * 1024,
    }
  );

  const data = JSON.parse(stdout) as YtDlpOutput;

  return {
    title: data.title ?? "Unknown title",
    thumbnail: data.thumbnail ?? null,
    duration: data.duration ?? null,
    uploader: data.uploader ?? null,
  };
}