'use client';

import React from 'react';
import { Heart, Copy, Check } from 'lucide-react';
import './DonationSection.css';

interface CryptoAddressProps {
    label: string;
    address: string;
}

const CryptoAddress: React.FC<CryptoAddressProps> = ({ label, address }) => {
    const [copied, setCopied] = React.useState(false);

    const copyToClipboard = () => {
        navigator.clipboard.writeText(address);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="crypto-address-item">
            <span className="crypto-label">{label}:</span>
            <code className="crypto-address">{address}</code>
            <button
                className={`copy-button ${copied ? 'copied' : ''}`}
                onClick={copyToClipboard}
                title="Copy to clipboard"
            >
                {copied ? <Check size={16} /> : <Copy size={16} />}
            </button>
        </div>
    );
};

export const DonationSection: React.FC = () => {
    return (
        <section className="donation-section">
            <div className="donation-card">
                <div className="donation-icon">
                    <Heart size={48} fill="currentColor" />
                </div>
                <h2 className="donation-title">Support Pixel AI</h2>
                <p className="donation-description">
                    Help us keep the terminal vibes flowing and the AI renders coming.
                    Support the team so we can keep hacking on your favorite AI video platform.
                </p>

                <div className="crypto-addresses">
                    <CryptoAddress label="BTC" address="bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh" />
                    <CryptoAddress label="ETH" address="0x71C7656EC7ab88b098defB751B7401B5f6d8976F" />
                    <CryptoAddress label="SOL" address="HN7cABqLseRNo1mYqcS1K8uTC9sW478c1r2YgA5zS4mQ" />
                </div>

                <div className="donation-footer">
                    <p>Pay what you want - one-time or monthly</p>
                </div>
            </div>
        </section>
    );
};
