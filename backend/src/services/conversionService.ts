import fs from "node:fs/promises";
import path from "node:path";
import { execFile } from "node:child_process";
import { promisify } from "node:util";

import sharp from "sharp";

import { ENV } from "../config/environment.js";
import { AppError } from "../errors/AppError.js";

const execFileAsync = promisify(execFile);

const VIDEO_FORMATS = new Set(["mp4", "mov", "webm", "avi", "mkv"]);
const AUDIO_FORMATS = new Set(["mp3", "wav", "aac", "flac", "ogg"]);
const IMAGE_FORMATS = new Set(["jpg", "png", "webp", "svg", "avif"]);
const DOCUMENT_FORMATS = new Set(["pdf", "docx", "txt", "rtf"]);

export type ConversionCategory = "video" | "photo" | "document" | "audio";

type ConversionInput = {
    buffer: Buffer;
    originalName: string;
    category: ConversionCategory;
    format: string;
};

export type ConversionResult = {
    filePath: string;
    fileName: string;
};

function getExtension(fileName: string) {
    return path.extname(fileName).toLowerCase().replace(".", "");
}

function validateFormat(category: ConversionCategory, format: string) {
    const normalizedFormat = format.toLowerCase();
    const formats = category === "video"
        ? VIDEO_FORMATS
        : category === "audio"
            ? AUDIO_FORMATS
            : category === "photo"
                ? IMAGE_FORMATS
                : DOCUMENT_FORMATS;

    if (!formats.has(normalizedFormat)) {
        throw new AppError(400, `Unsupported ${category} output format.`);
    }

    return normalizedFormat;
}

async function runFfmpeg(inputPath: string, outputPath: string) {
    try {
        await execFileAsync("ffmpeg", [
            "-y",
            "-i",
            inputPath,
            outputPath,
        ]);
    } catch {
        throw new AppError(422, "Unable to convert this media file.");
    }
}

async function runLibreOffice(
    inputPath: string,
    outputPath: string,
    format: string
) {
    try {
        await execFileAsync("libreoffice", [
            "--headless",
            "--convert-to",
            format,
            "--outdir",
            path.dirname(outputPath),
            inputPath,
        ]);
    } catch {
        throw new AppError(422, "Unable to convert this document.");
    }

    const generatedPath = path.join(
        path.dirname(outputPath),
        `${path.basename(inputPath, path.extname(inputPath))}.${format}`
    );

    if (generatedPath !== outputPath) {
        await fs.rename(generatedPath, outputPath);
    }
}

export async function convertMedia({
    buffer,
    originalName,
    category,
    format,
}: ConversionInput): Promise<ConversionResult> {
    const normalizedFormat = validateFormat(category, format);
    const tempDir = await fs.mkdtemp(
        path.resolve(ENV.TEMP_DIR, "conversion-")
    );
    const baseName = path.basename(originalName, path.extname(originalName));
    const inputExtension = getExtension(originalName) || "bin";
    const inputPath = path.join(tempDir, `${baseName}.${inputExtension}`);
    const outputPath = path.join(tempDir, `${baseName}.${normalizedFormat}`);

    await fs.writeFile(inputPath, buffer);

    try {
        if (category === "photo") {
            const image = sharp(inputPath);

            if (normalizedFormat === "jpg") await image.jpeg().toFile(outputPath);
            if (normalizedFormat === "png") await image.png().toFile(outputPath);
            if (normalizedFormat === "webp") await image.webp().toFile(outputPath);
            if (normalizedFormat === "avif") await image.avif().toFile(outputPath);
            if (normalizedFormat === "svg") {
                const metadata = await image.metadata();
                const png = await image.png().toBuffer();
                const dataUri = `data:image/png;base64,${png.toString("base64")}`;
                const width = metadata.width ?? 1;
                const height = metadata.height ?? 1;
                const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}"><image width="${width}" height="${height}" href="${dataUri}"/></svg>`;
                await fs.writeFile(outputPath, svg);
            }
        } else if (category === "document") {
            await runLibreOffice(inputPath, outputPath, normalizedFormat);
        } else {
            await runFfmpeg(inputPath, outputPath);
        }

        return {
            filePath: outputPath,
            fileName: `${baseName}.${normalizedFormat}`,
        };
    } catch (error) {
        await fs.rm(tempDir, { recursive: true, force: true });

        if (error instanceof AppError) throw error;
        throw new AppError(422, "Unable to convert this file.");
    }
}

export async function removeConversionFiles(filePath: string) {
    await fs.rm(path.dirname(filePath), {
        recursive: true,
        force: true,
    });
}