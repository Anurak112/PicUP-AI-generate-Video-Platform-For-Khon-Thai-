'use client';

import React from 'react';
import Link from 'next/link';
import { Play, Clock, Eye, Download } from 'lucide-react';
import { useLocale } from 'next-intl';
import { Video } from '@/types/video';
import { formatDuration, formatViews, getRelativeTime } from '@/data/mockVideos';
import './VideoCard.css';

export interface VideoCardProps {
    video: Video;
    variant?: 'default' | 'large' | 'compact';
    showActions?: boolean;
}

export const VideoCard: React.FC<VideoCardProps> = ({
    video,
    variant = 'default',
    showActions = true
}) => {
    const locale = useLocale();

    // derived/fallback values
    const duration = Number(video.duration) || 0;
    const thumbnail = video.thumbnailUrl || video.thumbnail || '/api/placeholder/400/225';
    const modelName = video.aiMetadata?.modelName || 'AI Generated';
    const uploadDate = typeof video.createdAt === 'string' ? new Date(video.createdAt) : video.createdAt;

    // Technical info extraction (fallback mock logic if files empty)
    const resolution = video.files && video.files.length > 0
        ? `${video.files[0].width}x${video.files[0].height}`
        : '1080p';
    const fps = video.files && video.files.length > 0
        ? video.files[0].fps
        : 30;

    return (
        <Link
            href={`/${locale}/video/${video.id}`}
            className={`video-card video-card-${variant}`}
        >
            {/* Thumbnail */}
            <div className="video-card-thumbnail">
                <img
                    src={thumbnail}
                    alt={video.title}
                    loading="lazy"
                />

                {/* Play Overlay */}
                <div className="video-card-overlay">
                    <div className="play-button">
                        <Play size={variant === 'large' ? 48 : 32} fill="white" />
                    </div>
                </div>

                {/* Duration Badge */}
                <div className="video-card-duration">
                    <Clock size={12} />
                    <span>{formatDuration(duration)}</span>
                </div>

                {/* AI Model Badge */}
                <div className="video-card-model">
                    <span className="ai-badge">{modelName}</span>
                </div>

                {/* Quick Actions (on hover) */}
                {showActions && variant !== 'compact' && (
                    <div className="video-card-actions">
                        <button
                            className="action-btn"
                            onClick={(e) => {
                                e.preventDefault();
                                // TODO: Implement download
                            }}
                            aria-label="Download"
                        >
                            <Download size={18} />
                        </button>
                    </div>
                )}
            </div>

            {/* Content */}
            <div className="video-card-content">
                <h3 className="video-card-title">{video.title}</h3>

                <div className="video-card-meta">
                    <span className="meta-item">
                        <Eye size={14} />
                        {formatViews(Number(video.viewCount) || 0)}
                    </span>
                    <span className="meta-divider">•</span>
                    <span className="meta-item">
                        {getRelativeTime(uploadDate)}
                    </span>
                </div>

                {variant === 'large' && video.description && (
                    <p className="video-card-description">{video.description}</p>
                )}

                {variant === 'compact' && (
                    <div className="video-card-compact-info">
                        <span className="resolution-badge">{resolution}</span>
                        <span className="fps-badge">{fps}fps</span>
                    </div>
                )}

                {/* Tags (only for large variant) */}
                {variant === 'large' && video.tags && video.tags.length > 0 && (
                    <div className="video-card-tags">
                        {video.tags.slice(0, 3).map((tag) => (
                            <span key={tag.id} className="tag">#{tag.name}</span>
                        ))}
                    </div>
                )}
            </div>
        </Link>
    );
};
