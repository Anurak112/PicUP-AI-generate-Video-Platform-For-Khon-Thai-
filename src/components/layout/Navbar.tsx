'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Menu, X, Search, Upload, Sparkles, Layers } from 'lucide-react';
import { useTranslations, useLocale } from 'next-intl';
import { Button } from '../ui/Button';
import { LanguageSwitcher } from '../ui/LanguageSwitcher';
import './Navbar.css';

export const Navbar: React.FC = () => {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const t = useTranslations('nav');
    const locale = useLocale();

    return (
        <nav className="navbar">
            <div className="container">
                <div className="navbar-content">
                    {/* Logo */}
                    <Link href={`/${locale}`} className="navbar-logo">
                        <span className="gradient-text">PicUp</span>
                    </Link>

                    {/* Desktop Navigation */}
                    <div className="navbar-links">
                        <Link href={`/${locale}/studio`} className="navbar-link">
                            <Sparkles size={18} />
                            <span>AI Studio</span>
                        </Link>
                        <Link href={`/${locale}/workflow`} className="navbar-link">
                            <Layers size={18} />
                            <span>{t('workflow')}</span>
                        </Link>
                    </div>

                    {/* Desktop Actions */}
                    <div className="navbar-actions">
                        <button className="navbar-search-btn" aria-label="Search">
                            <Search size={20} />
                        </button>
                        <LanguageSwitcher />
                        <Link href={`/${locale}/upload`}>
                            <Button variant="primary" size="md">
                                <Upload size={18} />
                                {t('upload')}
                            </Button>
                        </Link>
                    </div>

                    {/* Mobile Menu Button */}
                    <button
                        className="navbar-mobile-toggle"
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                        aria-label="Toggle menu"
                    >
                        {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                    </button>
                </div>

                {/* Mobile Menu */}
                {mobileMenuOpen && (
                    <div className="navbar-mobile-menu">
                        <div className="navbar-mobile-links">
                            <Link
                                href={`/${locale}/studio`}
                                className="navbar-mobile-link"
                                onClick={() => setMobileMenuOpen(false)}
                            >
                                <Sparkles size={20} />
                                <span>AI Studio</span>
                            </Link>
                            <Link
                                href={`/${locale}/workflow`}
                                className="navbar-mobile-link"
                                onClick={() => setMobileMenuOpen(false)}
                            >
                                <Layers size={20} />
                                <span>{t('workflow')}</span>
                            </Link>
                        </div>
                        <div className="navbar-mobile-actions">
                            <LanguageSwitcher />
                            <Link href={`/${locale}/upload`} className="w-full">
                                <Button variant="primary" size="md" style={{ width: '100%' }}>
                                    <Upload size={18} />
                                    {t('upload')}
                                </Button>
                            </Link>
                        </div>
                    </div>
                )}
            </div>
        </nav>
    );
};
