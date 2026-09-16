type FormatSelectorProps = {
    value: string;
    onChange: (format: string) => void;
};

const formats = [
    "MP3",
    "WAV",
    "MP4",
    "MOV",
    "WEBM",
    "GIF",
];

export default function FormatSelector({
    value,
    onChange,
}: FormatSelectorProps) {
    return (
        <div className="mt-6">
            <label className="mb-3 block text-sm font-medium text-zinc-400">
                Convert to
            </label>

            <select
                value={value}
                onChange={(event) =>
                    onChange(event.target.value)
                }
                className="
                    w-full rounded-xl
                    border border-white/10
                    bg-white/[0.03]
                    px-4 py-3
                    text-white
                    outline-none
                    transition
                    hover:border-white/20
                    focus:border-blue-500/40
                "
            >
                {formats.map((format) => (
                    <option
                        key={format}
                        value={format}
                        className="bg-zinc-900"
                    >
                        {format}
                    </option>
                ))}
            </select>
        </div>
    );
}