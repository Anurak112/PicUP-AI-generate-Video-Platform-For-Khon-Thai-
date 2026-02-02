import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/lib/db'

interface FinalizeUploadRequest {
    videoId: string
    title: string
    description?: string
    categoryId?: string
    tags?: string[]
    licenseType?: 'FREE' | 'ATTRIBUTION' | 'COMMERCIAL' | 'PERSONAL'
    visibility?: 'PUBLIC' | 'UNLISTED' | 'PRIVATE'
    // AI Metadata
    aiMetadata?: {
        prompt?: string
        negativePrompt?: string
        modelName: string
        modelVersion?: string
        generatorApp?: string
        seed?: number
        steps?: number
        guidanceScale?: number
        sampler?: string
    }
    // Video properties (from client-side extraction)
    videoProperties?: {
        width?: number
        height?: number
        duration?: number
        fps?: number
    }
}

export async function POST(request: NextRequest) {
    try {
        const body: FinalizeUploadRequest = await request.json()
        const {
            videoId,
            title,
            description,
            categoryId,
            tags,
            licenseType,
            visibility,
            aiMetadata,
            videoProperties,
        } = body

        // Validate required fields
        if (!videoId || !title) {
            return NextResponse.json(
                { error: 'Missing required fields: videoId, title' },
                { status: 400 }
            )
        }

        // Verify video exists and is in UPLOADING status
        const existingVideo = await prisma.video.findUnique({
            where: { id: videoId },
            include: { files: true },
        })

        if (!existingVideo) {
            return NextResponse.json(
                { error: 'Video not found' },
                { status: 404 }
            )
        }

        if (existingVideo.status !== 'UPLOADING') {
            return NextResponse.json(
                { error: 'Video is not in uploading state' },
                { status: 400 }
            )
        }

        // Generate slug from title
        const baseSlug = title
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, '-')
            .replace(/^-+|-+$/g, '')
        const uniqueSlug = `${baseSlug}-${Date.now()}`

        // Start a transaction to update all related data
        const result = await prisma.$transaction(async (tx) => {
            // Update video record
            const updatedVideo = await tx.video.update({
                where: { id: videoId },
                data: {
                    title,
                    description,
                    slug: uniqueSlug,
                    categoryId: categoryId || null,
                    licenseType: licenseType || 'FREE',
                    visibility: visibility || 'PUBLIC',
                    status: 'PROCESSING',
                    publishedAt: new Date(),
                },
            })

            // Update video file with properties if provided
            if (videoProperties && existingVideo.files.length > 0) {
                await tx.videoFile.update({
                    where: { id: existingVideo.files[0].id },
                    data: {
                        width: videoProperties.width,
                        height: videoProperties.height,
                        duration: videoProperties.duration,
                        fps: videoProperties.fps,
                    },
                })
            }

            // Create AI metadata if provided
            if (aiMetadata && aiMetadata.modelName) {
                await tx.aiMetadata.create({
                    data: {
                        videoId,
                        modelName: aiMetadata.modelName,
                        modelVersion: aiMetadata.modelVersion,
                        generatorApp: aiMetadata.generatorApp,
                        prompt: aiMetadata.prompt,
                        negativePrompt: aiMetadata.negativePrompt,
                        seed: aiMetadata.seed ? BigInt(aiMetadata.seed) : null,
                        steps: aiMetadata.steps,
                        guidanceScale: aiMetadata.guidanceScale,
                        sampler: aiMetadata.sampler,
                        generatedAt: new Date(),
                    },
                })
            }

            // Handle tags
            if (tags && tags.length > 0) {
                for (const tagName of tags) {
                    const normalizedTag = tagName.toLowerCase().trim()
                    if (!normalizedTag) continue

                    // Find or create tag
                    let tag = await tx.tag.findUnique({
                        where: { name: normalizedTag },
                    })

                    if (!tag) {
                        tag = await tx.tag.create({
                            data: {
                                name: normalizedTag,
                                slug: normalizedTag.replace(/\s+/g, '-'),
                            },
                        })
                    }

                    // Create video-tag relationship
                    await tx.videoTag.create({
                        data: {
                            videoId,
                            tagId: tag.id,
                        },
                    })

                    // Increment tag usage count
                    await tx.tag.update({
                        where: { id: tag.id },
                        data: { usageCount: { increment: 1 } },
                    })
                }
            }

            // Create processing job
            await tx.processingJob.create({
                data: {
                    videoId,
                    jobType: 'TRANSCODE',
                    status: 'PENDING',
                    progress: 0,
                },
            })

            return updatedVideo
        })

        return NextResponse.json({
            success: true,
            video: {
                id: result.id,
                title: result.title,
                slug: result.slug,
                status: result.status,
            },
        })
    } catch (error) {
        console.error('Upload finalization error:', error)
        return NextResponse.json(
            { error: 'Failed to finalize upload' },
            { status: 500 }
        )
    }
}
