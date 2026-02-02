'use client';

import React, { useState } from 'react';
import { Download, ChevronDown, Check } from 'lucide-react';
import { VideoFormat } from '../../types/video';
import './VideoDetail.css';

interface DownloadOptionsProps {
    formats: VideoFormat[];
}

export const DownloadOptions: React.FC<DownloadOptionsProps> = ({ formats }) => {
    const [isOpen, setIsOpen] = useState(false);

    // Default to the first format (usually highest quality or original)
    const handleDownload = (format: VideoFormat) => {
        // In a real app, this would trigger a download via a signed URL
        console.log(`Downloading ${format.label} (${format.resolution})`);

        // Simulating download link click
        const link = document.createElement('a');
        link.href = format.url;
        link.download = `video-${format.resolution}.${format.extension}`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        setIsOpen(false);
    };

    return (
        <div className="sidebar-actions">
            <div className="action-card">
                <h3 className="download-label" style={{ marginBottom: '1rem' }}>Free Download</h3>
                <div className="download-options">
                    {formats.map((format, index) => (
                        <button
                            key={index}
                            className="download-btn"
                            onClick={() => handleDownload(format)}
                        >
                            <div className="download-info">
                                <span className="download-label">{format.label}</span>
                                <span className="download-specs">{format.resolution} • {format.extension} • {format.size}</span>
                            </div>
                            <Download size={18} />
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
};
