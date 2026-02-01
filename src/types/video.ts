// Video data types for PicUp platform

export interface Video {
    id: string;
    title: string;
    description: string;
    thumbnailUrl: string;
    videoUrl: string;
    duration: number; // seconds
    views: number;
    uploadDate: Date;
    uploader: {
        id: string;
        name: string;
        avatar?: string;
    };
    aiGeneration: {
        model: string;
        prompt?: string;
        negativePrompt?: string;
        seed?: number;
        steps?: number;
        guidance?: number;
    };
    technical: {
        resolution: string; // "1920x1080"
        fps: number;
        codec: string;
        fileSize: number; // bytes
    };
    tags: string[];
    category: string;
    license: 'CC0' | 'CC-BY' | 'CC-BY-SA' | 'Custom';
    orientation: 'portrait' | 'landscape' | 'square';
}

export interface FilterState {
    duration?: [number, number];
    resolution?: string[];
    aiModel?: string[];
    orientation?: 'portrait' | 'landscape' | 'square' | 'all';
    fps?: number[];
    license?: string[];
    dateRange?: [Date, Date];
    sortBy?: 'newest' | 'popular' | 'trending';
}

export interface Category {
    id: string;
    name: string;
    slug: string;
    icon?: string;
    count?: number;
    description?: string;
}
