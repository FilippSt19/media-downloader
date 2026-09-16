"use client";

import { useState } from "react";
import { API } from "@/config/api";
import { useDownloadProgress } from "@/hooks/useDownloadProgress";
import { toast } from "sonner";

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
    toast.dismiss();
    setIsDownloading(true);
    toast.info("Download started");
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

      toast.success("Download completed");
    } catch (error) {
      const message =
        error instanceof Error
          ? error.message
          : "Unable to download media.";
      setError(message);
      toast.error(message);
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
        <p className="mb-3 text-sm font-medium text-zinc-400">
          Quality
        </p>

        <div className="flex flex-wrap gap-2">
          {mediaType === "video"
            ? videoFormats.map((format) => (
                <button
                  key={format.height}
                  type="button"
                  onClick={() => setQuality(format.height.toString())}
                  className={`rounded-xl border px-4 py-2 text-sm font-medium transition ${
                    quality === format.height.toString()
                      ? "border-white bg-white text-black"
                      : "border-white/10 bg-zinc-900 text-zinc-300 hover:border-white/30"
                  }`}
                >
                  {format.quality}
                </button>
              ))
            : audioFormats.map((format) => (
                <button
                  key={format.bitrate}
                  type="button"
                  onClick={() => setQuality(format.bitrate.toString())}
                  className={`rounded-xl border px-4 py-2 text-sm font-medium transition ${
                    quality === format.bitrate.toString()
                      ? "border-white bg-white text-black"
                      : "border-white/10 bg-zinc-900 text-zinc-300 hover:border-white/30"
                  }`}
                >
                  {format.quality}
                </button>
              ))}
        </div>
      </div>

      <button
        type="button"
        onClick={handleDownload}
        disabled={!quality || isDownloading}
        className="mt-5 w-full rounded-xl bg-white px-5 py-3 font-semibold text-black transition hover:bg-zinc-200 disabled:cursor-not-allowed disabled:opacity-40"
      >
        {isDownloading ? "Downloading..." : `Download ${mediaType === "video" ? "MP4" : "MP3"}`}
      </button>

      {progress > 0 && (
        <div className="mt-5 rounded-xl border border-white/10 bg-white/5 p-4">
          <div className="mb-2 flex items-center justify-between">
            <span className="text-sm font-medium text-zinc-300">
              {status}
            </span>

            <span className="text-sm font-semibold text-white">
              {progress}%
            </span>
          </div>

          <div className="h-2 overflow-hidden rounded-full bg-zinc-800">
            <div
              className="h-full rounded-full bg-white transition-all duration-300"
              style={{
                width: `${progress}%`,
              }}
            />
          </div>

          {progress === 100 && (
            <p className="mt-3 text-center text-sm font-medium text-green-400">
              ✓ Download completed
            </p>
          )}
        </div>
      )}
    </div>
  );
}