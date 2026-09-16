import Link from "next/link";
import {
  AudioLines,
  Download,
  ImageIcon,
  RefreshCw,
  Scissors,
  Settings,
  Sparkles,
} from "lucide-react";

import ToolCard from "@/components/download/ToolCard";

const tools = [
  {
    title: "Download",
    description:
      "Download videos from YouTube, Instagram and TikTok.",
    href: "/download",
    icon: Download,
    status: "ready" as const,
    accent: "blue" as const,
  },
  {
    title: "Convert",
    description:
      "Convert video, audio and images between popular formats.",
    icon: RefreshCw,
    accent: "purple" as const,
  },
  {
    title: "AI",
    description:
      "Generate automatic subtitles, translations and summaries.",
    icon: Sparkles,
    accent: "purple" as const,
  },
  {
    title: "Video Tools",
    description:
      "Trim, merge, resize and compress your videos.",
    icon: Scissors,
    accent: "pink" as const,
  },
  {
    title: "Image Tools",
    description:
      "Remove backgrounds, extract text and compress images.",
    icon: ImageIcon,
    accent: "green" as const,
  },
  {
    title: "Audio Tools",
    description:
      "Remove noise, normalize audio and enhance voices.",
    icon: AudioLines,
    accent: "orange" as const,
  },
];

export default function HomePage() {
  return (
    <main className="min-h-screen bg-[#08090b] text-white">
      <header className="border-b border-white/[0.06]">
        <div className="mx-auto flex h-20 w-full max-w-6xl items-center justify-between px-5 sm:px-8">
          <Link
            href="/"
            className="flex items-center gap-3 font-bold"
          >
            <img
              src="/media_logo.svg"
              alt="Media Studio"
              className="h-7 w-7"
            />

            <span className="text-lg">
              Media Studio
            </span>
          </Link>

          <nav className="hidden items-center gap-1 md:flex">
            <Link
              href="/"
              className="rounded-xl bg-white/[0.07] px-4 py-2 text-sm font-medium"
            >
              Home
            </Link>

            <Link
              href="/download"
              className="rounded-xl px-4 py-2 text-sm text-zinc-400 transition hover:bg-white/[0.05] hover:text-white"
            >
              Download
            </Link>

            <span className="rounded-xl px-4 py-2 text-sm text-zinc-600">
              Convert
            </span>

            <span className="rounded-xl px-4 py-2 text-sm text-zinc-600">
              AI
            </span>

            <span className="rounded-xl px-4 py-2 text-sm text-zinc-600">
              Video
            </span>

            <span className="rounded-xl px-4 py-2 text-sm text-zinc-600">
              Image
            </span>

            <span className="rounded-xl px-4 py-2 text-sm text-zinc-600">
              Audio
            </span>
          </nav>

          <button
            type="button"
            aria-label="Settings"
            className="flex h-10 w-10 items-center justify-center rounded-xl text-zinc-400 transition hover:bg-white/[0.06] hover:text-white"
          >
            <Settings className="h-5 w-5" />
          </button>
        </div>
      </header>

      <section className="mx-auto w-full max-w-6xl px-5 pb-20 pt-20 sm:px-8 sm:pt-28">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-xs font-medium uppercase tracking-[0.35em] text-zinc-500 sm:text-sm">
            Simple. Fast. Flexible.
          </p>

          <h1 className="mt-6 text-5xl font-bold tracking-tight sm:text-6xl lg:text-7xl">
            Media{" "}
            <span className="bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-400 bg-clip-text text-transparent">
              Studio
            </span>
          </h1>

          <h2 className="mt-5 text-2xl font-semibold tracking-tight text-zinc-400 sm:text-3xl">
            Download • Convert • Edit • AI
          </h2>

          <p className="mx-auto mt-6 max-w-2xl text-base leading-7 text-zinc-500 sm:text-lg">
            One place for downloading, converting,
            editing and enhancing media.
          </p>
        </div>

        <div className="mt-14 grid grid-cols-1 gap-5 md:grid-cols-2">
          {tools.map((tool) => (
            <ToolCard
              key={tool.title}
              {...tool}
            />
          ))}
        </div>
      </section>

      <footer className="border-t border-white/[0.05]">
        <div className="mx-auto flex w-full max-w-6xl flex-col gap-4 px-5 py-8 text-xs text-zinc-600 sm:flex-row sm:items-end sm:justify-between sm:px-8">
          <div>
            <p className="font-semibold text-zinc-400">
              Media Studio
            </p>

            <p className="mt-1">
              Built for creators.
            </p>
          </div>

          <div className="sm:text-right">
            <p>v1.0.0</p>
          </div>
        </div>
      </footer>
    </main>
  );
}