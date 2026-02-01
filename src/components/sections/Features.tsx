import React from 'react';
import { Layers, Zap, Shield, Code } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { Card } from '../ui/Card';
import './Features.css';

export const Features: React.FC = () => {
    const t = useTranslations('features');

    const features = [
        {
            icon: <Layers size={24} />,
            title: t('library.title'),
            description: t('library.description'),
        },
        {
            icon: <Zap size={24} />,
            title: t('fast.title'),
            description: t('fast.description'),
        },
        {
            icon: <Shield size={24} />,
            title: t('licensed.title'),
            description: t('licensed.description'),
        },
        {
            icon: <Code size={24} />,
            title: t('api.title'),
            description: t('api.description'),
        },
    ];

    return (
        <section className="features section">
            <div className="container">
                <div className="features-header">
                    <h2 className="features-title">
                        {t('title', { brand: <span className="gradient-text">PicUp</span> })}
                    </h2>
                    <p className="features-description">
                        {t('subtitle')}
                    </p>
                </div>

                <div className="features-grid">
                    {features.map((feature, index) => (
                        <Card key={index} variant="glass" hover className="feature-card">
                            <div className="feature-icon">{feature.icon}</div>
                            <h3 className="feature-title">{feature.title}</h3>
                            <p className="feature-description">{feature.description}</p>
                        </Card>
                    ))}
                </div>
            </div>
        </section>
    );
};
