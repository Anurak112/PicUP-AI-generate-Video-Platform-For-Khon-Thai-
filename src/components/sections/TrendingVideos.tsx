'use client';

import React, { useState } from 'react';
import { TrendingUp, Flame, Clock, ChevronDown } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { VideoCard } from '../ui/VideoCard';
import './TrendingVideos.css';

interface Video {
    id: string;
    thumbnail: string;
    title: string;
    creator: string;
    views: string;
    duration: string;
    category: string;
}

const mockVideos: Video[] = [
    {
        id: '1',
        thumbnail: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=600&h=340&fit=crop',
        title: 'Cyberpunk City Animation',
        creator: 'AI Artist Pro',
        views: '125K',
        duration: '0:30',
        category: 'Sci-Fi',
    },
    {
        id: '2',
        thumbnail: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=600&h=340&fit=crop',
        title: 'Abstract Flow Motion Graphics',
        creator: 'MotionMaster',
        views: '98K',
        duration: '0:45',
        category: 'Abstract',
    },
    {
        id: '3',
        thumbnail: 'https://images.unsplash.com/photo-1633412802994-5c058f151b66?w=600&h=340&fit=crop',
        title: 'Nature Landscape AI Generated',
        creator: 'NatureAI',
        views: '87K',
        duration: '1:00',
        category: 'Nature',
    },
    {
        id: '4',
        thumbnail: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=600&h=340&fit=crop',
        title: 'Geometric Patterns Loop',
        creator: 'PatternGen',
        views: '76K',
        duration: '0:20',
        category: 'Abstract',
    },
    {
        id: '5',
        thumbnail: 'https://images.unsplash.com/photo-1634017839464-5c339bbe3c35?w=600&h=340&fit=crop',
        title: 'Urban Time-lapse',
        creator: 'CityVibes',
        views: '65K',
        duration: '0:35',
        category: 'Urban',
    },
    {
        id: '6',
        thumbnail: 'https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?w=600&h=340&fit=crop',
        title: 'Neon Lights Dance',
        creator: 'NeonDreams',
        views: '54K',
        duration: '0:40',
        category: 'Sci-Fi',
    },
    {
        id: '7',
        thumbnail: 'https://images.unsplash.com/photo-1614850523459-c2f4c699c52e?w=600&h=340&fit=crop',
        title: 'Watercolor Flow',
        creator: 'ArtBot',
        views: '43K',
        duration: '0:50',
        category: 'Artistic',
    },
    {
        id: '8',
        thumbnail: 'https://images.unsplash.com/photo-1635322966219-b75ed372eb01?w=600&h=340&fit=crop',
        title: 'Tech Background Loop',
        creator: 'TechMotion',
        views: '38K',
        duration: '0:25',
        category: 'Technology',
    },
];

export const TrendingVideos: React.FC = () => {
    const t = useTranslations('trending');
    const [sortBy, setSortBy] = useState<'newest' | 'trending'>('trending');
    const [dropdownOpen, setDropdownOpen] = useState(false);

    const sortOptions = [
        { value: 'trending', label: t('sort.trending'), icon: <TrendingUp size={16} /> },
        { value: 'newest', label: t('sort.newest'), icon: <Clock size={16} /> },
    ];

    const selectedOption = sortOptions.find(opt => opt.value === sortBy) || sortOptions[0];

    return (
        <section className="trending-section section">
            <div className="container">
                {/* Header */}
                <div className="trending-header">
                    <div className="trending-title-wrapper">
                        <Flame size={32} className="trending-icon" />
                        <h1 className="trending-title">{t('title')}</h1>
                    </div>
                    <p className="trending-subtitle">{t('subtitle')}</p>
                </div>

                {/* Sort Dropdown */}
                <div className="trending-sort">
                    <span className="sort-label">{t('sort.label')}</span>
                    <div className={`dropdown ${dropdownOpen ? 'open' : ''}`}>
                        <button
                            className="dropdown-toggle"
                            onClick={() => setDropdownOpen(!dropdownOpen)}
                            onBlur={() => setTimeout(() => setDropdownOpen(false), 200)}
                        >
                            <span className="dropdown-content">
                                {selectedOption.icon}
                                {selectedOption.label}
                            </span>
                            <ChevronDown size={16} className={`dropdown-arrow ${dropdownOpen ? 'open' : ''}`} />
                        </button>
                        <div className="dropdown-menu">
                            {sortOptions.map((option) => (
                                <button
                                    key={option.value}
                                    className={`dropdown-item ${sortBy === option.value ? 'active' : ''}`}
                                    onClick={() => {
                                        setSortBy(option.value as 'newest' | 'trending');
                                        setDropdownOpen(false);
                                    }}
                                >
                                    <span className="dropdown-item-content">
                                        {option.icon}
                                        {option.label}
                                    </span>
                                    {sortBy === option.value && <span className="dropdown-check">✓</span>}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Video Grid */}
                <div className="video-grid">
                    {mockVideos.map((video) => (
                        <VideoCard key={video.id} {...video} />
                    ))}
                </div>

                {/* Load More Button */}
                <div className="trending-actions">
                    <button className="load-more-btn">
                        {t('loadMore')}
                    </button>
                </div>
            </div>
        </section>
    );
};
