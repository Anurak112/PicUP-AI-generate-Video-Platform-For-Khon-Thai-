import React from 'react';
import { VideoPlayer } from '../../../../components/video/VideoPlayer';
import { VideoInfo } from '../../../../components/video/VideoInfo';
import { DownloadOptions } from '../../../../components/video/DownloadOptions';
import { Video, VideoFormat } from '../../../../types/video';
import '../../../../components/video/VideoDetail.css';

// Mock data for the specific video
// In a real app, this would be fetched from the API based on params.id
const mockVideoData: Video = {
    id: '1',
    thumbnail: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=1200&h=675&fit=crop',
    title: 'Cyberpunk City Animation',
    creator: 'AI Artist Pro',
    views: '125K',
    duration: '0:30',
    category: 'Sci-Fi',
    description: 'A futuristic cyberpunk city visualization generated using the latest AI video models. Features neon lights, flying cars, and rain effects.',

    // AI Metadata
    prompt: 'futuristic cyberpunk city, neon lights, rain, flying cars, high detail, 8k, cinematic lighting, photorealistic',
    negativePrompt: 'low quality, blurry, distorted, watermark',
    modelName: 'Sora',
    modelVersion: 'v1.0',
    seed: '123456789',
    steps: 50,
    guidanceTrace: 7.5,

    // Technical
    resolution: '3840x2160',
    fps: 60,
    format: 'MP4',
    size: '150MB',
    createdAt: '2023-10-15',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4' // Public domain sample
};

const mockFormats: VideoFormat[] = [
    { label: 'Original', resolution: '4K', size: '150MB', extension: 'mp4', url: '#' },
    { label: 'Full HD', resolution: '1080p', size: '45MB', extension: 'mp4', url: '#' },
    { label: 'Web Optimized', resolution: '720p', size: '20MB', extension: 'mp4', url: '#' },
];

export default async function VideoDetailPage({
    params,
}: {
    params: Promise<{ id: string }>
}) {
    const { id } = await params;

    // In a real app: const video = await fetchVideo(id);
    const video = mockVideoData;

    return (
        <main className="video-detail-page">
            <VideoPlayer video={video} />

            <div className="video-content-container">
                <div className="video-main-column">
                    <VideoInfo video={video} />
                </div>

                <div className="video-sidebar">
                    <DownloadOptions formats={mockFormats} />
                    {/* Related videos could go here */}
                </div>
            </div>
        </main>
    );
}
