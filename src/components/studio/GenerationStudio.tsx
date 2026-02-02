'use client';

import React, { useState } from 'react';
import {
    Paintbrush,
    Video,
    Image as ImageIcon,
    ChevronRight,
    Layers,
    Camera,
    Sparkles,
    Info,
    X,
    Check
} from 'lucide-react';
import './GenerationStudio.css';

// Selection types based on the user's workflow image
type Category = 'subject' | 'environment' | 'cinematic' | 'style';

interface Option {
    id: string;
    label: string;
    description: string;
    promptSnippet: string;
    icon?: React.ReactNode;
}

const SUBJECT_OPTIONS: Option[] = [
    { id: 'city', label: 'Futuristic City', description: 'Neon-lit skyscrapers and flying vehicles', promptSnippet: 'futuristic cyberpunk city with neon lights and flying cars' },
    { id: 'human', label: 'AI Android', description: 'Sleek robotic figure with human-like features', promptSnippet: 'sleek humanoid android with glowing circuits' },
    { id: 'nature', label: 'Alien Forest', description: 'Bioluminescent plants and exotic wildlife', promptSnippet: 'alien forest with bioluminescent plants and crystalline trees' },
    { id: 'abstract', label: 'Liquid Metal', description: 'Morphing shapes made of chrome-like fluid', promptSnippet: 'morphic liquid metal sculpture flowing through space' },
];

const ENVIRONMENT_OPTIONS: Option[] = [
    { id: 'night', label: 'Midnight Rain', description: 'Dark, wet surfaces with bright reflections', promptSnippet: 'at midnight during a heavy rainstorm with puddles and reflections' },
    { id: 'day', label: 'Golden Hour', description: 'Warm, cinematic sunlight', promptSnippet: 'during golden hour with long shadows and warm hazy sunlight' },
    { id: 'outer_space', label: 'Deep Space', description: 'Nebulas and distant stars as backdrop', promptSnippet: 'floating in deep space surrounded by colorful nebulae and stars' },
    { id: 'underwater', label: 'Deep Ocean', description: 'Dark blue water with floating particles', promptSnippet: 'deep underwater with sun rays piercing through the surface' },
];

const CINEMATIC_OPTIONS: Option[] = [
    { id: 'drone', label: 'Drone Shot', description: 'Wide aerial perspective', promptSnippet: 'cinematic drone shot, high angle, grand scale' },
    { id: 'macro', label: 'Macro Detail', description: 'Extreme close-up', promptSnippet: 'extreme macro close-up, shallow depth of field, sharp detail' },
    { id: 'anamorphic', label: 'Anamorphic', description: 'Wide cinematic lens with blue flares', promptSnippet: 'anamorphic lens, cinematic wide aspect ratio, subtle blue lens flares' },
    { id: 'pov', label: 'POV', description: 'First-person perspective', promptSnippet: 'first-person point of view, immersive camera movement' },
];

const STYLE_OPTIONS: Option[] = [
    { id: 'photoreal', label: 'Photorealistic', description: 'Indistinguishable from reality', promptSnippet: 'photorealistic, 8k, highly detailed, raw photography style' },
    { id: 'anime', label: 'Cyberpunk Anime', description: 'Stylized 2D aesthetic', promptSnippet: 'cyberpunk anime style, vibrant colors, clean lines, studio ghibli aesthetic' },
    { id: '3d_render', label: '3D Render', description: 'Clean C4D/Octane look', promptSnippet: '3D render, Octane render style, clean textures, smooth surfaces' },
    { id: 'glitch', label: 'Glitch Art', description: 'Digital distortion and chromatic aberration', promptSnippet: 'glitch art style, digital distortion, chromatic aberration, retro-futuristic' },
];

import { startGeneration } from '@/app/[locale]/studio/actions';

export const GenerationStudio: React.FC = () => {
    const [genType, setGenType] = useState<'IMAGE' | 'VIDEO'>('VIDEO');
    const [selections, setSelections] = useState<Record<Category, string>>({
        subject: SUBJECT_OPTIONS[0].id,
        environment: ENVIRONMENT_OPTIONS[0].id,
        cinematic: CINEMATIC_OPTIONS[0].id,
        style: STYLE_OPTIONS[0].id,
    });

    const [isGenerating, setIsGenerating] = useState(false);
    const [progress, setProgress] = useState(0);
    const [resultUrl, setResultUrl] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);

    const handleSelect = (category: Category, id: string) => {
        setSelections(prev => ({ ...prev, [category]: id }));
    };

    const getSelected = (category: Category) => {
        const options = {
            subject: SUBJECT_OPTIONS,
            environment: ENVIRONMENT_OPTIONS,
            cinematic: CINEMATIC_OPTIONS,
            style: STYLE_OPTIONS,
        }[category];
        return options.find(o => o.id === selections[category]) || options[0];
    };

    // Construct final prompt automatically
    const finalPrompt = [
        getSelected('subject').promptSnippet,
        getSelected('environment').promptSnippet,
        getSelected('cinematic').promptSnippet,
        getSelected('style').promptSnippet,
    ].join(', ');

    const handleGenerate = async () => {
        setIsGenerating(true);
        setProgress(0);
        setResultUrl(null);
        setError(null);

        // Simulating front-end progress while the API works
        const interval = setInterval(() => {
            setProgress(prev => {
                if (prev >= 95) {
                    clearInterval(interval);
                    return 95;
                }
                return prev + 5;
            });
        }, 800);

        try {
            const response = await startGeneration({
                prompt: finalPrompt,
                type: genType,
                subject: getSelected('subject').label,
                environment: getSelected('environment').label,
                cinematic: getSelected('cinematic').label,
                style: getSelected('style').label,
            });

            if (response.success && response.data) {
                setResultUrl(response.data.url);
                setProgress(100);
            } else {
                setError(response.error || 'Generation failed');
            }
        } catch (err: any) {
            setError(err.message || 'An unexpected error occurred');
        } finally {
            setIsGenerating(false);
            clearInterval(interval);
        }
    };

    return (
        <section className="studio-section">
            <div className="container">
                <div className="studio-header">
                    <h1 className="gradient-text">AI Generation Studio</h1>
                    <p className="studio-subtitle">Transform your ideas into cinematic reality with structured AI prompting.</p>
                </div>

                <div className="studio-layout">
                    {/* Left Panel: Controls */}
                    <div className="studio-controls">
                        {/* Type Toggle */}
                        <div className="type-toggle">
                            <button
                                className={`type-btn ${genType === 'VIDEO' ? 'active' : ''}`}
                                onClick={() => setGenType('VIDEO')}
                            >
                                <Video size={20} />
                                Video
                            </button>
                            <button
                                className={`type-btn ${genType === 'IMAGE' ? 'active' : ''}`}
                                onClick={() => setGenType('IMAGE')}
                            >
                                <ImageIcon size={20} />
                                Image
                            </button>
                        </div>

                        {/* Category Selectors */}
                        <div className="category-group">
                            <label className="group-label">
                                <Sparkles size={16} />
                                1. Subject (ตัวละคร/วัตถุ)
                            </label>
                            <div className="options-grid">
                                {SUBJECT_OPTIONS.map(opt => (
                                    <button
                                        key={opt.id}
                                        className={`option-card ${selections.subject === opt.id ? 'active' : ''}`}
                                        onClick={() => handleSelect('subject', opt.id)}
                                    >
                                        <div className="option-title">{opt.label}</div>
                                        {selections.subject === opt.id && <Check size={14} className="check-icon" />}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div className="category-group">
                            <label className="group-label">
                                <Layers size={16} />
                                2. Environment (สถานที่/บรรยากาศ)
                            </label>
                            <div className="options-grid">
                                {ENVIRONMENT_OPTIONS.map(opt => (
                                    <button
                                        key={opt.id}
                                        className={`option-card ${selections.environment === opt.id ? 'active' : ''}`}
                                        onClick={() => handleSelect('environment', opt.id)}
                                    >
                                        <div className="option-title">{opt.label}</div>
                                        {selections.environment === opt.id && <Check size={14} className="check-icon" />}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div className="category-group">
                            <label className="group-label">
                                <Camera size={16} />
                                3. Cinematic (กล้อง/แสง/เลนส์)
                            </label>
                            <div className="options-grid">
                                {CINEMATIC_OPTIONS.map(opt => (
                                    <button
                                        key={opt.id}
                                        className={`option-card ${selections.cinematic === opt.id ? 'active' : ''}`}
                                        onClick={() => handleSelect('cinematic', opt.id)}
                                    >
                                        <div className="option-title">{opt.label}</div>
                                        {selections.cinematic === opt.id && <Check size={14} className="check-icon" />}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div className="category-group">
                            <label className="group-label">
                                <Paintbrush size={16} />
                                4. Style (โทนสี/อารมณ์)
                            </label>
                            <div className="options-grid">
                                {STYLE_OPTIONS.map(opt => (
                                    <button
                                        key={opt.id}
                                        className={`option-card ${selections.style === opt.id ? 'active' : ''}`}
                                        onClick={() => handleSelect('style', opt.id)}
                                    >
                                        <div className="option-title">{opt.label}</div>
                                        {selections.style === opt.id && <Check size={14} className="check-icon" />}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Right Panel: Preview & Prompt */}
                    <div className="studio-preview">
                        <div className="preview-container glass">
                            {isGenerating ? (
                                <div className="generation-loading">
                                    <div className="loading-spinner"></div>
                                    <h3>Generating your {genType.toLowerCase()}...</h3>
                                    <div className="progress-bar-container">
                                        <div className="progress-bar-fill" style={{ width: `${progress}%` }}></div>
                                    </div>
                                    <p>{progress}% complete</p>
                                </div>
                            ) : resultUrl ? (
                                <div className="generation-result">
                                    {genType === 'VIDEO' ? (
                                        <video
                                            src={resultUrl}
                                            controls
                                            autoPlay
                                            loop
                                            className="result-media"
                                        />
                                    ) : (
                                        <img
                                            src={resultUrl}
                                            alt="Generated AI"
                                            className="result-media"
                                        />
                                    )}
                                    <div className="result-overlay">
                                        <div className="success-badge">
                                            <Check size={14} />
                                            Generation Complete
                                        </div>
                                    </div>
                                </div>
                            ) : error ? (
                                <div className="generation-error">
                                    <X size={48} className="error-icon" />
                                    <h3>Generation Failed</h3>
                                    <p>{error}</p>
                                    <button className="retry-btn" onClick={handleGenerate}>Retry</button>
                                </div>
                            ) : (
                                <div className="preview-placeholder">
                                    <Sparkles size={64} className="placeholder-icon" />
                                    <h3>Ready to Generate</h3>
                                    <p>Adjust your settings and click generate to see the results.</p>
                                </div>
                            )}
                        </div>

                        <div className="prompt-viewer glass">
                            <div className="prompt-header">
                                <span><Sparkles size={14} /> Automated Prompt</span>
                                <span className="prompt-type">{genType}</span>
                            </div>
                            <div className="prompt-content">
                                {finalPrompt}
                            </div>
                        </div>

                        <button
                            className="generate-btn"
                            disabled={isGenerating}
                            onClick={handleGenerate}
                        >
                            {isGenerating ? 'Processing...' : `Generate ${genType}`}
                            {!isGenerating && <ChevronRight size={20} />}
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
};
