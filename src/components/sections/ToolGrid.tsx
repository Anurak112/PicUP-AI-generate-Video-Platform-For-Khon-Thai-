'use client';

import React from 'react';
import { useTranslations } from 'next-intl';
import { ToolCard } from './ToolCard';
import './ToolGrid.css';

export const ToolGrid: React.FC = () => {
    const t = useTranslations('toolGrid');

    const tools = [
        { id: 'createImage', title: t('createImage'), image: 'https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?auto=format&fit=crop&q=80&w=400', hasUpload: true },
        { id: 'createVideo', title: t('createVideo'), image: 'https://images.unsplash.com/photo-1536240478700-b869070f9279?auto=format&fit=crop&q=80&w=400', hasUpload: true },
        { id: 'motionControl', title: t('motionControl'), image: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&q=80&w=400' },
        { id: 'editImage', title: t('editImage'), image: 'https://images.unsplash.com/photo-1542744094-24638eff58bb?auto=format&fit=crop&q=80&w=400' },
        { id: 'nanoBanana', title: t('nanoBanana'), image: 'https://images.unsplash.com/photo-1481349518771-20055b2a7b24?auto=format&fit=crop&q=80&w=400', badge: 'Unlimited' },
        { id: 'klingVideo', title: t('klingVideo'), image: 'https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?auto=format&fit=crop&q=80&w=400' },
        { id: 'upscale', title: t('upscale'), image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=400' },
    ];

    const handleUpload = (id: string, file: File) => {
        console.log(`Uploading reference media for ${id}:`, file.name);
        // Integrate with studio flow in a real app
    };

    return (
        <div className="tool-grid-container">
            <div className="tool-grid">
                {tools.map((tool) => (
                    <ToolCard
                        key={tool.id}
                        title={tool.title}
                        image={tool.image}
                        badge={tool.badge}
                        hasUpload={tool.hasUpload}
                        onUpload={(file) => handleUpload(tool.id, file)}
                    />
                ))}
            </div>
        </div>
    );
};
