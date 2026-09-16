import Image from "next/image";

export default function Header() {
  return (
    <header className="border-b border-white/10">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-5">
        <div className="flex items-center gap-3">
          <Image
            src="/media_logo.svg"
            alt="Media Downloader logo"
            width={36}
            height={36}
            className="h-9 w-9 rounded-xl"
          />

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
