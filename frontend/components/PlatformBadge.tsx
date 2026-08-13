import Image from "next/image";

type PlatformBadgeProps = {
  name: "YouTube" | "Instagram" | "TikTok";
};

const PLATFORM_ICONS = {
  YouTube: "/icons/youtube.png",
  Instagram: "/icons/instagram.svg",
  TikTok: "/icons/tiktok.svg",
};

export default function PlatformBadge({
  name,
}: PlatformBadgeProps) {
  return (
    <div className="flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 transition-colors hover:bg-white/10">
      <Image
        src={PLATFORM_ICONS[name]}
        alt={name}
        width={18}
        height={18}
        className="h-[18px] w-[18px]"
      />

      <span className="text-sm font-medium text-zinc-300">
        {name}
      </span>
    </div>
  );
}