type PlatformBadgeProps = {
  name: string;
};

export default function PlatformBadge({
  name,
}: PlatformBadgeProps) {
  return (
    <span className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-zinc-400">
      {name}
    </span>
  );
}