'use client';

import React, { useRef, useEffect, useState } from 'react';
import { Clock, Monitor, Film } from 'lucide-react';
import './Upload.css';

interface VideoPreviewProps {
    file: File;
    onVideoLoad?: (metadata: VideoMetadata) => void;
}

export interface VideoMetadata {
    duration: number;
    width: number;
    height: number;
    aspectRatio: string;
}

export const VideoPreview: React.FC<VideoPreviewProps> = ({ file, onVideoLoad }) => {
    const videoRef = useRef<HTMLVideoElement>(null);
    const [metadata, setMetadata] = useState<VideoMetadata | null>(null);
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);

    useEffect(() => {
        const url = URL.createObjectURL(file);
        setPreviewUrl(url);

        return () => {
            URL.revokeObjectURL(url);
        };
    }, [file]);

    const handleLoadedMetadata = () => {
        const video = videoRef.current;
        if (!video) return;

        const duration = video.duration;
        const width = video.videoWidth;
        const height = video.videoHeight;

        // Calculate aspect ratio
        const gcd = (a: number, b: number): number => (b === 0 ? a : gcd(b, a % b));
        const divisor = gcd(width, height);
        const aspectRatio = `${width / divisor}:${height / divisor}`;

        const meta: VideoMetadata = {
            duration,
            width,
            height,
            aspectRatio,
        };

        setMetadata(meta);
        onVideoLoad?.(meta);
    };

    const formatDuration = (seconds: number): string => {
        const mins = Math.floor(seconds / 60);
        const secs = Math.floor(seconds % 60);
        return `${mins}:${secs.toString().padStart(2, '0')}`;
    };

    const formatResolution = (width: number, height: number): string => {
        if (height >= 2160) return '4K';
        if (height >= 1440) return '2K';
        if (height >= 1080) return '1080p';
        if (height >= 720) return '720p';
        if (height >= 480) return '480p';
        return `${width}×${height}`;
    };

    if (!previewUrl) return null;

    return (
        <div className="video-preview-container">
            <video
                ref={videoRef}
                className="video-preview"
                src={previewUrl}
                controls
                onLoadedMetadata={handleLoadedMetadata}
            />

            {metadata && (
                <div className="video-preview-info">
                    <div className="video-preview-stat">
                        <span className="video-preview-stat-label">
                            <Clock size={12} style={{ marginRight: 4, display: 'inline' }} />
                            Duration
                        </span>
                        <span className="video-preview-stat-value">
                            {formatDuration(metadata.duration)}
                        </span>
                    </div>
                    <div className="video-preview-stat">
                        <span className="video-preview-stat-label">
                            <Monitor size={12} style={{ marginRight: 4, display: 'inline' }} />
                            Resolution
                        </span>
                        <span className="video-preview-stat-value">
                            {formatResolution(metadata.width, metadata.height)}
                        </span>
                    </div>
                    <div className="video-preview-stat">
                        <span className="video-preview-stat-label">
                            <Film size={12} style={{ marginRight: 4, display: 'inline' }} />
                            Aspect Ratio
                        </span>
                        <span className="video-preview-stat-value">
                            {metadata.aspectRatio}
                        </span>
                    </div>
                </div>
            )}
        </div>
    );
};
