import React from 'react';
import './VideoCard.css';

export const VideoCardSkeleton: React.FC<{ variant?: 'default' | 'large' | 'compact' }> = ({
    variant = 'default'
}) => {
    return (
        <div className={`video-card video-card-${variant} video-card-skeleton`}>
            <div className="video-card-thumbnail skeleton-shimmer" />
            <div className="video-card-content">
                <div className="skeleton-title skeleton-shimmer" />
                <div className="skeleton-meta skeleton-shimmer" />
                {variant === 'large' && (
                    <>
                        <div className="skeleton-description skeleton-shimmer" />
                        <div className="skeleton-tags">
                            <div className="skeleton-tag skeleton-shimmer" />
                            <div className="skeleton-tag skeleton-shimmer" />
                            <div className="skeleton-tag skeleton-shimmer" />
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};
