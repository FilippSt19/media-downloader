"use client";

import { useState } from "react";

import Hero from "@/components/shared/Hero";
import FeatureCard from "@/components/shared/FeatureCard";

import UploadZone from "./UploadZone";
import ConversionPreview from "./ConversionPreview";
import FormatSelector from "./FormatSelector";
import ConvertButton from "./ConvertButton";

export default function Converter() {
    const [file, setFile] = useState<File | null>(null);

    const [format, setFormat] =
        useState("MP3");

    const [loading] =
        useState(false);

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

                <UploadZone
                    file={file}
                    onFileSelect={setFile}
                />

                <ConversionPreview
                    file={file}
                />

                {file && (
                    <>
                        <FormatSelector
                            value={format}
                            onChange={setFormat}
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