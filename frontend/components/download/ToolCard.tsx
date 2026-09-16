import Link from "next/link";
import type { LucideIcon } from "lucide-react";

type ToolCardProps = {
  title: string;
  description: string;
  href?: string;
  icon: LucideIcon;
  status?: "ready" | "coming-soon";
  accent: "blue" | "purple" | "pink" | "green" | "orange";
};

const accentClasses = {
  blue: {
    icon: "text-blue-400",
    background: "bg-blue-500/10",
    border: "border-blue-500/30",
    glow: "hover:shadow-[0_0_45px_rgba(59,130,246,0.12)]",
  },

  purple: {
    icon: "text-purple-400",
    background: "bg-purple-500/10",
    border: "border-purple-500/30",
    glow: "hover:shadow-[0_0_45px_rgba(168,85,247,0.12)]",
  },

  pink: {
    icon: "text-pink-400",
    background: "bg-pink-500/10",
    border: "border-pink-500/30",
    glow: "hover:shadow-[0_0_45px_rgba(236,72,153,0.12)]",
  },

  green: {
    icon: "text-emerald-400",
    background: "bg-emerald-500/10",
    border: "border-emerald-500/30",
    glow: "hover:shadow-[0_0_45px_rgba(16,185,129,0.12)]",
  },

  orange: {
    icon: "text-amber-400",
    background: "bg-amber-500/10",
    border: "border-amber-500/30",
    glow: "hover:shadow-[0_0_45px_rgba(245,158,11,0.12)]",
  },
};

export default function ToolCard({
  title,
  description,
  href,
  icon: Icon,
  status = "coming-soon",
  accent,
}: ToolCardProps) {
  const colors = accentClasses[accent];
  const isReady = status === "ready";

  const content = (
    <article
      className={`
        group flex h-full flex-col rounded-3xl
        border border-white/10 bg-white/[0.025] p-6
        transition-all duration-300
        hover:-translate-y-2 hover:scale-[1.015] hover:border-white/20
        active:scale-[0.985]
        ${colors.glow}
      `}
    >
      <div className="flex items-start justify-between gap-4">
        <div
          className={`
            flex h-14 w-14 items-center justify-center
            rounded-2xl border
            ${colors.background}
            ${colors.border}
          `}
        >
          <Icon
            className={`h-7 w-7 ${colors.icon}`}
            strokeWidth={2}
          />
        </div>

        {isReady ? (
          <span className="rounded-full border border-emerald-500/20 bg-emerald-500/10 px-3 py-1 text-xs font-medium text-emerald-400">
            ✓ Ready
          </span>
        ) : (
          <span className="rounded-full border border-white/5 bg-white/[0.05] px-3 py-1 text-xs text-zinc-400">
            Coming Soon
          </span>
        )}
      </div>

      <div className="mt-6 flex-1">
        <h2 className="text-2xl font-bold tracking-tight text-white">
          {title}
        </h2>

        <p className="mt-3 max-w-sm text-sm leading-6 text-zinc-400 sm:text-base">
          {description}
        </p>
      </div>

      <div
        className={`
          mt-7 flex h-14 items-center justify-center rounded-xl
          border text-sm font-semibold transition
          ${
            isReady
              ? "border-white bg-white text-black group-hover:bg-zinc-200"
              : "border-white/5 bg-white/[0.05] text-zinc-500"
          }
        `}
      >
        {isReady ? "Open →" : "Coming Soon"}
      </div>
    </article>
  );

  if (isReady && href) {
    return (
      <Link
        href={href}
        className="block h-full cursor-pointer"
      >
        {content}
      </Link>
    );
  }

  return content;
}