"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.detectPlatform = detectPlatform;
const PLATFORM_HOSTS = {
    youtube: ["youtube.com", "www.youtube.com", "youtu.be"],
    instagram: ["instagram.com", "www.instagram.com"],
    tiktok: ["tiktok.com", "www.tiktok.com", "vm.tiktok.com"],
};
function detectPlatform(url) {
    try {
        const parsedUrl = new URL(url);
        const hostname = parsedUrl.hostname.toLowerCase();
        for (const [platform, hosts] of Object.entries(PLATFORM_HOSTS)) {
            if (hosts.includes(hostname)) {
                return platform;
            }
        }
        return null;
    }
    catch {
        return null;
    }
}
