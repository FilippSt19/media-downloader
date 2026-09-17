"use client";

import { useState } from "react";
import {
    Check,
    Download,
    FileText,
    Image as ImageIcon,
    Music,
    Plus,
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
    const [loading, setLoading] = useState(false);
    const [convertedFile, setConvertedFile] =
        useState<{ name: string; url: string } | null>(null);
    const [downloaded, setDownloaded] = useState(false);

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
        setConvertedFile(null);
        setDownloaded(false);
    }

    function resetConverter() {
        if (convertedFile) {
            URL.revokeObjectURL(convertedFile.url);
        }

        setFile(null);
        setConvertedFile(null);
        setDownloaded(false);
    }

    function getConvertedFileName(fileName: string) {
        const baseName = fileName.replace(/\.[^/.]+$/, "");
        return `${baseName}.${format.toLowerCase()}`;
    }

    async function handleConvert() {
        if (!file) {
            return;
        }

        setLoading(true);
        setDownloaded(false);

        await new Promise((resolve) => setTimeout(resolve, 800));

        const url = URL.createObjectURL(file);
        setConvertedFile({
            name: getConvertedFileName(file.name),
            url,
        });
        setLoading(false);
    }

    function handleDownload() {
        if (!convertedFile) {
            return;
        }

        const anchor = document.createElement("a");
        anchor.href = convertedFile.url;
        anchor.download = convertedFile.name;
        anchor.click();
        setDownloaded(true);
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

                {convertedFile ? (
                    <div className="mt-6 rounded-2xl border border-emerald-400/20 bg-emerald-400/[0.06] p-6 text-center">
                        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-emerald-400/15 text-emerald-300">
                            <Check className="h-7 w-7" />
                        </div>

                        <h2 className="mt-5 text-2xl font-semibold text-white">
                            Conversion completed
                        </h2>

                        <p className="mt-2 break-words text-sm text-zinc-400">
                            {convertedFile.name} is ready to download.
                        </p>

                        {downloaded && (
                            <p className="mt-3 text-sm font-medium text-emerald-300">
                                Download completed
                            </p>
                        )}

                        <div className="mt-6 grid gap-3 sm:grid-cols-2">
                            <button
                                type="button"
                                onClick={handleDownload}
                                className="flex min-h-12 items-center justify-center gap-2 rounded-xl bg-white px-5 py-3 font-semibold text-black transition hover:bg-zinc-200"
                            >
                                <Download className="h-4 w-4" />
                                Download file
                            </button>

                            <button
                                type="button"
                                onClick={resetConverter}
                                className="flex min-h-12 items-center justify-center gap-2 rounded-xl border border-white/10 px-5 py-3 font-semibold text-white transition hover:bg-white/[0.06]"
                            >
                                <Plus className="h-4 w-4" />
                                Convert another file
                            </button>
                        </div>
                    </div>
                ) : (
                    <>
                        <UploadZone
                            file={file}
                            onFileSelect={setFile}
                            accept={selectedCategory.accept}
                            label={selectedCategory.uploadLabel}
                            description={selectedCategory.uploadDescription}
                        />

                        <ConversionPreview file={file} />

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
                    </>
                )}

            </FeatureCard>

        </section>
    );
}