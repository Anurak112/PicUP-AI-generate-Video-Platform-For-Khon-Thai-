'use client';

import { useLocale } from 'next-intl';
import { usePathname, useRouter } from 'next/navigation';
import { Globe } from 'lucide-react';
import { useState } from 'react';
import './LanguageSwitcher.css';

const languages = [
    { code: 'en', name: 'English', flag: '🇬🇧' },
    { code: 'th', name: 'ไทย', flag: '🇹🇭' },
    { code: 'lo', name: 'ລາວ', flag: '🇱🇦' },
    { code: 'fr', name: 'Français', flag: '🇫🇷' },
];

export function LanguageSwitcher() {
    const locale = useLocale();
    const router = useRouter();
    const pathname = usePathname();
    const [isOpen, setIsOpen] = useState(false);

    const switchLocale = (newLocale: string) => {
        // Replace the locale in the pathname
        const segments = pathname.split('/');
        segments[1] = newLocale;
        const newPath = segments.join('/');

        router.push(newPath);
        setIsOpen(false);
    };

    const currentLanguage = languages.find(l => l.code === locale);

    return (
        <div className="language-switcher">
            <button
                className="language-trigger"
                onClick={() => setIsOpen(!isOpen)}
                aria-label="Switch language"
            >
                <Globe size={18} />
                <span className="language-flag">{currentLanguage?.flag}</span>
            </button>

            {isOpen && (
                <>
                    <div className="language-overlay" onClick={() => setIsOpen(false)} />
                    <div className="language-dropdown">
                        {languages.map((lang) => (
                            <button
                                key={lang.code}
                                onClick={() => switchLocale(lang.code)}
                                className={`language-option ${locale === lang.code ? 'active' : ''}`}
                            >
                                <span className="language-option-flag">{lang.flag}</span>
                                <span className="language-option-name">{lang.name}</span>
                                {locale === lang.code && <span className="language-check">✓</span>}
                            </button>
                        ))}
                    </div>
                </>
            )}
        </div>
    );
}
