import type { Platform } from "../types/media.js";

const HOSTS: Record<Platform, string[]> = {
  youtube: ["youtube.com", "www.youtube.com", "youtu.be"],
  instagram: ["instagram.com", "www.instagram.com"],
  tiktok: ["tiktok.com", "www.tiktok.com", "vm.tiktok.com"],
};

export function detectPlatform(url: string): Platform | null {
  try {
    const parsedUrl = new URL(url);
    const hostname = parsedUrl.hostname.toLowerCase();

    for (const [platform, hosts] of Object.entries(HOSTS)) {
      if (hosts.includes(hostname)) {
        return platform as Platform;
      }
    }

    return null;
  } catch {
    return null;
  }
}