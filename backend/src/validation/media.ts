import { z } from "zod";

export const analyzeMediaSchema = z.object({
    url: z.url("Invalid URL."),
});

export const convertMediaSchema = z.object({
    category: z.enum(["video", "photo", "document", "audio"]),
    format: z.string().trim().toLowerCase().regex(/^[a-z0-9]+$/, "Invalid output format."),
});

export type AnalyzeMediaInput = z.infer<
    typeof analyzeMediaSchema
>;