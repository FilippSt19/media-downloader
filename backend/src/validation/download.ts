import { z } from "zod";

export const downloadSchema = z.object({
    url: z.url("Invalid URL."),

    type: z.enum(["audio", "video"]),

    quality: z.number().positive(),

    title: z.string().optional(),
});

export type DownloadInput = z.infer<
    typeof downloadSchema
>;