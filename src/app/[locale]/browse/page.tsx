'use client';

import React, { useState, useMemo } from 'react';
import { mockVideos } from '@/data/mockVideos';
import { categories as allCategories, updateCategoryCounts } from '@/data/categories';
import { CategoryDropdown } from '@/components/ui/CategoryDropdown';
import { VideoGrid } from '@/components/video/VideoGrid';
import './browse.css';

export default function BrowsePage() {
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [isLoading, setIsLoading] = useState(false);

    // Update category counts
    const categories = useMemo(() => updateCategoryCounts(mockVideos), []);

    // Filter videos by category
    const filteredVideos = useMemo(() => {
        if (selectedCategory === 'all') {
            return mockVideos;
        }

        const category = categories.find(cat => cat.id === selectedCategory);
        if (!category) return mockVideos;

        return mockVideos.filter(video =>
            video.category?.toLowerCase() === category.name.toLowerCase() ||
            video.tags?.some(tag => tag.toLowerCase() === category.slug.toLowerCase())
        );
    }, [selectedCategory, categories]);

    const handleCategoryChange = (categoryId: string) => {
        setIsLoading(true);
        setSelectedCategory(categoryId);

        // Simulate loading delay
        setTimeout(() => {
            setIsLoading(false);
        }, 300);
    };

    const selectedCat = categories.find(cat => cat.id === selectedCategory);

    return (
        <div className="browse-page">
            <div className="container">
                {/* Header */}
                <div className="browse-header">
                    <div className="browse-title-section">
                        <h1>Browse Videos</h1>
                        <p className="browse-subtitle">
                            Discover amazing AI-generated videos across different styles and categories
                        </p>
                    </div>

                    {/* Category Dropdown */}
                    <div className="browse-filters">
                        <CategoryDropdown
                            categories={categories}
                            selectedCategory={selectedCategory}
                            onSelectCategory={handleCategoryChange}
                            label="Filter by Category"
                        />
                    </div>
                </div>

                {/* Results Info */}
                <div className="browse-results-info">
                    <div className="results-count">
                        <span className="count-number">{filteredVideos.length}</span>
                        <span className="count-text">
                            {filteredVideos.length === 1 ? 'video' : 'videos'}
                        </span>
                        {selectedCategory !== 'all' && (
                            <>
                                <span className="count-divider">in</span>
                                <span className="count-category">
                                    {selectedCat?.icon} {selectedCat?.name}
                                </span>
                            </>
                        )}
                    </div>
                </div>

                {/* Video Grid */}
                <VideoGrid
                    videos={filteredVideos}
                    layout="grid"
                    isLoading={isLoading}
                    emptyMessage={`No videos found in ${selectedCat?.name || 'this category'}`}
                    skeletonCount={8}
                />
            </div>
        </div>
    );
}
