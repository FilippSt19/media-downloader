"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.convertMedia = convertMedia;
exports.removeConversionFiles = removeConversionFiles;
const promises_1 = __importDefault(require("node:fs/promises"));
const node_path_1 = __importDefault(require("node:path"));
const node_child_process_1 = require("node:child_process");
const node_util_1 = require("node:util");
const sharp_1 = __importDefault(require("sharp"));
const environment_js_1 = require("../config/environment.js");
const AppError_js_1 = require("../errors/AppError.js");
const execFileAsync = (0, node_util_1.promisify)(node_child_process_1.execFile);
const VIDEO_FORMATS = new Set(["mp4", "mov", "webm", "avi", "mkv"]);
const AUDIO_FORMATS = new Set(["mp3", "wav", "aac", "flac", "ogg"]);
const IMAGE_FORMATS = new Set(["jpg", "png", "webp", "svg", "avif"]);
const DOCUMENT_FORMATS = new Set(["pdf", "docx", "txt", "rtf"]);
function getExtension(fileName) {
    return node_path_1.default.extname(fileName).toLowerCase().replace(".", "");
}
function validateFormat(category, format) {
    const normalizedFormat = format.toLowerCase();
    const formats = category === "video"
        ? VIDEO_FORMATS
        : category === "audio"
            ? AUDIO_FORMATS
            : category === "photo"
                ? IMAGE_FORMATS
                : DOCUMENT_FORMATS;
    if (!formats.has(normalizedFormat)) {
        throw new AppError_js_1.AppError(400, `Unsupported ${category} output format.`);
    }
    return normalizedFormat;
}
async function runFfmpeg(inputPath, outputPath) {
    try {
        await execFileAsync("ffmpeg", [
            "-y",
            "-i",
            inputPath,
            outputPath,
        ]);
    }
    catch {
        throw new AppError_js_1.AppError(422, "Unable to convert this media file.");
    }
}
async function runLibreOffice(inputPath, outputPath, format) {
    try {
        await execFileAsync("libreoffice", [
            "--headless",
            "--convert-to",
            format,
            "--outdir",
            node_path_1.default.dirname(outputPath),
            inputPath,
        ]);
    }
    catch {
        throw new AppError_js_1.AppError(422, "Unable to convert this document.");
    }
    const generatedPath = node_path_1.default.join(node_path_1.default.dirname(outputPath), `${node_path_1.default.basename(inputPath, node_path_1.default.extname(inputPath))}.${format}`);
    if (generatedPath !== outputPath) {
        await promises_1.default.rename(generatedPath, outputPath);
    }
}
async function convertMedia({ buffer, originalName, category, format, }) {
    const normalizedFormat = validateFormat(category, format);
    const tempDir = await promises_1.default.mkdtemp(node_path_1.default.resolve(environment_js_1.ENV.TEMP_DIR, "conversion-"));
    const baseName = node_path_1.default.basename(originalName, node_path_1.default.extname(originalName));
    const inputExtension = getExtension(originalName) || "bin";
    const inputPath = node_path_1.default.join(tempDir, `${baseName}.${inputExtension}`);
    const outputPath = node_path_1.default.join(tempDir, `${baseName}.${normalizedFormat}`);
    await promises_1.default.writeFile(inputPath, buffer);
    try {
        if (category === "photo") {
            const image = (0, sharp_1.default)(inputPath);
            if (normalizedFormat === "jpg")
                await image.jpeg().toFile(outputPath);
            if (normalizedFormat === "png")
                await image.png().toFile(outputPath);
            if (normalizedFormat === "webp")
                await image.webp().toFile(outputPath);
            if (normalizedFormat === "avif")
                await image.avif().toFile(outputPath);
            if (normalizedFormat === "svg") {
                const metadata = await image.metadata();
                const png = await image.png().toBuffer();
                const dataUri = `data:image/png;base64,${png.toString("base64")}`;
                const width = metadata.width ?? 1;
                const height = metadata.height ?? 1;
                const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}"><image width="${width}" height="${height}" href="${dataUri}"/></svg>`;
                await promises_1.default.writeFile(outputPath, svg);
            }
        }
        else if (category === "document") {
            await runLibreOffice(inputPath, outputPath, normalizedFormat);
        }
        else {
            await runFfmpeg(inputPath, outputPath);
        }
        return {
            filePath: outputPath,
            fileName: `${baseName}.${normalizedFormat}`,
        };
    }
    catch (error) {
        await promises_1.default.rm(tempDir, { recursive: true, force: true });
        if (error instanceof AppError_js_1.AppError)
            throw error;
        throw new AppError_js_1.AppError(422, "Unable to convert this file.");
    }
}
async function removeConversionFiles(filePath) {
    await promises_1.default.rm(node_path_1.default.dirname(filePath), {
        recursive: true,
        force: true,
    });
}
