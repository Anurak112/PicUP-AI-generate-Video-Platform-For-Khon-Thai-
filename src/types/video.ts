export interface Video {
    id: string;
    thumbnail: string;
    title: string;
    creator: string;
    views: string;
    duration: string;
    category: string;
    description?: string;
    videoUrl?: string; // URL to the actual video file

    // AI Metadata
    prompt?: string;
    negativePrompt?: string;
    modelName?: string;
    modelVersion?: string;
    seed?: string;
    steps?: number;
    guidanceTrace?: number; // Guidance Scale

    // Technical Specs
    resolution?: string;
    fps?: number;
    format?: string;
    size?: string;

    // Timestamps
    createdAt?: string;
}

export interface VideoFormat {
    label: string;
    resolution: string;
    size: string;
    extension: string;
    url: string;
}
