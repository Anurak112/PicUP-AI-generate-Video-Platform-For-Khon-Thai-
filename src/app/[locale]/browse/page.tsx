'use client';

import React, { useState, useMemo } from 'react';
import { Search, Sparkles } from 'lucide-react';
import { mockVideos } from '@/data/mockVideos';
import { categories as allCategories, updateCategoryCounts } from '@/data/categories';
import { CategoryDropdown } from '@/components/ui/CategoryDropdown';
import { VideoGrid } from '@/components/video/VideoGrid';
import './browse.css';

export default function BrowsePage() {
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [searchQuery, setSearchQuery] = useState('');
    const [isSemanticSearch, setIsSemanticSearch] = useState(true); // Default to semantic
    const [isLoading, setIsLoading] = useState(false);

    // Update category counts
    const categories = useMemo(() => updateCategoryCounts(mockVideos), []);

    // Filter videos by category and search
    const filteredVideos = useMemo(() => {
        let result = mockVideos;

        // 1. Filter by Category
        if (selectedCategory !== 'all') {
            const category = categories.find(cat => cat.id === selectedCategory);
            if (category) {
                result = result.filter(video =>
                    video.categoryId === category.id ||
                    video.category?.slug === category.slug
                );
            }
        }

        // 2. Filter by Search (Mock semantic search)
        if (searchQuery.trim()) {
            const query = searchQuery.toLowerCase();
            result = result.filter(video => {
                // Simple text matching for mock
                const matchTitle = video.title.toLowerCase().includes(query);
                const matchDesc = video.description?.toLowerCase().includes(query);
                const matchTags = video.tags?.some(tag => tag.name.toLowerCase().includes(query));
                const matchPrompt = video.aiMetadata?.prompt?.toLowerCase().includes(query);

                return matchTitle || matchDesc || matchTags || matchPrompt;
            });
        }

        return result;
    }, [selectedCategory, searchQuery, categories]);

    const handleCategoryChange = (categoryId: string) => {
        setIsLoading(true);
        setSelectedCategory(categoryId);

        // Simulate loading delay
        setTimeout(() => {
            setIsLoading(false);
        }, 300);
    };

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        // Simulate search delay
        setTimeout(() => {
            setIsLoading(false);
        }, 500);
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

                    {/* Search Bar */}
                    <div className="browse-search-section">
                        <form onSubmit={handleSearch} className="search-bar-container">
                            <div className={`search-input-wrapper ${isSemanticSearch ? 'semantic-mode' : ''}`}>
                                <Search className="search-icon" size={20} />
                                <input
                                    type="text"
                                    placeholder={isSemanticSearch ? "Describe the video you want to find..." : "Search details..."}
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className="search-input"
                                />
                                <button
                                    type="button"
                                    className={`semantic-toggle ${isSemanticSearch ? 'active' : ''}`}
                                    onClick={() => setIsSemanticSearch(!isSemanticSearch)}
                                    title="Toggle Semantic Search"
                                >
                                    <Sparkles size={16} />
                                    <span>AI Search</span>
                                </button>
                            </div>
                        </form>
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
                        {searchQuery && (
                            <>
                                <span className="count-divider">for</span>
                                <span className="search-term">"{searchQuery}"</span>
                            </>
                        )}
                    </div>
                </div>

                {/* Video Grid */}
                <VideoGrid
                    videos={filteredVideos}
                    layout="grid"
                    isLoading={isLoading}
                    emptyMessage={
                        searchQuery
                            ? `No videos found matching "${searchQuery}"`
                            : `No videos found in ${selectedCat?.name || 'this category'}`
                    }
                    skeletonCount={8}
                />
            </div>
        </div>
    );
}
