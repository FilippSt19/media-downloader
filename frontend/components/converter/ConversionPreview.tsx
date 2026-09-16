type ConversionPreviewProps = {
    file: File | null;
};

function formatSize(bytes: number) {
    if (bytes < 1024 * 1024) {
        return `${(bytes / 1024).toFixed(1)} KB`;
    }

    return `${(bytes / 1024 / 1024).toFixed(2)} MB`;
}

export default function ConversionPreview({
    file,
}: ConversionPreviewProps) {
    if (!file) {
        return null;
    }

    return (
        <div className="mt-6 rounded-2xl border border-white/10 bg-white/[0.03] p-5">
            <h3 className="text-lg font-semibold">
                {file.name}
            </h3>

            <div className="mt-3 space-y-1 text-sm text-zinc-400">
                <p>
                    Size: {formatSize(file.size)}
                </p>

                <p>
                    Type: {file.type || "Unknown"}
                </p>
            </div>
        </div>
    );
}