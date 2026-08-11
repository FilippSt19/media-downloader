import FormatSelector from "./FormatSelector";

type MediaPreviewProps = {
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

  return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`;
}

export default function MediaPreview({
  title,
  thumbnail,
  duration,
  uploader,
  platform,
  formats,
}: MediaPreviewProps) {
  return (
    <div className="mt-8 overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03]">
      <div className="flex flex-col gap-5 p-5 sm:flex-row">
        {thumbnail && (
          <img
            src={thumbnail}
            alt={title}
            className="aspect-video w-full rounded-xl object-cover sm:w-64"
          />
        )}

        <div className="flex min-w-0 flex-1 flex-col justify-center">
          <span className="mb-2 text-xs font-medium uppercase tracking-wider text-zinc-500">
            {platform}
          </span>

          <h2 className="text-xl font-semibold text-white">
            {title}
          </h2>

          <div className="mt-3 flex flex-wrap gap-x-4 gap-y-2 text-sm text-zinc-400">
            {uploader && <span>{uploader}</span>}
            <span>{formatDuration(duration)}</span>
          </div>
        </div>
      </div>
        <FormatSelector
            videoFormats={formats.video}    
        audioFormats={formats.audio}

        />
    </div>
  );
}