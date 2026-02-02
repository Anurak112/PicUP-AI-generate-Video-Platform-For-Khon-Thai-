'use client';

import React from 'react';
import { Play, Volume2, Maximize2 } from 'lucide-react';
import { Video } from '../../types/video';
import './VideoDetail.css';

interface VideoPlayerProps {
    video: Video;
}

export const VideoPlayer: React.FC<VideoPlayerProps> = ({ video }) => {
    // In a real app, this would be a sophisticated player (e.g., react-player or HLS.js)
    // For MVP, we'll use a standard video tag or a placeholder if no URL is present.

    return (
        <div className="video-player-section">
            <div className="video-player-container">
                {video.videoUrl ? (
                    <video
                        className="video-player-frame"
                        poster={video.thumbnail}
                        controls
                        playsInline
                        autoPlay
                        muted
                    >
                        <source src={video.videoUrl} type="video/mp4" />
                        Your browser does not support the video tag.
                    </video>
                ) : (
                    <div className="video-placeholder">
                        <img src={video.thumbnail} alt={video.title} className="video-player-frame" />
                        <div className="video-overlay centered">
                            <button className="play-button-large">
                                <Play size={48} fill="white" />
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};
