import { Video } from '@/types/video';

// Mock video data for development
export const mockVideos: Video[] = [
    {
        id: '1',
        title: 'Cinematic Sunset Over Ocean Waves',
        description: 'Beautiful cinematic drone shot of golden hour sunset over calm ocean waves with dramatic clouds',
        thumbnailUrl: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=225&fit=crop',
        videoUrl: '/videos/sample1.mp4',
        duration: 15,
        views: 12500,
        uploadDate: new Date('2026-01-28'),
        uploader: {
            id: 'u1',
            name: 'AI Creator Studio',
            avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Felix'
        },
        aiGeneration: {
            model: 'Runway Gen-3',
            prompt: 'Cinematic drone shot, golden hour sunset over ocean, dramatic clouds, calm waves, 4k quality',
            seed: 42,
            steps: 50,
            guidance: 7.5
        },
        technical: {
            resolution: '1920x1080',
            fps: 30,
            codec: 'H.264',
            fileSize: 45000000
        },
        tags: ['sunset', 'ocean', 'cinematic', 'drone', 'nature'],
        category: 'Nature',
        license: 'CC0',
        orientation: 'landscape'
    },
    {
        id: '2',
        title: 'Futuristic City Neon Lights',
        description: 'Cyberpunk style city street with neon signs and rain reflections at night',
        thumbnailUrl: 'https://images.unsplash.com/photo-1514565131-fce0801e5785?w=400&h=225&fit=crop',
        videoUrl: '/videos/sample2.mp4',
        duration: 20,
        views: 8900,
        uploadDate: new Date('2026-01-27'),
        uploader: {
            id: 'u2',
            name: 'Neon Dreams AI',
            avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Neon'
        },
        aiGeneration: {
            model: 'Pika Labs 1.0',
            prompt: 'Cyberpunk city street, neon signs, rain, night, reflections, cinematic camera movement',
            seed: 123,
            steps: 45,
            guidance: 8.0
        },
        technical: {
            resolution: '1920x1080',
            fps: 24,
            codec: 'H.265',
            fileSize: 52000000
        },
        tags: ['cyberpunk', 'city', 'neon', 'night', 'rain'],
        category: 'Urban',
        license: 'CC-BY',
        orientation: 'landscape'
    },
    {
        id: '3',
        title: 'Abstract Liquid Motion Graphics',
        description: 'Colorful abstract liquid motion with smooth transitions and vibrant colors',
        thumbnailUrl: 'https://images.unsplash.com/photo-1557672172-298e090bd0f1?w=400&h=225&fit=crop',
        videoUrl: '/videos/sample3.mp4',
        duration: 10,
        views: 15200,
        uploadDate: new Date('2026-01-26'),
        uploader: {
            id: 'u3',
            name: 'Motion Lab',
            avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Motion'
        },
        aiGeneration: {
            model: 'Stable Video Diffusion',
            prompt: 'Abstract liquid motion, vibrant colors, smooth flow, purple and pink gradient',
            seed: 789,
            steps: 40,
            guidance: 6.5
        },
        technical: {
            resolution: '1920x1080',
            fps: 60,
            codec: 'H.264',
            fileSize: 38000000
        },
        tags: ['abstract', 'motion graphics', 'liquid', 'colorful'],
        category: 'Abstract',
        license: 'CC0',
        orientation: 'landscape'
    },
    {
        id: '4',
        title: 'Mountain Landscape Time-lapse',
        description: 'Epic mountain range with moving clouds and changing light throughout the day',
        thumbnailUrl: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=225&fit=crop',
        videoUrl: '/videos/sample4.mp4',
        duration: 25,
        views: 9800,
        uploadDate: new Date('2026-01-25'),
        uploader: {
            id: 'u1',
            name: 'AI Creator Studio',
            avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Felix'
        },
        aiGeneration: {
            model: 'Runway Gen-3',
            prompt: 'Mountain landscape, time-lapse, moving clouds, dramatic lighting, epic scale',
            seed: 456,
            steps: 50,
            guidance: 7.0
        },
        technical: {
            resolution: '3840x2160',
            fps: 30,
            codec: 'H.265',
            fileSize: 95000000
        },
        tags: ['mountains', 'landscape', 'time-lapse', 'nature'],
        category: 'Nature',
        license: 'CC0',
        orientation: 'landscape'
    },
    {
        id: '5',
        title: 'Portrait Fashion Model Walk',
        description: 'Elegant fashion model walking in slow motion with studio lighting',
        thumbnailUrl: 'https://images.unsplash.com/photo-1529139574466-a303027c1d8b?w=400&h=711&fit=crop',
        videoUrl: '/videos/sample5.mp4',
        duration: 12,
        views: 11200,
        uploadDate: new Date('2026-01-24'),
        uploader: {
            id: 'u4',
            name: 'Fashion AI',
            avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Fashion'
        },
        aiGeneration: {
            model: 'Pika Labs 1.0',
            prompt: 'Fashion model walking, slow motion, studio lighting, elegant, professional',
            seed: 321,
            steps: 45,
            guidance: 8.5
        },
        technical: {
            resolution: '1080x1920',
            fps: 60,
            codec: 'H.264',
            fileSize: 42000000
        },
        tags: ['fashion', 'portrait', 'model', 'studio'],
        category: 'Fashion',
        license: 'CC-BY-SA',
        orientation: 'portrait'
    },
    {
        id: '6',
        title: 'Space Nebula Journey',
        description: 'Journey through colorful space nebula with stars and cosmic dust',
        thumbnailUrl: 'https://images.unsplash.com/photo-1462331940025-496dfbfc7564?w=400&h=225&fit=crop',
        videoUrl: '/videos/sample6.mp4',
        duration: 30,
        views: 18500,
        uploadDate: new Date('2026-01-23'),
        uploader: {
            id: 'u5',
            name: 'Cosmic Visions',
            avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Cosmic'
        },
        aiGeneration: {
            model: 'Stable Video Diffusion',
            prompt: 'Space nebula, cosmic journey, stars, colorful gas clouds, camera flying through',
            seed: 999,
            steps: 50,
            guidance: 7.5
        },
        technical: {
            resolution: '3840x2160',
            fps: 30,
            codec: 'H.265',
            fileSize: 120000000
        },
        tags: ['space', 'nebula', 'cosmos', 'stars', 'sci-fi'],
        category: 'Space',
        license: 'CC0',
        orientation: 'landscape'
    },
    {
        id: '7',
        title: 'Product Showcase Rotation',
        description: 'Sleek product rotation on white background with professional lighting',
        thumbnailUrl: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=400&fit=crop',
        videoUrl: '/videos/sample7.mp4',
        duration: 8,
        views: 7200,
        uploadDate: new Date('2026-01-22'),
        uploader: {
            id: 'u6',
            name: 'Product Studio AI',
            avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Product'
        },
        aiGeneration: {
            model: 'Runway Gen-3',
            prompt: 'Product rotation, white background, studio lighting, 360 degree spin, professional',
            seed: 555,
            steps: 40,
            guidance: 7.0
        },
        technical: {
            resolution: '1080x1080',
            fps: 30,
            codec: 'H.264',
            fileSize: 28000000
        },
        tags: ['product', 'commercial', 'rotation', 'studio'],
        category: 'Commercial',
        license: 'Custom',
        orientation: 'square'
    },
    {
        id: '8',
        title: 'Underwater Coral Reef Life',
        description: 'Vibrant coral reef with tropical fish swimming in crystal clear water',
        thumbnailUrl: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=400&h=225&fit=crop',
        videoUrl: '/videos/sample8.mp4',
        duration: 18,
        views: 13400,
        uploadDate: new Date('2026-01-21'),
        uploader: {
            id: 'u7',
            name: 'Ocean AI',
            avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Ocean'
        },
        aiGeneration: {
            model: 'Pika Labs 1.0',
            prompt: 'Underwater coral reef, tropical fish, clear water, vibrant colors, peaceful',
            seed: 777,
            steps: 45,
            guidance: 8.0
        },
        technical: {
            resolution: '1920x1080',
            fps: 30,
            codec: 'H.264',
            fileSize: 48000000
        },
        tags: ['underwater', 'coral', 'fish', 'ocean', 'nature'],
        category: 'Nature',
        license: 'CC0',
        orientation: 'landscape'
    }
];

// Helper function to format duration
export function formatDuration(seconds: number): string {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
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
export function formatFileSize(bytes: number): string {
    if (bytes >= 1000000000) {
        return `${(bytes / 1000000000).toFixed(1)} GB`;
    } else if (bytes >= 1000000) {
        return `${(bytes / 1000000).toFixed(1)} MB`;
    } else if (bytes >= 1000) {
        return `${(bytes / 1000).toFixed(1)} KB`;
    }
    return `${bytes} B`;
}

// Helper function to get relative time
export function getRelativeTime(date: Date): string {
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

    if (diffDays === 0) return 'Today';
    if (diffDays === 1) return 'Yesterday';
    if (diffDays < 7) return `${diffDays} days ago`;
    if (diffDays < 30) return `${Math.floor(diffDays / 7)} weeks ago`;
    if (diffDays < 365) return `${Math.floor(diffDays / 30)} months ago`;
    return `${Math.floor(diffDays / 365)} years ago`;
}
