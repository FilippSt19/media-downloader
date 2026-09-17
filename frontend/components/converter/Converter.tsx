"use client";

import { useState } from "react";
import {
    FileText,
    Image as ImageIcon,
    Music,
    Video,
} from "lucide-react";

import Hero from "@/components/shared/Hero";
import FeatureCard from "@/components/shared/FeatureCard";

import UploadZone from "./UploadZone";
import ConversionPreview from "./ConversionPreview";
import FormatSelector from "./FormatSelector";
import ConvertButton from "./ConvertButton";

type ConversionCategory = "video" | "photo" | "document" | "audio";

const categories: {
    id: ConversionCategory;
    label: string;
    icon: typeof Video;
    accept: string;
    formats: string[];
    uploadLabel: string;
    uploadDescription: string;
}[] = [
    {
        id: "video",
        label: "Video",
        icon: Video,
        accept: "video/*",
        formats: ["MP4", "MOV", "WEBM", "AVI", "MKV"],
        uploadLabel: "Drop a video file",
        uploadDescription: "MP4, MOV, WEBM, AVI or MKV",
    },
    {
        id: "photo",
        label: "Photo",
        icon: ImageIcon,
        accept: "image/*",
        formats: ["JPG", "PNG", "WEBP", "GIF", "AVIF"],
        uploadLabel: "Drop a photo",
        uploadDescription: "JPG, PNG, WEBP, GIF or AVIF",
    },
    {
        id: "document",
        label: "Document",
        icon: FileText,
        accept: ".pdf,.doc,.docx,.txt,.rtf",
        formats: ["PDF", "DOCX", "TXT", "RTF"],
        uploadLabel: "Drop a document",
        uploadDescription: "PDF, DOC, DOCX, TXT or RTF",
    },
    {
        id: "audio",
        label: "Audio",
        icon: Music,
        accept: "audio/*",
        formats: ["MP3", "WAV", "AAC", "FLAC", "OGG"],
        uploadLabel: "Drop an audio file",
        uploadDescription: "MP3, WAV, AAC, FLAC or OGG",
    },
];

export default function Converter() {
    const [category, setCategory] =
        useState<ConversionCategory>("video");
    const [file, setFile] = useState<File | null>(null);
    const [format, setFormat] = useState("MP4");
    const [loading] =
        useState(false);

    const selectedCategory = categories.find(
        (item) => item.id === category
    ) ?? categories[0];

    function handleCategoryChange(nextCategory: ConversionCategory) {
        const next = categories.find(
            (item) => item.id === nextCategory
        ) ?? categories[0];

        setCategory(nextCategory);
        setFile(null);
        setFormat(next.formats[0]);
    }

    function handleConvert() {
        console.log(file);
        console.log(format);
    }

    return (
        <section className="mx-auto flex w-full max-w-3xl flex-1 flex-col justify-center px-6 py-20">

            <Hero
                title="Convert media."
                subtitle="Your way."
                description="Upload a media file, choose the output format and convert it in seconds."
            />

            <FeatureCard>

                <div
                    className="grid grid-cols-2 gap-2 rounded-2xl border border-white/10 bg-black/20 p-2 sm:grid-cols-4"
                    role="tablist"
                    aria-label="Conversion type"
                >
                    {categories.map((item) => {
                        const Icon = item.icon;
                        const active = item.id === category;

                        return (
                            <button
                                key={item.id}
                                type="button"
                                role="tab"
                                aria-selected={active}
                                onClick={() =>
                                    handleCategoryChange(item.id)
                                }
                                className={`flex min-h-12 items-center justify-center gap-2 rounded-xl px-3 py-3 text-sm font-medium transition ${
                                    active
                                        ? "bg-white text-black"
                                        : "text-zinc-400 hover:bg-white/[0.06] hover:text-white"
                                }`}
                            >
                                <Icon className="h-4 w-4" />
                                {item.label}
                            </button>
                        );
                    })}
                </div>

                <UploadZone
                    file={file}
                    onFileSelect={setFile}
                    accept={selectedCategory.accept}
                    label={selectedCategory.uploadLabel}
                    description={selectedCategory.uploadDescription}
                />

                <ConversionPreview
                    file={file}
                />

                {file && (
                    <>
                        <FormatSelector
                            value={format}
                            onChange={setFormat}
                            formats={selectedCategory.formats}
                        />

                        <ConvertButton
                            disabled={!file}
                            loading={loading}
                            onClick={handleConvert}
                        />
                    </>
                )}

            </FeatureCard>

        </section>
    );
}