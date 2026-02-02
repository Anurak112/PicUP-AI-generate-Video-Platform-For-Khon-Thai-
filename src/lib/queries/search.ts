import prisma from '../db'
import { EmbeddingType } from '@prisma/client'

/**
 * Semantic search using vector similarity
 * Note: This requires the pgvector extension and proper indexing
 */
export async function semanticSearch(
    queryEmbedding: number[],
    limit: number = 10,
    threshold: number = 0.7
) {
    // Using raw SQL for vector similarity search
    // pgvector uses cosine similarity: 1 - (embedding <=> query_embedding)
    const results = await prisma.$queryRaw<
        Array<{
            id: string
            video_id: string
            similarity: number
        }>
    >`
    SELECT 
      ve.id,
      ve.video_id,
      1 - (ve.embedding <=> ${`[${queryEmbedding.join(',')}]`}::vector) as similarity
    FROM video_embeddings ve
    INNER JOIN videos v ON v.id = ve.video_id
    WHERE 
      v.status = 'READY' 
      AND v.visibility = 'PUBLIC'
      AND 1 - (ve.embedding <=> ${`[${queryEmbedding.join(',')}]`}::vector) > ${threshold}
    ORDER BY ve.embedding <=> ${`[${queryEmbedding.join(',')}]`}::vector
    LIMIT ${limit}
  `

    // Fetch full video details
    const videoIds = results.map((r) => r.video_id)
    const videos = await prisma.video.findMany({
        where: {
            id: { in: videoIds },
        },
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
            files: {
                where: {
                    fileType: { in: ['THUMBNAIL', 'PREVIEW_MP4'] },
                },
            },
        },
    })

    // Maintain order and add similarity scores
    return videoIds.map((videoId) => {
        const video = videos.find((v) => v.id === videoId)
        const result = results.find((r) => r.video_id === videoId)
        return {
            ...video,
            similarity: result?.similarity || 0,
        }
    })
}

/**
 * Find similar videos based on a video's embedding
 */
export async function findSimilarVideos(videoId: string, limit: number = 10) {
    // Get the video's embedding
    const embedding = await (prisma.videoEmbedding as any).findFirst({
        where: {
            videoId,
            embeddingType: EmbeddingType.COMBINED,
        },
    })

    if (!embedding) {
        throw new Error('No embedding found for this video')
    }

    // Convert embedding to array (assuming it's stored as a string or buffer)
    // This depends on how pgvector stores the data
    const embeddingArray = JSON.parse(embedding.embedding as any)

    // Find similar videos, excluding the original
    const results = await prisma.$queryRaw<
        Array<{
            id: string
            video_id: string
            similarity: number
        }>
    >`
    SELECT 
      ve.id,
      ve.video_id,
      1 - (ve.embedding <=> ${`[${embeddingArray.join(',')}]`}::vector) as similarity
    FROM video_embeddings ve
    INNER JOIN videos v ON v.id = ve.video_id
    WHERE 
      v.status = 'READY' 
      AND v.visibility = 'PUBLIC'
      AND ve.video_id != ${videoId}
    ORDER BY ve.embedding <=> ${`[${embeddingArray.join(',')}]`}::vector
    LIMIT ${limit}
  `

    const videoIds = results.map((r) => r.video_id)
    const videos = await prisma.video.findMany({
        where: {
            id: { in: videoIds },
        },
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

    return videoIds.map((videoId) => {
        const video = videos.find((v) => v.id === videoId)
        const result = results.find((r) => r.video_id === videoId)
        return {
            ...video,
            similarity: result?.similarity || 0,
        }
    })
}

/**
 * Generate text embedding using OpenAI
 */
export async function generateEmbedding(text: string): Promise<number[]> {
    const response = await fetch('https://api.openai.com/v1/embeddings', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
        },
        body: JSON.stringify({
            model: 'text-embedding-ada-002',
            input: text,
        }),
    })

    const data = await response.json()
    return data.data[0].embedding
}

/**
 * Create or update video embedding
 */
export async function createVideoEmbedding(
    videoId: string,
    embeddingType: EmbeddingType,
    sourceText: string
) {
    const embedding = await generateEmbedding(sourceText)

    return await (prisma.videoEmbedding as any).upsert({
        where: {
            videoId_embeddingType: {
                videoId,
                embeddingType,
            },
        },
        create: {
            videoId,
            embeddingType,
            embedding: `[${embedding.join(',')}]` as any,
            sourceText,
        },
        update: {
            embedding: `[${embedding.join(',')}]` as any,
            sourceText,
        },
    })
}
