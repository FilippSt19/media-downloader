import Image from "next/image";
import FormatSelector from "./FormatSelector";

type MediaPreviewProps = {
  url: string;
  title: string;
  thumbnail: string | null;
  duration: number | null;
  uploader: string | null;
  platform: string;

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
};

function formatDuration(seconds: number | null) {
  if (seconds === null) return "Unknown duration";

  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = Math.floor(seconds % 60);

  return `${minutes}:${remainingSeconds
    .toString()
    .padStart(2, "0")}`;
}

const PLATFORM_ICONS: Record<string, string> = {
  youtube: "/icons/youtube.png",
  instagram: "/icons/instagram.svg",
  tiktok: "/icons/tiktok.png",
};

export default function MediaPreview({
  url,
  title,
  thumbnail,
  duration,
  uploader,
  platform,
  formats,
}: MediaPreviewProps) {
  return (
    <div className="mt-8 overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] shadow-lg">
      <div className="flex flex-col gap-6 p-6 sm:flex-row">
        {thumbnail && (
          <Image
            src={thumbnail}
            alt={title}
            width={640}
            height={360}
            className="aspect-video w-full rounded-xl border border-white/10 object-cover sm:w-72"
          />
        )}

        <div className="flex min-w-0 flex-1 flex-col justify-center">
          <div className="mb-3 flex items-center gap-2">
            <Image
              src={
                PLATFORM_ICONS[
                  platform.toLowerCase()
                ]
              }
              alt={platform}
              width={18}
              height={18}
            />

            <span className="text-xs font-medium uppercase tracking-wider text-zinc-500">
              {platform}
            </span>
          </div>

          <h2 className="text-2xl font-semibold leading-tight text-white">
            {title}
          </h2>

          <div className="mt-4 flex flex-wrap gap-3 text-sm text-zinc-400">
            {uploader && (
              <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1">
                 {uploader}
              </span>
            )}

            <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1">
               {formatDuration(duration)}
            </span>
          </div>
        </div>
      </div>

      <FormatSelector
        url={url}
        title={title}
        videoFormats={formats.video}
        audioFormats={formats.audio}
      />
    </div>
  );
}
