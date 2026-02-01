import React from 'react';
import { mockVideos } from '@/data/mockVideos';
import { VideoCard } from '@/components/video/VideoCard';
import { VideoCardSkeleton } from '@/components/video/VideoCardSkeleton';
import './components-showcase.css';

export default function ComponentsShowcasePage() {
    return (
        <div className="showcase-page">
            <div className="container">
                {/* Header */}
                <div className="showcase-header">
                    <h1 className="gradient-text">Video Card Components</h1>
                    <p>Showcasing different variants and states of the VideoCard component</p>
                </div>

                {/* Default Variant */}
                <section className="showcase-section">
                    <h2>Default Variant</h2>
                    <p className="section-description">Standard video cards in a responsive grid (280x180px)</p>
                    <div className="video-grid">
                        {mockVideos.slice(0, 4).map((video) => (
                            <VideoCard key={video.id} video={video} variant="default" />
                        ))}
                    </div>
                </section>

                {/* Large Variant */}
                <section className="showcase-section">
                    <h2>Large Variant</h2>
                    <p className="section-description">Featured video cards with description and tags (400x260px)</p>
                    <div className="video-grid video-grid-large">
                        {mockVideos.slice(0, 2).map((video) => (
                            <VideoCard key={video.id} video={video} variant="large" />
                        ))}
                    </div>
                </section>

                {/* Compact Variant */}
                <section className="showcase-section">
                    <h2>Compact Variant</h2>
                    <p className="section-description">List view with horizontal layout</p>
                    <div className="video-list">
                        {mockVideos.slice(0, 3).map((video) => (
                            <VideoCard key={video.id} video={video} variant="compact" />
                        ))}
                    </div>
                </section>

                {/* Loading States */}
                <section className="showcase-section">
                    <h2>Loading States (Skeletons)</h2>
                    <p className="section-description">Skeleton screens while content loads</p>
                    <div className="video-grid">
                        <VideoCardSkeleton variant="default" />
                        <VideoCardSkeleton variant="default" />
                        <VideoCardSkeleton variant="default" />
                        <VideoCardSkeleton variant="default" />
                    </div>
                </section>

                {/* Mixed Grid */}
                <section className="showcase-section">
                    <h2>Mixed Layout</h2>
                    <p className="section-description">Combining different variants in one grid</p>
                    <div className="video-grid video-grid-mixed">
                        <div className="grid-featured">
                            <VideoCard video={mockVideos[0]} variant="large" />
                        </div>
                        <div className="grid-standard">
                            {mockVideos.slice(1, 5).map((video) => (
                                <VideoCard key={video.id} video={video} variant="default" />
                            ))}
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
}
