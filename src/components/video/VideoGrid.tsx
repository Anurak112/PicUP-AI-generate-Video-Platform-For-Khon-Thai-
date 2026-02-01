'use client';

import React from 'react';
import { Video } from '@/types/video';
import { VideoCard } from './VideoCard';
import { VideoCardSkeleton } from './VideoCardSkeleton';
import './VideoGrid.css';

export interface VideoGridProps {
    videos: Video[];
    layout?: 'grid' | 'masonry' | 'list';
    columns?: number;
    isLoading?: boolean;
    emptyMessage?: string;
    showSkeleton?: boolean;
    skeletonCount?: number;
}

export const VideoGrid: React.FC<VideoGridProps> = ({
    videos,
    layout = 'grid',
    columns,
    isLoading = false,
    emptyMessage = 'No videos found',
    showSkeleton = true,
    skeletonCount = 8
}) => {
    // Show skeleton loading state
    if (isLoading && showSkeleton) {
        return (
            <div className={`video-grid video-grid-${layout}`} style={{ '--grid-columns': columns } as React.CSSProperties}>
                {Array.from({ length: skeletonCount }).map((_, index) => (
                    <VideoCardSkeleton key={index} variant={layout === 'list' ? 'compact' : 'default'} />
                ))}
            </div>
        );
    }

    // Show empty state
    if (!videos || videos.length === 0) {
        return (
            <div className="video-grid-empty">
                <div className="empty-state">
                    <svg
                        className="empty-icon"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"
                        />
                    </svg>
                    <p className="empty-message">{emptyMessage}</p>
                </div>
            </div>
        );
    }

    // Render video grid
    return (
        <div
            className={`video-grid video-grid-${layout}`}
            style={{ '--grid-columns': columns } as React.CSSProperties}
        >
            {videos.map((video) => (
                <VideoCard
                    key={video.id}
                    video={video}
                    variant={layout === 'list' ? 'compact' : 'default'}
                />
            ))}
        </div>
    );
};
