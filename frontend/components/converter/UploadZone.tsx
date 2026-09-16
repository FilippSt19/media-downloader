"use client";

import { Upload } from "lucide-react";

type UploadZoneProps = {
    file: File | null;
    onFileSelect: (file: File | null) => void;
};

export default function UploadZone({
    file,
    onFileSelect,
}: UploadZoneProps) {
    return (
        <label
            className="
                flex cursor-pointer flex-col items-center justify-center
                rounded-2xl border border-dashed border-white/10
                bg-white/[0.02]
                px-8 py-16
                transition-all duration-300
                hover:border-white/20
                hover:bg-white/[0.04]
            "
        >
            <input
                type="file"
                className="hidden"
                onChange={(event) =>
                    onFileSelect(
                        event.target.files?.[0] ?? null
                    )
                }
            />

            <Upload
                className="mb-6 h-10 w-10 text-zinc-500"
                strokeWidth={1.5}
            />

            <h2 className="text-xl font-semibold text-white">
                {file
                    ? file.name
                    : "Drop a media file"}
            </h2>

            <p className="mt-2 text-zinc-500">
                or browse your computer
            </p>
        </label>
    );
}