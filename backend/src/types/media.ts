export type Platform =
  | "youtube"
  | "instagram"
  | "tiktok";

export interface AnalyzeMediaRequest {
  url: string;
}

export interface AnalyzeMediaResponse {
  success: boolean;
  platform: Platform;
  url: string;
}