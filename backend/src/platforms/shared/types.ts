export type VideoFormat = {
    quality: string;
    height: number;
};

export type AudioFormat = {
    quality: string;
    bitrate: number;
};

export type MediaMetadata = {
    title: string;
    thumbnail: string | null;
    duration: number | null;
    uploader: string | null;
    formats: {
        video: VideoFormat[];
        audio: AudioFormat[];
    };
};

export type YtDlpFormat = {
    height?: number;
    vcodec?: string;
};

export type YtDlpOutput = {
    title?: string;
    thumbnail?: string;
    duration?: number;
    uploader?: string;
    formats?: YtDlpFormat[];
};