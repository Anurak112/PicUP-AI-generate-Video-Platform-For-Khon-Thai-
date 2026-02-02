import React from 'react';
import Link from 'next/link';
import { Github, Twitter, Mail } from 'lucide-react';
import { useTranslations, useLocale } from 'next-intl';
import { DonationSection } from '../sections/DonationSection';
import './Footer.css';

export const Footer: React.FC = () => {
    const t = useTranslations('footer');
    const locale = useLocale();

    return (
        <footer className="footer">
            <div className="container">
                <DonationSection />
                <div className="footer-content">
                    {/* Brand Section */}
                    <div className="footer-section">
                        <h3 className="gradient-text">{t('brand')}</h3>
                        <p className="footer-description">
                            {t('description')}
                            <br />
                            {t('tagline')}
                        </p>
                        <div className="footer-social">
                            <a href="https://github.com" className="footer-social-link" aria-label="GitHub">
                                <Github size={20} />
                            </a>
                            <a href="https://twitter.com" className="footer-social-link" aria-label="Twitter">
                                <Twitter size={20} />
                            </a>
                            <a href="mailto:hello@picup.ai" className="footer-social-link" aria-label="Email">
                                <Mail size={20} />
                            </a>
                        </div>
                    </div>

                    {/* Platform Links */}
                    <div className="footer-section">
                        <h4 className="footer-heading">{t('platform')}</h4>
                        <ul className="footer-links">
                            <li><Link href={`/${locale}/browse`}>{t('links.browseVideos')}</Link></li>
                            <li><Link href={`/${locale}/categories`}>{t('links.categories')}</Link></li>
                            <li><Link href={`/${locale}/upload`}>{t('links.upload')}</Link></li>
                            <li><Link href={`/${locale}/api`}>{t('links.api')}</Link></li>
                        </ul>
                    </div>

                    {/* Resources Links */}
                    <div className="footer-section">
                        <h4 className="footer-heading">{t('resources')}</h4>
                        <ul className="footer-links">
                            <li><Link href={`/${locale}/docs`}>{t('links.documentation')}</Link></li>
                            <li><Link href={`/${locale}/blog`}>{t('links.blog')}</Link></li>
                            <li><Link href={`/${locale}/guides`}>{t('links.guides')}</Link></li>
                            <li><Link href={`/${locale}/support`}>{t('links.support')}</Link></li>
                        </ul>
                    </div>

                    {/* Legal Links */}
                    <div className="footer-section">
                        <h4 className="footer-heading">{t('legal')}</h4>
                        <ul className="footer-links">
                            <li><Link href={`/${locale}/privacy`}>{t('links.privacy')}</Link></li>
                            <li><Link href={`/${locale}/terms`}>{t('links.terms')}</Link></li>
                            <li><Link href={`/${locale}/licenses`}>{t('links.licenses')}</Link></li>
                            <li><Link href={`/${locale}/dmca`}>{t('links.dmca')}</Link></li>
                        </ul>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="footer-bottom">
                    <p className="footer-copyright">
                        {t('copyright')}
                    </p>
                </div>
            </div>
        </footer>
    );
};
