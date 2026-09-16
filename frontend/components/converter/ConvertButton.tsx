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
        mt-10 flex cursor-pointer flex-col items-center justify-center
        rounded-3xl border border-dashed border-white/10
        bg-white/[0.03]
        px-8 py-14
        transition-all duration-300
        hover:border-blue-500/40
        hover:bg-white/[0.05]
      "
    >
      <input
        type="file"
        className="hidden"
        onChange={(e) =>
          onFileSelect(e.target.files?.[0] ?? null)
        }
      />

      <div className="flex h-20 w-20 items-center justify-center rounded-full bg-blue-500/10">
        <Upload className="h-10 w-10 text-blue-400" />
      </div>

      <h2 className="mt-6 text-xl font-semibold">
        {file ? file.name : "Drag & Drop files"}
      </h2>

      <p className="mt-2 text-zinc-500">
        or browse your computer
      </p>

      <p className="mt-6 text-center text-sm text-zinc-600">
        Supports MP4, MOV, WEBM,
        <br />
        MP3, WAV, JPG, PNG...
      </p>
    </label>
  );
}