"use client";

import { useState } from "react";

import PlatformBadge from "./PlatformBadge";
import UrlInput from "./UrlInput";

export default function Downloader() {
  const [url, setUrl] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleAnalyze = async () => {
    if (!url.trim()) {
      return;
    }

    setIsLoading(true);

    try {
      console.log("Analyzing:", url);

      // Temporary simulation.
      // We will replace this with our backend API.
      await new Promise((resolve) => setTimeout(resolve, 800));
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

      <div className="mt-10 rounded-2xl border border-white/10 bg-white/[0.03] p-3 shadow-2xl shadow-black/20">
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
    </section>
  );
}