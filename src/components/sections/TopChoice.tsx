'use client';

import React from 'react';
import { useTranslations } from 'next-intl';
import { ChevronRight } from 'lucide-react';
import { ToolCard } from './ToolCard';
import './TopChoice.css';

export const TopChoice: React.FC = () => {
    const t = useTranslations('topChoice');

    const templates = [
        { id: 'nanoBanana', title: t('nanoBanana'), image: 'https://images.unsplash.com/photo-1481349518771-20055b2a7b24?auto=format&fit=crop&q=80&w=400', badge: 'Unlimited' },
        { id: 'klingMotion', title: t('klingMotion'), image: 'https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?auto=format&fit=crop&q=80&w=400', badge: 'New' },
        { id: 'aiInfluencer', title: t('aiInfluencer'), image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=400', badge: 'New' },
        { id: 'skinEnhancer', title: t('skinEnhancer'), image: 'https://images.unsplash.com/photo-1596704017254-9b121068fb2a?auto=format&fit=crop&q=80&w=400', badge: 'Pro' },
        { id: 'kling26', title: t('kling26'), image: 'https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?auto=format&fit=crop&q=80&w=400' },
        { id: 'angles20', title: t('angles20'), image: 'https://images.unsplash.com/photo-1536440136628-849c177e76a1?auto=format&fit=crop&q=80&w=400', badge: 'Pro' },
        { id: 'faceSwap', title: t('faceSwap'), image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=400' },
    ];

    return (
        <section className="top-choice">
            <div className="container">
                <div className="top-choice-header">
                    <div className="top-choice-title-group">
                        <h2 className="top-choice-title">{t('title')}</h2>
                        <p className="top-choice-subtitle">{t('subtitle')}</p>
                    </div>
                    <button className="see-all-btn">
                        {t('seeAll')}
                        <ChevronRight size={16} />
                    </button>
                </div>
                <div className="top-choice-grid">
                    {templates.map((template) => (
                        <ToolCard
                            key={template.id}
                            title={template.title}
                            image={template.image}
                            badge={template.badge}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
};
