import { getYouTubeCookiesArgs } from "./cookies.js";

export async function buildMetadataArgs(
    url: string,
    platform: "youtube" | "instagram" | "tiktok"
): Promise<string[]> {
    const args: string[] = [];

    if (platform === "youtube") {
        args.push(
            "--js-runtimes",
            "node"
        );

        args.push(
            ...await getYouTubeCookiesArgs()
        );
    }

    args.push(
        "--dump-single-json",
        "--skip-download",
        "--no-playlist",
        url
    );

    return args;
}

export async function buildVideoArgs(
    url: string,
    output: string,
    quality: number,
    platform: "youtube" | "instagram" | "tiktok"
): Promise<string[]> {
    const args: string[] = [];

    if (platform === "youtube") {
        args.push(
            "--js-runtimes",
            "node"
        );

        args.push(
            ...await getYouTubeCookiesArgs()
        );

        args.push(
            "--no-playlist",
            "-f",
            `bestvideo[height<=${quality}]+bestaudio/best[height<=${quality}]`,
            "--merge-output-format",
            "mp4"
        );
    } else {
        args.push(
            "--no-playlist",
            "-f",
            `best[height<=${quality}]/best`
        );
    }

    args.push(
        "-o",
        output,
        url
    );

    return args;
}

export async function buildAudioArgs(
    url: string,
    output: string,
    quality: number,
    platform: "youtube" | "instagram" | "tiktok"
): Promise<string[]> {
    const args: string[] = [];

    if (platform === "youtube") {
        args.push(
            "--js-runtimes",
            "node"
        );

        args.push(...await getYouTubeCookiesArgs());
    }

    args.push(
        "--no-playlist",
        "-x",
        "--audio-format",
        "mp3",
        "--audio-quality",
        `${quality}K`,
        "-o",
        output,
        url
    );

    return args;
}