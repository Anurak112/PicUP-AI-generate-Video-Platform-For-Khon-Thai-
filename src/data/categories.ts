import { Category } from '@/types/video';

// Category definitions with icons and descriptions
// IDs matched to what we might expect from seed data (usually UUIDs, but using slugs for mock)
export const categories: Category[] = [
    {
        id: 'all',
        name: 'All Videos',
        slug: 'all',
        icon: '🎬',
        count: 0,
        description: 'Browse all available AI-generated videos'
    },
    {
        id: 'photorealistic',
        name: 'Photorealistic',
        slug: 'photorealistic',
        icon: '📸',
        count: 0,
        description: 'Hyper-realistic AI videos that look like real footage'
    },
    {
        id: 'cartoon',
        name: 'Cartoon',
        slug: 'cartoon',
        icon: '🎨',
        count: 0,
        description: 'Animated cartoon-style videos with vibrant colors'
    },
    {
        id: '3d-animation',
        name: '3D Animation',
        slug: '3d-animation',
        icon: '🎲',
        count: 0,
        description: '3D rendered scenes and animations'
    },
    {
        id: 'anime',
        name: 'Anime',
        slug: 'anime',
        icon: '🌸',
        count: 0,
        description: 'Japanese anime-style animations'
    },
    {
        id: 'abstract',
        name: 'Abstract',
        slug: 'abstract',
        icon: '🌀',
        count: 0,
        description: 'Abstract art and motion graphics'
    },
    {
        id: 'nature',
        name: 'Nature',
        slug: 'nature',
        icon: '🌿',
        count: 0,
        description: 'Natural landscapes, wildlife, and environments'
    },
    {
        id: 'urban',
        name: 'Urban',
        slug: 'urban',
        icon: '🏙️',
        count: 0,
        description: 'City scenes, architecture, and urban environments'
    },
    {
        id: 'sci-fi',
        name: 'Sci-Fi',
        slug: 'sci-fi',
        icon: '🤖',
        count: 0,
        description: 'Science fiction and futuristic themes'
    },
    {
        id: 'space', // Extra from previous mock
        name: 'Space',
        slug: 'space',
        icon: '🚀',
        count: 0,
        description: 'Cosmic scenes, planets, and space exploration'
    },
    {
        id: 'fantasy', // Extra
        name: 'Fantasy',
        slug: 'fantasy',
        icon: '✨',
        count: 0,
        description: 'Magical and fantastical scenes'
    },
    {
        id: 'product', // Extra
        name: 'Product',
        slug: 'product',
        icon: '📦',
        count: 0,
        description: 'Product showcases and commercial videos'
    }
];

// Get category by slug
export function getCategoryBySlug(slug: string): Category | undefined {
    return categories.find(cat => cat.slug === slug);
}

// Get category by id
export function getCategoryById(id: string): Category | undefined {
    return categories.find(cat => cat.id === id);
}

// Update category counts based on videos
export function updateCategoryCounts(videos: any[]): Category[] {
    const categoriesWithCounts = categories.map(cat => {
        if (cat.id === 'all') {
            return { ...cat, count: videos.length };
        }
        const count = videos.filter(video =>
            video.categoryId === cat.id ||
            video.category?.slug === cat.slug ||
            video.tags?.some((tag: any) => tag.slug === cat.slug)
        ).length;
        return { ...cat, count };
    });
    return categoriesWithCounts;
}
