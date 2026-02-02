import { Video, VideoStatus } from '@/types/video';

// Mock video data for development
export const mockVideos: Video[] = [
    {
        id: '1',
        uploaderId: 'u1',
        title: 'Cinematic Sunset Over Ocean Waves',
        description: 'Beautiful cinematic drone shot of golden hour sunset over calm ocean waves with dramatic clouds',
        slug: 'cinematic-sunset-ocean',
        thumbnailUrl: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=450&fit=crop',
        videoUrl: '/videos/sample1.mp4',
        duration: 15,

        categoryId: 'nature',
        category: {
            id: 'nature',
            name: 'Nature',
            slug: 'nature',
            icon: '🌿',
            description: null,
            count: 0
        },

        viewCount: 12500,
        downloadCount: 450,
        likeCount: 1200,

        createdAt: new Date('2026-01-28'),
        publishedAt: new Date('2026-01-28'),

        status: 'READY' as VideoStatus,
        licenseType: 'FREE',
        visibility: 'PUBLIC',
        featured: true,

        uploader: {
            id: 'u1',
            username: 'ai_creator',
            displayName: 'AI Creator Studio',
            avatarUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Felix',
            role: 'CREATOR'
        },

        aiMetadata: {
            modelName: 'Runway Gen-3',
            modelVersion: '1.0',
            generatorApp: 'Runway',
            prompt: 'Cinematic drone shot, golden hour sunset over ocean, dramatic clouds, calm waves, 4k quality',
            negativePrompt: null,
            seed: 42,
            steps: 50,
            guidanceScale: 7.5,
            sampler: null
        },

        tags: [
            { id: 't1', name: 'sunset', slug: 'sunset' },
            { id: 't2', name: 'ocean', slug: 'ocean' },
            { id: 't3', name: 'cinematic', slug: 'cinematic' },
            { id: 't4', name: 'drone', slug: 'drone' }
        ],

        files: [
            {
                id: 'f1',
                fileType: 'ORIGINAL',
                cdnUrl: null,
                width: 1920,
                height: 1080,
                fps: 30,
                duration: 15,
                sizeBytes: 45000000
            }
        ]
    },
    {
        id: '2',
        uploaderId: 'u2',
        title: 'Futuristic City Neon Lights',
        description: 'Cyberpunk style city street with neon signs and rain reflections at night',
        slug: 'futuristic-city-neon',
        thumbnailUrl: 'https://images.unsplash.com/photo-1514565131-fce0801e5785?w=800&h=450&fit=crop',
        videoUrl: '/videos/sample2.mp4',
        duration: 20,

        categoryId: 'urban',
        category: {
            id: 'urban',
            name: 'Urban',
            slug: 'urban',
            icon: '🏙️',
            description: null,
            count: 0
        },

        viewCount: 8900,
        downloadCount: 320,
        likeCount: 850,

        createdAt: new Date('2026-01-27'),
        publishedAt: new Date('2026-01-27'),

        status: 'READY' as VideoStatus,
        licenseType: 'ATTRIBUTION',
        visibility: 'PUBLIC',
        featured: false,

        uploader: {
            id: 'u2',
            username: 'neon_dreams',
            displayName: 'Neon Dreams AI',
            avatarUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Neon',
            role: 'CREATOR'
        },

        aiMetadata: {
            modelName: 'Pika Labs 1.0',
            modelVersion: '1.0',
            generatorApp: 'Pika',
            prompt: 'Cyberpunk city street, neon signs, rain, night, reflections, cinematic camera movement',
            negativePrompt: null,
            seed: 123,
            steps: 45,
            guidanceScale: 8.0,
            sampler: null
        },

        tags: [
            { id: 't5', name: 'cyberpunk', slug: 'cyberpunk' },
            { id: 't6', name: 'city', slug: 'city' },
            { id: 't7', name: 'neon', slug: 'neon' }
        ],

        files: []
    },
    {
        id: '3',
        uploaderId: 'u3',
        title: 'Abstract Liquid Motion Graphics',
        description: 'Colorful abstract liquid motion with smooth transitions and vibrant colors',
        slug: 'abstract-liquid-motion',
        thumbnailUrl: 'https://images.unsplash.com/photo-1557672172-298e090bd0f1?w=800&h=450&fit=crop',
        videoUrl: '/videos/sample3.mp4',
        duration: 10,

        categoryId: 'abstract',
        category: {
            id: 'abstract',
            name: 'Abstract',
            slug: 'abstract',
            icon: '🌀',
            description: null,
            count: 0
        },

        viewCount: 15200,
        downloadCount: 800,
        likeCount: 2000,

        createdAt: new Date('2026-01-26'),
        publishedAt: new Date('2026-01-26'),

        status: 'READY' as VideoStatus,
        licenseType: 'FREE',
        visibility: 'PUBLIC',
        featured: true,

        uploader: {
            id: 'u3',
            username: 'motion_lab',
            displayName: 'Motion Lab',
            avatarUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Motion',
            role: 'CREATOR'
        },

        aiMetadata: {
            modelName: 'Stable Video Diffusion',
            modelVersion: '1.1',
            generatorApp: 'SVD',
            prompt: 'Abstract liquid motion, vibrant colors, smooth flow, purple and pink gradient',
            negativePrompt: null,
            seed: 789,
            steps: 40,
            guidanceScale: 6.5,
            sampler: null
        },

        tags: [
            { id: 't8', name: 'abstract', slug: 'abstract' },
            { id: 't9', name: 'motion', slug: 'motion' },
            { id: 't10', name: 'liquid', slug: 'liquid' }
        ],

        files: []
    },
    {
        id: '4',
        uploaderId: 'u4',
        title: 'Mountain Landscape Time-lapse',
        description: 'Epic mountain range with moving clouds and changing light throughout the day',
        slug: 'mountain-landscape-timelapse',
        thumbnailUrl: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=450&fit=crop',
        videoUrl: '/videos/sample4.mp4',
        duration: 25,

        categoryId: 'nature',
        category: {
            id: 'nature',
            name: 'Nature',
            slug: 'nature',
            icon: '🌿',
            description: null,
            count: 0
        },

        viewCount: 9800,
        downloadCount: 350,
        likeCount: 900,

        createdAt: new Date('2026-01-25'),
        publishedAt: new Date('2026-01-25'),

        status: 'READY' as VideoStatus,
        licenseType: 'FREE',
        visibility: 'PUBLIC',
        featured: false,

        uploader: {
            id: 'u1',
            username: 'ai_creator',
            displayName: 'AI Creator Studio',
            avatarUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Felix',
            role: 'CREATOR'
        },

        aiMetadata: {
            modelName: 'Runway Gen-3',
            modelVersion: '1.0',
            generatorApp: 'Runway',
            prompt: 'Mountain landscape, time-lapse, moving clouds, dramatic lighting, epic scale',
            negativePrompt: null,
            seed: 456,
            steps: 50,
            guidanceScale: 7.0,
            sampler: null
        },

        tags: [
            { id: 't11', name: 'mountains', slug: 'mountains' },
            { id: 't12', name: 'landscape', slug: 'landscape' },
            { id: 't13', name: 'timelapse', slug: 'timelapse' }
        ],

        files: []
    },
    {
        id: '6',
        uploaderId: 'u5',
        title: 'Space Nebula Journey',
        description: 'Journey through colorful space nebula with stars and cosmic dust',
        slug: 'space-nebula-journey',
        thumbnailUrl: 'https://images.unsplash.com/photo-1462331940025-496dfbfc7564?w=800&h=450&fit=crop',
        videoUrl: '/videos/sample6.mp4',
        duration: 30,

        categoryId: 'space',
        category: {
            id: 'space',
            name: 'Space',
            slug: 'space',
            icon: '🚀',
            description: null,
            count: 0
        },

        viewCount: 18500,
        downloadCount: 1200,
        likeCount: 2500,

        createdAt: new Date('2026-01-23'),
        publishedAt: new Date('2026-01-23'),

        status: 'READY' as VideoStatus,
        licenseType: 'FREE',
        visibility: 'PUBLIC',
        featured: true,

        uploader: {
            id: 'u5',
            username: 'cosmic_visions',
            displayName: 'Cosmic Visions',
            avatarUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Cosmic',
            role: 'CREATOR'
        },

        aiMetadata: {
            modelName: 'Stable Video Diffusion',
            modelVersion: '1.1',
            generatorApp: 'SVD',
            prompt: 'Space nebula, cosmic journey, stars, colorful gas clouds, camera flying through',
            negativePrompt: null,
            seed: 999,
            steps: 50,
            guidanceScale: 7.5,
            sampler: null
        },

        tags: [
            { id: 't14', name: 'space', slug: 'space' },
            { id: 't15', name: 'nebula', slug: 'nebula' },
            { id: 't16', name: 'cosmos', slug: 'cosmos' }
        ],
        files: []
    }
];

// Helper function to format duration
export function formatDuration(seconds?: number): string {
    if (!seconds) return '0:00';
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
}

// Helper function to format views
export function formatViews(views: number): string {
    if (views >= 1000000) {
        return `${(views / 1000000).toFixed(1)}M`;
    } else if (views >= 1000) {
        return `${(views / 1000).toFixed(1)}K`;
    }
    return views.toString();
}

// Helper function to format file size
export function formatFileSize(bytes: number | bigint): string {
    const numBytes = Number(bytes);
    if (numBytes >= 1000000000) {
        return `${(numBytes / 1000000000).toFixed(1)} GB`;
    } else if (numBytes >= 1000000) {
        return `${(numBytes / 1000000).toFixed(1)} MB`;
    } else if (numBytes >= 1000) {
        return `${(numBytes / 1000).toFixed(1)} KB`;
    }
    return `${numBytes} B`;
}

// Helper function to get relative time
export function getRelativeTime(date: Date | string): string {
    const d = typeof date === 'string' ? new Date(date) : date;
    const now = new Date();
    const diffMs = now.getTime() - d.getTime();
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

    if (diffDays === 0) return 'Today';
    if (diffDays === 1) return 'Yesterday';
    if (diffDays < 7) return `${diffDays} days ago`;
    if (diffDays < 30) return `${Math.floor(diffDays / 7)} weeks ago`;
    if (diffDays < 365) return `${Math.floor(diffDays / 30)} months ago`;
    return `${Math.floor(diffDays / 365)} years ago`;
}
