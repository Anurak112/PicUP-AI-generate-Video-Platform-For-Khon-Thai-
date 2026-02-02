import { S3Client, PutObjectCommand, GetObjectCommand, DeleteObjectCommand } from '@aws-sdk/client-s3'
import { getSignedUrl } from '@aws-sdk/s3-request-presigner'

// Initialize R2 client (R2 is S3-compatible)
const r2Client = new S3Client({
    region: 'auto',
    endpoint: `https://${process.env.R2_ACCOUNT_ID}.r2.cloudflarestorage.com`,
    credentials: {
        accessKeyId: process.env.R2_ACCESS_KEY_ID!,
        secretAccessKey: process.env.R2_SECRET_ACCESS_KEY!,
    },
})

const BUCKET_NAME = process.env.R2_BUCKET_NAME!

/**
 * Generate a presigned URL for uploading a file to R2
 */
export async function generateUploadUrl(
    key: string,
    contentType: string,
    expiresIn: number = 900 // 15 minutes
): Promise<string> {
    const command = new PutObjectCommand({
        Bucket: BUCKET_NAME,
        Key: key,
        ContentType: contentType,
    })

    return await getSignedUrl(r2Client, command, { expiresIn })
}

/**
 * Generate a presigned URL for downloading a file from R2
 */
export async function generateDownloadUrl(
    key: string,
    expiresIn: number = 3600 // 1 hour
): Promise<string> {
    const command = new GetObjectCommand({
        Bucket: BUCKET_NAME,
        Key: key,
    })

    return await getSignedUrl(r2Client, command, { expiresIn })
}

/**
 * Delete a file from R2
 */
export async function deleteFile(key: string): Promise<void> {
    const command = new DeleteObjectCommand({
        Bucket: BUCKET_NAME,
        Key: key,
    })

    await r2Client.send(command)
}

/**
 * Generate a storage key for a video file
 */
export function generateStorageKey(
    userId: string,
    videoId: string,
    fileType: string,
    extension: string
): string {
    const timestamp = Date.now()
    return `videos/${userId}/${videoId}/${fileType}_${timestamp}.${extension}`
}

/**
 * Get public CDN URL for a file (if R2 public access is enabled)
 */
export function getPublicUrl(key: string): string {
    return `${process.env.R2_PUBLIC_URL}/${key}`
}

/**
 * Upload a file directly to R2 (for server-side uploads)
 */
export async function uploadFile(
    key: string,
    buffer: Buffer,
    contentType: string
): Promise<void> {
    const command = new PutObjectCommand({
        Bucket: BUCKET_NAME,
        Key: key,
        Body: buffer,
        ContentType: contentType,
    })

    await r2Client.send(command)
}
