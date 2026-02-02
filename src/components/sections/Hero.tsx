import React from 'react';
import { Search, Sparkles } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { Button } from '../ui/Button';
import { ToolGrid } from './ToolGrid';
import './Hero.css';

export const Hero: React.FC = () => {
    const t = useTranslations('hero');

    return (
        <section className="hero">
            <div className="container">
                <div className="hero-layout">
                    <div className="hero-text-content">
                        <h1 className="hero-title">
                            {t('title')}
                            <br />
                            <span className="gradient-text">{t('titleGradient')}</span>
                        </h1>
                        <p className="hero-description">
                            {t('description')}
                        </p>
                        <Button variant="primary" size="md" className="explore-all-btn">
                            {t('exploreButton')}
                            <Sparkles size={16} />
                        </Button>
                    </div>

                    <div className="hero-tools-section">
                        <ToolGrid />
                    </div>
                </div>
            </div>

            {/* Background Gradient */}
            <div className="hero-gradient"></div>
        </section>
    );
};
