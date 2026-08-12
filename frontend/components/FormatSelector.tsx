"use client";

import { useState } from "react";
import { API } from "@/config/api";
import { useDownloadProgress } from "@/hooks/useDownloadProgress";

type VideoFormat = {
  quality: string;
  height: number;
};

type AudioFormat = {
  quality: string;
  bitrate: number;
};

type FormatSelectorProps = {
  url: string;
  title: string;
  videoFormats: VideoFormat[];
  audioFormats: AudioFormat[];
};

type MediaType = "video" | "audio";

export default function FormatSelector({
  url,
  title,
  videoFormats,
  audioFormats,
}: FormatSelectorProps) {
  const [mediaType, setMediaType] = useState<MediaType>("video");
  const [quality, setQuality] = useState(
    videoFormats[0]?.height.toString() ?? ""
  );
  const [isDownloading, setIsDownloading] = useState(false);
  const [error, setError] = useState("");
  const { progress, status } = useDownloadProgress();

  const selectVideo = () => {
    setMediaType("video");
    setQuality(videoFormats[0]?.height.toString() ?? "");
  };

  const selectAudio = () => {
    setMediaType("audio");

    const defaultAudio =
      audioFormats.find((format) => format.bitrate === 192) ??
      audioFormats[0];

    setQuality(defaultAudio?.bitrate.toString() ?? "");
  };

  const handleDownload = async () => {
    setError("");
    setIsDownloading(true);
    try {
      console.log({
        url,
        title,
        type: mediaType,
        quality: Number(quality),
      });
      const response = await fetch(`${API.BASE_URL}/api/media/download`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          url,
          title,
          type: mediaType,
          quality: Number(quality),
        }),
      });
      if (!response.ok) {
        const data = await response.json().catch(() => null);

        throw new Error(
          data?.error || `Download failed (${response.status})`
        );
      }
      
      const contentDisposition = response.headers.get("content-disposition");

      let fileName =
        mediaType === "video" ? `${title}.mp4` : `${title}.mp3`;

      const match = contentDisposition?.match(
        /filename\*?=(?:UTF-8''|")?([^";]+)/
      );

      if (match?.[1]) {
        fileName = decodeURIComponent(
          match[1].replace(/"/g, "")
        );
      }

      const blob = await response.blob();
      const anchor = document.createElement("a");
      anchor.href = URL.createObjectURL(blob);
      anchor.download = fileName;
      anchor.click();
      URL.revokeObjectURL(anchor.href);

      console.log("Download started");
    } catch (error) {
      setError(
        error instanceof Error
          ? error.message
          : "Unable to download media."
      );
    } finally {
      setIsDownloading(false);
    }
  };

  return (
    <div className="border-t border-white/10 p-5">
      <div className="grid grid-cols-2 gap-2 rounded-xl bg-black/30 p-1">
        <button
          type="button"
          onClick={selectVideo}
          className={`rounded-lg px-4 py-3 text-sm font-medium transition ${
            mediaType === "video"
              ? "bg-white text-black"
              : "text-zinc-400 hover:text-white"
          }`}
        >
          Video MP4
        </button>

        <button
          type="button"
          onClick={selectAudio}
          className={`rounded-lg px-4 py-3 text-sm font-medium transition ${
            mediaType === "audio"
              ? "bg-white text-black"
              : "text-zinc-400 hover:text-white"
          }`}
        >
          Audio MP3
        </button>
      </div>

      <div className="mt-5">
        <label
          htmlFor="quality"
          className="mb-2 block text-sm font-medium text-zinc-400"
        >
          Quality
        </label>

        <select
          id="quality"
          value={quality}
          onChange={(event) => setQuality(event.target.value)}
          className="w-full rounded-xl border border-white/10 bg-zinc-900 px-4 py-3 text-white outline-none focus:border-white/30"
        >
          {mediaType === "video"
            ? videoFormats.map((format) => (
                <option
                  key={format.height}
                  value={format.height}
                >
                  {format.quality}
                </option>
              ))
            : audioFormats.map((format) => (
                <option
                  key={format.bitrate}
                  value={format.bitrate}
                >
                  {format.quality}
                </option>
              ))}
        </select>
      </div>

      <button
        type="button"
        onClick={handleDownload}
        disabled={!quality || isDownloading}
        className="mt-5 w-full rounded-xl bg-white px-5 py-3 font-semibold text-black transition hover:bg-zinc-200 disabled:cursor-not-allowed disabled:opacity-40"
      >
        {isDownloading ? "Downloading..." : `Download ${mediaType === "video" ? "MP4" : "MP3"}`}
      </button>

      {error && (
        <div className="mt-3 rounded-lg bg-red-500/20 px-4 py-3 text-sm text-red-400 border border-red-500/30">
          {error}
        </div>
      )}

      {progress > 0 && (
        <div className="mt-4">
          <div className="h-2 overflow-hidden rounded-full bg-zinc-800">
            <div
              className="h-full bg-green-500 transition-all"
              style={{
                width: `${progress}%`,
              }}
            />
          </div>

          <p className="mt-2 text-center text-sm text-zinc-400">
            {status}
          </p>
        </div>
      )}
    </div>
  );
}