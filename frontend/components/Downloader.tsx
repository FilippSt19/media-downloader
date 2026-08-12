"use client";

import { useState } from "react";
import { API } from "@/config/api";

import PlatformBadge from "./PlatformBadge";
import UrlInput from "./UrlInput";
import MediaPreview from "./MediaPreview";

type AnalyzeResult = {
  success: boolean;
  platform?: "youtube" | "instagram" | "tiktok";
  url?: string;
  media?: {
    title: string;
    thumbnail: string | null;
    duration: number | null;
    uploader: string | null;
    formats: {
      video: {
        quality: string;
        height: number;
      }[];
      audio: {
        quality: string;
        bitrate: number;
      }[];
    };
  } | null;
  error?: string;
};

export default function Downloader() {
  const [url, setUrl] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<AnalyzeResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleAnalyze = async () => {
    if (!url.trim()) {
      return;
    }

    setIsLoading(true);
    setError(null);
    setResult(null);

    try {
      const response = await fetch(
        `${API.BASE_URL}/api/media/analyze`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            url: url.trim(),
          }),
        }
      );

      const data: AnalyzeResult = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Unable to analyze this URL.");
      }

      setResult(data);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Something went wrong."
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="mx-auto flex w-full max-w-3xl flex-1 flex-col justify-center px-6 py-20">
      <div className="text-center">
        <p className="mb-4 text-sm font-medium uppercase tracking-[0.25em] text-zinc-500">
          Simple. Fast. Flexible.
        </p>

        <h1 className="text-4xl font-bold tracking-tight sm:text-6xl">
          Download media.
          <span className="block text-zinc-500">
            Your way.
          </span>
        </h1>

        <p className="mx-auto mt-6 max-w-xl text-base leading-7 text-zinc-400 sm:text-lg">
          Paste a media link, choose your format and quality, and download
          the file you need.
        </p>
      </div>

      <div className="mt-10 rounded-2xl border border-white/10 bg-white/[0.03] p-3">
        <UrlInput
          url={url}
          onUrlChange={setUrl}
          onAnalyze={handleAnalyze}
          isLoading={isLoading}
        />
      </div>

      <div className="mt-6 flex flex-wrap justify-center gap-3">
        <PlatformBadge name="YouTube" />
        <PlatformBadge name="Instagram" />
        <PlatformBadge name="TikTok" />
      </div>

      {result?.platform && result.media && (
        <MediaPreview
          url={result.url!}
          title={result.media.title}
          thumbnail={result.media.thumbnail}
          duration={result.media.duration}
          uploader={result.media.uploader}
          platform={result.platform}
          formats={result.media.formats}
        />
      )}

      {error && (
        <div className="mt-8 rounded-xl border border-red-500/20 bg-red-500/5 p-4 text-center">
          <p className="text-sm text-red-400">
            {error}
          </p>
        </div>
      )}
    </section>
  );
}