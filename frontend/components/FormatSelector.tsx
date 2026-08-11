"use client";

import { useEffect, useState } from "react";

type VideoFormat = {
  quality: string;
  height: number;
};

type AudioFormat = {
  quality: string;
  bitrate: number;
};

type FormatSelectorProps = {
  videoFormats: VideoFormat[];
  audioFormats: AudioFormat[];
};

type MediaType = "video" | "audio";

export default function FormatSelector({
  videoFormats,
  audioFormats,
}: FormatSelectorProps) {
  const [mediaType, setMediaType] = useState<MediaType>("video");
  const [quality, setQuality] = useState("");

  useEffect(() => {
    if (mediaType === "video") {
      setQuality(videoFormats[0]?.height.toString() ?? "");
    } else {
      setQuality(audioFormats[1]?.bitrate.toString() ?? "");
    }
  }, [mediaType, videoFormats, audioFormats]);

  const handleDownload = () => {
    console.log({
      mediaType,
      quality,
    });
  };

  return (
    <div className="border-t border-white/10 p-5">
      <div className="grid grid-cols-2 gap-2 rounded-xl bg-black/30 p-1">
        <button
          type="button"
          onClick={() => setMediaType("video")}
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
          onClick={() => setMediaType("audio")}
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
        disabled={!quality}
        className="mt-5 w-full rounded-xl bg-white px-5 py-3 font-semibold text-black transition hover:bg-zinc-200 disabled:cursor-not-allowed disabled:opacity-40"
      >
        Download {mediaType === "video" ? "MP4" : "MP3"}
      </button>
    </div>
  );
}