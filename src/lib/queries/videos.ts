import prisma from '../db'
import { Prisma, VideoStatus, Visibility } from '@prisma/client'

export interface VideoFilters {
    categoryId?: string
    tags?: string[]
    modelName?: string
    licenseType?: string
    minDuration?: number
    maxDuration?: number
    minWidth?: number
    minHeight?: number
    orientation?: 'landscape' | 'portrait' | 'square'
    status?: VideoStatus
    featured?: boolean
}

export interface PaginationOptions {
    page?: number
    limit?: number
    sortBy?: 'newest' | 'popular' | 'trending' | 'downloads'
}

/**
 * Get a single video by ID with all relations
 */
export async function getVideoById(id: string) {
    return await prisma.video.findUnique({
        where: { id },
        include: {
            uploader: {
                select: {
                    id: true,
                    username: true,
                    displayName: true,
                    avatarUrl: true,
                },
            },
            category: true,
            tags: {
                include: {
                    tag: true,
                },
            },
            files: true,
            aiMetadata: true,
        },
    })
}

/**
 * Search videos with filters and pagination
 */
export async function searchVideos(
    query?: string,
    filters: VideoFilters = {},
    options: PaginationOptions = {}
) {
    const { page = 1, limit = 20, sortBy = 'newest' } = options
    const skip = (page - 1) * limit

    // Build where clause
    const where: Prisma.VideoWhereInput = {
        status: filters.status || VideoStatus.READY,
        visibility: Visibility.PUBLIC,
        ...(filters.categoryId && { categoryId: filters.categoryId }),
        ...(filters.featured !== undefined && { featured: filters.featured }),
        ...(filters.tags && filters.tags.length > 0 && {
            tags: {
                some: {
                    tag: {
                        slug: { in: filters.tags },
                    },
                },
            },
        }),
        ...(filters.modelName && {
            aiMetadata: {
                modelName: { contains: filters.modelName, mode: 'insensitive' },
            },
        }),
        ...(query && {
            OR: [
                { title: { contains: query, mode: 'insensitive' } },
                { description: { contains: query, mode: 'insensitive' } },
            ],
        }),
    }

    // Build orderBy clause
    let orderBy: Prisma.VideoOrderByWithRelationInput
    switch (sortBy) {
        case 'popular':
            orderBy = { viewCount: 'desc' }
            break
        case 'downloads':
            orderBy = { downloadCount: 'desc' }
            break
        case 'trending':
            // Simple trending: recent + popular
            orderBy = { viewCount: 'desc' }
            break
        case 'newest':
        default:
            orderBy = { publishedAt: 'desc' }
    }

    const [videos, total] = await Promise.all([
        prisma.video.findMany({
            where,
            orderBy,
            skip,
            take: limit,
            include: {
                uploader: {
                    select: {
                        id: true,
                        username: true,
                        displayName: true,
                        avatarUrl: true,
                    },
                },
                category: true,
                tags: {
                    include: {
                        tag: true,
                    },
                },
                files: {
                    where: {
                        fileType: { in: ['THUMBNAIL', 'PREVIEW_MP4'] },
                    },
                },
            },
        }),
        prisma.video.count({ where }),
    ])

    return {
        videos,
        pagination: {
            page,
            limit,
            total,
            totalPages: Math.ceil(total / limit),
        },
    }
}

/**
 * Get videos by category
 */
export async function getVideosByCategory(
    categorySlug: string,
    options: PaginationOptions = {}
) {
    const category = await prisma.category.findUnique({
        where: { slug: categorySlug },
    })

    if (!category) {
        throw new Error('Category not found')
    }

    return searchVideos(undefined, { categoryId: category.id }, options)
}

/**
 * Get trending videos (high views in last 7 days)
 */
export async function getTrendingVideos(limit: number = 10) {
    const sevenDaysAgo = new Date()
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7)

    return await prisma.video.findMany({
        where: {
            status: VideoStatus.READY,
            visibility: Visibility.PUBLIC,
            publishedAt: {
                gte: sevenDaysAgo,
            },
        },
        orderBy: {
            viewCount: 'desc',
        },
        take: limit,
        include: {
            uploader: {
                select: {
                    id: true,
                    username: true,
                    displayName: true,
                    avatarUrl: true,
                },
            },
            files: {
                where: {
                    fileType: 'THUMBNAIL',
                },
                take: 1,
            },
        },
    })
}

/**
 * Get user's videos
 */
export async function getUserVideos(
    userId: string,
    options: PaginationOptions = {}
) {
    const { page = 1, limit = 20 } = options
    const skip = (page - 1) * limit

    const [videos, total] = await Promise.all([
        prisma.video.findMany({
            where: { uploaderId: userId },
            orderBy: { createdAt: 'desc' },
            skip,
            take: limit,
            include: {
                category: true,
                files: {
                    where: {
                        fileType: 'THUMBNAIL',
                    },
                    take: 1,
                },
            },
        }),
        prisma.video.count({ where: { uploaderId: userId } }),
    ])

    return {
        videos,
        pagination: {
            page,
            limit,
            total,
            totalPages: Math.ceil(total / limit),
        },
    }
}

/**
 * Increment view count
 */
export async function incrementViewCount(videoId: string) {
    return await prisma.video.update({
        where: { id: videoId },
        data: {
            viewCount: {
                increment: 1,
            },
        },
    })
}

/**
 * Increment download count
 */
export async function incrementDownloadCount(videoId: string) {
    return await prisma.video.update({
        where: { id: videoId },
        data: {
            downloadCount: {
                increment: 1,
            },
        },
    })
}

/**
 * Get featured videos
 */
export async function getFeaturedVideos(limit: number = 5) {
    return await prisma.video.findMany({
        where: {
            featured: true,
            status: VideoStatus.READY,
            visibility: Visibility.PUBLIC,
        },
        orderBy: {
            publishedAt: 'desc',
        },
        take: limit,
        include: {
            uploader: {
                select: {
                    id: true,
                    username: true,
                    displayName: true,
                    avatarUrl: true,
                },
            },
            files: {
                where: {
                    fileType: { in: ['THUMBNAIL', 'PREVIEW_MP4'] },
                },
            },
        },
    })
}
