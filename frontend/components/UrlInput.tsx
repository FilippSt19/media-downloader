type UrlInputProps = {
  url: string;
  onUrlChange: (url: string) => void;
  onAnalyze: () => void;
  onReset: () => void;
  isLoading: boolean;
};

export default function UrlInput({
  url,
  onUrlChange,
  onAnalyze,
  onReset,
  isLoading,
}: UrlInputProps) {
  return (
    <div className="flex flex-col gap-3">
      <input
        type="url"
        value={url}
        onChange={(event) =>
          onUrlChange(event.target.value)
        }
        onKeyDown={(event) => {
          if (event.key === "Enter" && url.trim()) {
            onAnalyze();
          }
        }}
        placeholder="Paste a YouTube, Instagram or TikTok URL..."
        className="min-w-0 rounded-xl border border-white/10 bg-white/5 px-5 py-4 text-white outline-none transition placeholder:text-zinc-600 focus:border-white/30"
      />

      <div className="grid grid-cols-2 gap-3">
        <button
          type="button"
          onClick={onAnalyze}
          disabled={!url.trim() || isLoading}
          className="rounded-xl bg-white px-7 py-4 font-semibold text-black transition hover:bg-zinc-200 disabled:cursor-not-allowed disabled:opacity-40"
        >
          {isLoading ? "Analyzing..." : "Analyze"}
        </button>

        <button
          type="button"
          onClick={onReset}
          className="rounded-xl border border-white/10 bg-white/5 px-7 py-4 font-semibold text-white transition hover:bg-white/10"
        >
          New Download
        </button>
      </div>
    </div>
  );
}