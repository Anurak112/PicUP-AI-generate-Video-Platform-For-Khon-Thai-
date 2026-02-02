'use client';

import React, { useRef } from 'react';
import { ArrowRight, Upload } from 'lucide-react';
import './ToolCard.css';

interface ToolCardProps {
    title: string;
    image: string;
    onClick?: () => void;
    onUpload?: (file: File) => void;
    hasUpload?: boolean;
    badge?: string;
}

export const ToolCard: React.FC<ToolCardProps> = ({
    title,
    image,
    onClick,
    onUpload,
    hasUpload = false,
    badge
}) => {
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleUploadClick = (e: React.MouseEvent) => {
        e.stopPropagation();
        fileInputRef.current?.click();
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file && onUpload) {
            onUpload(file);
        }
    };

    return (
        <div className="tool-card" onClick={onClick}>
            <div className="tool-card-image">
                <img src={image} alt={title} />
                {badge && <span className="tool-card-badge">{badge}</span>}
                {hasUpload && (
                    <button className="tool-card-upload-btn" onClick={handleUploadClick} title="Upload Reference Media">
                        <Upload size={16} />
                        <input
                            type="file"
                            ref={fileInputRef}
                            style={{ display: 'none' }}
                            onChange={handleFileChange}
                            accept="image/*,video/*"
                        />
                    </button>
                )}
            </div>
            <div className="tool-card-footer">
                <span className="tool-card-title">{title}</span>
                <ArrowRight size={16} className="tool-card-arrow" />
            </div>
        </div>
    );
};
