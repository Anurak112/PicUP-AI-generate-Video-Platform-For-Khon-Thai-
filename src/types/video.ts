export type VideoStatus = 'UPLOADING' | 'PROCESSING' | 'READY' | 'FAILED' | 'DELETED';
export type LicenseType = 'FREE' | 'ATTRIBUTION' | 'COMMERCIAL' | 'PERSONAL';
export type Visibility = 'PUBLIC' | 'UNLISTED' | 'PRIVATE';

export interface Category {
    id: string;
    name: string;
    slug: string;
    icon?: string | null;
    description?: string | null;
    count?: number;
}

export interface Tag {
    id: string;
    name: string;
    slug: string;
}

export interface VideoFile {
    id: string;
    fileType: string;
    storageKey?: string;
    cdnUrl?: string | null;
    sizeBytes: number | bigint;
    width?: number | null;
    height?: number | null;
    fps?: number | null;
    duration?: number | null;
}

export interface AiMetadata {
    modelName: string;
    modelVersion?: string | null;
    generatorApp?: string | null;
    prompt?: string | null;
    negativePrompt?: string | null;
    seed?: number | bigint | null;
    steps?: number | null;
    guidanceScale?: number | null;
    sampler?: string | null;
}

export interface Video {
    id: string;
    title: string;
    description?: string | null;
    slug: string;
    thumbnail?: string; // Legacy/Simple
    thumbnailUrl?: string; // New/Detailed
    videoUrl?: string | null;
    duration?: number | string | null;

    uploaderId?: string;
    categoryId?: string | null;
    category?: Category | null;

    licenseType?: LicenseType;
    visibility?: Visibility;
    status?: VideoStatus;
    featured?: boolean;

    viewCount: number | string;
    downloadCount?: number;
    likeCount?: number;

    createdAt: string | Date;
    publishedAt?: string | Date | null;
    updatedAt?: string | Date;

    uploader?: {
        id: string;
        username: string;
        displayName?: string | null;
        avatarUrl?: string | null;
        role?: string;
    };

    aiMetadata?: AiMetadata | null;
    tags?: Tag[];
    files?: VideoFile[];

    // Legacy fields used in TrendingVideos
    creator?: string;
    views?: string;
    category_name?: string; // mapped from category.name
}

export interface VideoFormat {
    label: string;
    resolution: string;
    size: string;
    extension: string;
    url: string;
}
