import React from 'react';
import { Search, Sparkles } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { Button } from '../ui/Button';
import './Hero.css';

export const Hero: React.FC = () => {
    const t = useTranslations('hero');

    return (
        <section className="hero">
            <div className="container">
                <div className="hero-content">
                    {/* Badge */}
                    <div className="hero-badge">
                        <Sparkles size={16} />
                        <span>{t('badge', { count: '10,000' })}</span>
                    </div>

                    {/* Headline */}
                    <h1 className="hero-title">
                        {t('title')}
                        <br />
                        <span className="gradient-text">{t('titleGradient')}</span>
                    </h1>

                    {/* Description */}
                    <p className="hero-description">
                        {t('description')}
                    </p>

                    {/* CTA Buttons */}
                    <div className="hero-actions">
                        <Button variant="primary" size="lg">
                            <Search size={20} />
                            {t('exploreButton')}
                        </Button>
                        <Button variant="secondary" size="lg">
                            {t('learnMore')}
                        </Button>
                    </div>

                    {/* Stats */}
                    <div className="hero-stats">
                        <div className="hero-stat">
                            <div className="hero-stat-value gradient-text">10K+</div>
                            <div className="hero-stat-label">{t('stats.videos')}</div>
                        </div>
                        <div className="hero-stat">
                            <div className="hero-stat-value gradient-text">50+</div>
                            <div className="hero-stat-label">{t('stats.models')}</div>
                        </div>
                        <div className="hero-stat">
                            <div className="hero-stat-value gradient-text">100%</div>
                            <div className="hero-stat-label">{t('stats.free')}</div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Background Gradient */}
            <div className="hero-gradient"></div>
        </section>
    );
};
