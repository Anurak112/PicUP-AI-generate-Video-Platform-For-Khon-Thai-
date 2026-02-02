'use client';

import React from 'react';
import { Share2, Heart, Flag, Copy } from 'lucide-react';
import { Video } from '../../types/video';
import './VideoDetail.css';

interface VideoInfoProps {
    video: Video;
}

export const VideoInfo: React.FC<VideoInfoProps> = ({ video }) => {
    return (
        <div>
            {/* Header */}
            <div className="video-header">
                <h1 className="video-title">{video.title}</h1>
                <div className="video-meta-row">
                    <div className="video-meta-item">
                        <span>{video.views} views</span>
                    </div>
                    <div className="video-meta-item">
                        <span>•</span>
                        <span>{video.createdAt}</span>
                    </div>
                </div>
            </div>

            {/* Actions Row */}
            <div className="primary-actions">
                <button className="action-btn btn-secondary">
                    <Heart size={20} />
                    Like
                </button>
                <button className="action-btn btn-secondary">
                    <Share2 size={20} />
                    Share
                </button>
            </div>

            {/* Creator Profile */}
            <div className="creator-profile">
                <div className="creator-avatar">
                    {video.creator.charAt(0)}
                </div>
                <div className="creator-info">
                    <h4>{video.creator}</h4>
                    <p>AI Video Artist</p>
                </div>
            </div>

            {/* Description */}
            <div style={{ marginTop: '1.5rem', lineHeight: '1.6', color: 'var(--text-secondary)' }}>
                {video.description}
            </div>

            {/* AI Metadata Section */}
            <div className="metadata-section">
                <h3>AI Generation Details</h3>

                <div className="metadata-grid">
                    {/* Prompt */}
                    <div className="metadata-item" style={{ gridColumn: '1 / -1' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <span className="metadata-label">Prompt</span>
                            <button className="btn-icon-small" title="Copy Prompt">
                                <Copy size={14} />
                            </button>
                        </div>
                        <div className="metadata-value prompt-text">
                            {video.prompt || "No prompt provided."}
                        </div>
                    </div>

                    {/* Negative Prompt */}
                    {video.negativePrompt && (
                        <div className="metadata-item" style={{ gridColumn: '1 / -1' }}>
                            <span className="metadata-label">Negative Prompt</span>
                            <div className="metadata-value prompt-text">
                                {video.negativePrompt}
                            </div>
                        </div>
                    )}

                    {/* Model */}
                    <div className="metadata-item">
                        <span className="metadata-label">Model</span>
                        <div className="metadata-value">{video.modelName} {video.modelVersion}</div>
                    </div>

                    {/* Seed */}
                    <div className="metadata-item">
                        <span className="metadata-label">Seed</span>
                        <div className="metadata-value">{video.seed || "-"}</div>
                    </div>

                    {/* Steps */}
                    <div className="metadata-item">
                        <span className="metadata-label">Steps</span>
                        <div className="metadata-value">{video.steps || "-"}</div>
                    </div>

                    {/* Guidance */}
                    <div className="metadata-item">
                        <span className="metadata-label">Guidance</span>
                        <div className="metadata-value">{video.guidanceTrace || "-"}</div>
                    </div>
                </div>
            </div>

            {/* Technical Specs */}
            <div className="metadata-section" style={{ marginTop: '1rem' }}>
                <h3>Technical Specs</h3>
                <div className="metadata-grid" style={{ gridTemplateColumns: 'repeat(3, 1fr)' }}>
                    <div className="metadata-item">
                        <span className="metadata-label">Resolution</span>
                        <div className="metadata-value">{video.resolution}</div>
                    </div>
                    <div className="metadata-item">
                        <span className="metadata-label">FPS</span>
                        <div className="metadata-value">{video.fps}</div>
                    </div>
                    <div className="metadata-item">
                        <span className="metadata-label">Format</span>
                        <div className="metadata-value">{video.format}</div>
                    </div>
                </div>
            </div>

        </div>
    );
};
