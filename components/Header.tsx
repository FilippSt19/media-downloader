export default function Header() {
  return (
    <header className="border-b border-white/10">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-5">
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-white font-bold text-black">
            M
          </div>

          <span className="text-lg font-semibold">
            Media Downloader
          </span>
        </div>

        <span className="hidden text-sm text-zinc-500 sm:block">
          YouTube · Instagram · TikTok
        </span>
      </div>
    </header>
  );
}