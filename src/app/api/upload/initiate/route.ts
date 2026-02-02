import { NextRequest, NextResponse } from 'next/server'
import { generateUploadUrl, generateStorageKey } from '@/lib/storage'
import prisma from '@/lib/db'

// Maximum file size: 500MB
const MAX_FILE_SIZE = 500 * 1024 * 1024

// Allowed video MIME types
const ALLOWED_TYPES = ['video/mp4', 'video/webm', 'video/quicktime']

interface InitiateUploadRequest {
    fileName: string
    fileSize: number
    contentType: string
}

export async function POST(request: NextRequest) {
    try {
        const body: InitiateUploadRequest = await request.json()
        const { fileName, fileSize, contentType } = body

        // Validate request
        if (!fileName || !fileSize || !contentType) {
            return NextResponse.json(
                { error: 'Missing required fields: fileName, fileSize, contentType' },
                { status: 400 }
            )
        }

        // Validate file size
        if (fileSize > MAX_FILE_SIZE) {
            return NextResponse.json(
                { error: `File size exceeds maximum allowed (${MAX_FILE_SIZE / 1024 / 1024}MB)` },
                { status: 400 }
            )
        }

        // Validate content type
        if (!ALLOWED_TYPES.includes(contentType)) {
            return NextResponse.json(
                { error: `Invalid file type. Allowed: ${ALLOWED_TYPES.join(', ')}` },
                { status: 400 }
            )
        }

        // Get file extension from content type
        const extensionMap: Record<string, string> = {
            'video/mp4': 'mp4',
            'video/webm': 'webm',
            'video/quicktime': 'mov',
        }
        const extension = extensionMap[contentType] || 'mp4'

        // TODO: Get actual user ID from authentication
        // For now, using a placeholder user ID
        const userId = 'demo-user-id'

        // Create a placeholder slug from filename
        const baseSlug = fileName
            .replace(/\.[^/.]+$/, '') // Remove extension
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, '-')
            .replace(/^-+|-+$/g, '')
        const uniqueSlug = `${baseSlug}-${Date.now()}`

        // Create video record in database
        const video = await prisma.video.create({
            data: {
                title: fileName.replace(/\.[^/.]+$/, ''), // Use filename without extension as initial title
                slug: uniqueSlug,
                status: 'UPLOADING',
                uploaderId: userId,
            },
        })

        // Generate storage key
        const storageKey = generateStorageKey(userId, video.id, 'original', extension)

        // Generate presigned upload URL
        const uploadUrl = await generateUploadUrl(storageKey, contentType, 3600) // 1 hour expiry

        // Create video file record
        await prisma.videoFile.create({
            data: {
                videoId: video.id,
                fileType: 'ORIGINAL',
                storageKey: storageKey,
                sizeBytes: BigInt(fileSize),
                checksum: '', // Will be updated after upload
                mimeType: contentType,
            },
        })

        return NextResponse.json({
            success: true,
            videoId: video.id,
            uploadUrl: uploadUrl,
            storageKey: storageKey,
        })
    } catch (error) {
        console.error('Upload initiation error:', error)
        return NextResponse.json(
            { error: 'Failed to initiate upload' },
            { status: 500 }
        )
    }
}
