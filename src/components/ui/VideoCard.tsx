'use client';

import Link from 'next/link';
import { useLocale } from 'next-intl';
import { Play, Eye, Download, Heart } from 'lucide-react';
import { Card } from './Card';
import './VideoCard.css';

interface VideoCardProps {
    id: string;
    thumbnail: string;
    title: string;
    creator: string;
    views: string;
    duration: string;
    category: string;
}

export const VideoCard: React.FC<VideoCardProps> = ({
    id,
    thumbnail,
    title,
    creator,
    views,
    duration,
    category,
}) => {
    const locale = useLocale();

    return (
        <Card variant="glass" hover className="video-card">
            <div className="video-thumbnail">
                <Link href={`/${locale}/videos/${id}`} className="video-thumbnail-link">
                    <img src={thumbnail} alt={title} loading="lazy" />
                    <div className="video-duration">{duration}</div>
                    <div className="video-overlay">
                        <div className="play-button" aria-label="Play video">
                            <Play size={24} fill="white" />
                        </div>
                    </div>
                </Link>
            </div>
            <div className="video-content">
                <div className="video-category">{category}</div>
                <Link href={`/${locale}/videos/${id}`} className="video-title-link">
                    <h3 className="video-title">{title}</h3>
                </Link>
                <div className="video-meta">
                    <span className="video-creator">{creator}</span>
                    <div className="video-stats">
                        <span className="video-stat">
                            <Eye size={14} />
                            {views}
                        </span>
                    </div>
                </div>
                <div className="video-actions">
                    <button className="video-action-btn" aria-label="Download">
                        <Download size={16} />
                    </button>
                    <button className="video-action-btn" aria-label="Like">
                        <Heart size={16} />
                    </button>
                </div>
            </div>
        </Card>
    );
};
