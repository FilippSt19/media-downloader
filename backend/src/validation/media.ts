import { z } from "zod";

export const analyzeMediaSchema = z.object({
    url: z.url("Invalid URL."),
});

export type AnalyzeMediaInput = z.infer<
    typeof analyzeMediaSchema
>;