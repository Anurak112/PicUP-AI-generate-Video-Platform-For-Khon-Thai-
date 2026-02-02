'use client';

import React, { useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { useLocale, useTranslations } from 'next-intl';
import {
    Upload,
    FileVideo,
    Sparkles,
    ChevronLeft,
    ChevronRight,
    CheckCircle,
    X,
    Info,
} from 'lucide-react';
import { DropZone } from './DropZone';
import { VideoPreview, VideoMetadata } from './VideoPreview';
import { UploadProgress, UploadStatus } from './UploadProgress';
import { Button } from '../ui/Button';
import './Upload.css';

// Popular AI video generation models
const AI_MODELS = [
    { name: 'Runway Gen-3', version: 'Alpha' },
    { name: 'Pika Labs', version: '1.0' },
    { name: 'Stable Video', version: 'SVD' },
    { name: 'Sora', version: 'Preview' },
    { name: 'Kling', version: '1.5' },
    { name: 'Luma Dream Machine', version: '1.0' },
    { name: 'Other', version: '' },
];

type UploadStep = 'select' | 'details' | 'metadata' | 'uploading' | 'success';

interface FormData {
    title: string;
    description: string;
    tags: string[];
    // AI Metadata
    prompt: string;
    negativePrompt: string;
    modelName: string;
    modelVersion: string;
    generatorApp: string;
    seed: string;
    steps: string;
    guidanceScale: string;
}

export const UploadForm: React.FC = () => {
    const router = useRouter();
    const locale = useLocale();
    const t = useTranslations('upload');

    // State
    const [step, setStep] = useState<UploadStep>('select');
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [videoMetadata, setVideoMetadata] = useState<VideoMetadata | null>(null);
    const [uploadStatus, setUploadStatus] = useState<UploadStatus>('idle');
    const [uploadProgress, setUploadProgress] = useState(0);
    const [uploadMessage, setUploadMessage] = useState('');
    const [error, setError] = useState<string | null>(null);
    const [uploadedVideoId, setUploadedVideoId] = useState<string | null>(null);

    // Form data
    const [formData, setFormData] = useState<FormData>({
        title: '',
        description: '',
        tags: [],
        prompt: '',
        negativePrompt: '',
        modelName: '',
        modelVersion: '',
        generatorApp: '',
        seed: '',
        steps: '',
        guidanceScale: '',
    });

    // Tag input
    const [tagInput, setTagInput] = useState('');

    const handleFileSelect = useCallback((file: File) => {
        setSelectedFile(file);
        setFormData(prev => ({
            ...prev,
            title: file.name.replace(/\.[^/.]+$/, ''), // Use filename as initial title
        }));
        setError(null);
    }, []);

    const handleRemoveFile = useCallback(() => {
        setSelectedFile(null);
        setVideoMetadata(null);
        setStep('select');
    }, []);

    const handleVideoLoad = useCallback((metadata: VideoMetadata) => {
        setVideoMetadata(metadata);
    }, []);

    const handleInputChange = (field: keyof FormData, value: string) => {
        setFormData(prev => ({ ...prev, [field]: value }));
    };

    const handleModelSelect = (modelName: string, modelVersion: string) => {
        setFormData(prev => ({
            ...prev,
            modelName,
            modelVersion,
            generatorApp: modelName,
        }));
    };

    const handleAddTag = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter' || e.key === ',') {
            e.preventDefault();
            const tag = tagInput.trim().toLowerCase();
            if (tag && !formData.tags.includes(tag) && formData.tags.length < 10) {
                setFormData(prev => ({
                    ...prev,
                    tags: [...prev.tags, tag],
                }));
            }
            setTagInput('');
        }
    };

    const handleRemoveTag = (tagToRemove: string) => {
        setFormData(prev => ({
            ...prev,
            tags: prev.tags.filter(tag => tag !== tagToRemove),
        }));
    };

    const goToStep = (newStep: UploadStep) => {
        setStep(newStep);
        setError(null);
    };

    const handleUpload = async () => {
        if (!selectedFile) return;

        try {
            setStep('uploading');
            setUploadStatus('uploading');
            setUploadProgress(0);
            setError(null);

            // Step 1: Initiate upload
            setUploadMessage('Preparing upload...');
            const initiateResponse = await fetch('/api/upload/initiate', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    fileName: selectedFile.name,
                    fileSize: selectedFile.size,
                    contentType: selectedFile.type,
                }),
            });

            if (!initiateResponse.ok) {
                const errorData = await initiateResponse.json();
                throw new Error(errorData.error || 'Failed to initiate upload');
            }

            const { videoId, uploadUrl } = await initiateResponse.json();
            setUploadedVideoId(videoId);
            setUploadProgress(10);

            // Step 2: Upload to R2
            setUploadMessage('Uploading video...');
            const xhr = new XMLHttpRequest();

            await new Promise<void>((resolve, reject) => {
                xhr.upload.addEventListener('progress', (e) => {
                    if (e.lengthComputable) {
                        const percent = 10 + (e.loaded / e.total) * 70; // 10-80%
                        setUploadProgress(percent);
                    }
                });

                xhr.addEventListener('load', () => {
                    if (xhr.status >= 200 && xhr.status < 300) {
                        resolve();
                    } else {
                        reject(new Error('Upload failed'));
                    }
                });

                xhr.addEventListener('error', () => reject(new Error('Upload failed')));

                xhr.open('PUT', uploadUrl);
                xhr.setRequestHeader('Content-Type', selectedFile.type);
                xhr.send(selectedFile);
            });

            setUploadProgress(85);

            // Step 3: Finalize upload
            setUploadMessage('Saving metadata...');
            setUploadStatus('processing');

            const finalizeResponse = await fetch('/api/upload/finalize', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    videoId,
                    title: formData.title,
                    description: formData.description,
                    tags: formData.tags,
                    aiMetadata: formData.modelName ? {
                        prompt: formData.prompt || undefined,
                        negativePrompt: formData.negativePrompt || undefined,
                        modelName: formData.modelName,
                        modelVersion: formData.modelVersion || undefined,
                        generatorApp: formData.generatorApp || undefined,
                        seed: formData.seed ? parseInt(formData.seed) : undefined,
                        steps: formData.steps ? parseInt(formData.steps) : undefined,
                        guidanceScale: formData.guidanceScale ? parseFloat(formData.guidanceScale) : undefined,
                    } : undefined,
                    videoProperties: videoMetadata ? {
                        width: videoMetadata.width,
                        height: videoMetadata.height,
                        duration: videoMetadata.duration,
                    } : undefined,
                }),
            });

            if (!finalizeResponse.ok) {
                const errorData = await finalizeResponse.json();
                throw new Error(errorData.error || 'Failed to finalize upload');
            }

            setUploadProgress(100);
            setUploadStatus('success');
            setUploadMessage('');
            setStep('success');
        } catch (err) {
            console.error('Upload error:', err);
            setUploadStatus('error');
            setUploadMessage(err instanceof Error ? err.message : 'Upload failed');
            setError(err instanceof Error ? err.message : 'Upload failed');
        }
    };

    const getStepNumber = (): number => {
        switch (step) {
            case 'select': return 1;
            case 'details': return 2;
            case 'metadata': return 3;
            case 'uploading':
            case 'success': return 4;
            default: return 1;
        }
    };

    const renderStepIndicator = () => (
        <div className="step-indicator">
            {[1, 2, 3, 4].map((num) => (
                <div
                    key={num}
                    className={`step-dot ${getStepNumber() === num ? 'active' : ''} ${getStepNumber() > num ? 'completed' : ''}`}
                />
            ))}
        </div>
    );

    const renderSelectStep = () => (
        <>
            <DropZone
                onFileSelect={handleFileSelect}
                selectedFile={selectedFile}
                onRemoveFile={handleRemoveFile}
                error={error}
            />
            <div className="upload-actions">
                <div />
                <Button
                    variant="primary"
                    size="lg"
                    disabled={!selectedFile}
                    onClick={() => goToStep('details')}
                >
                    Continue
                    <ChevronRight size={18} />
                </Button>
            </div>
        </>
    );

    const renderDetailsStep = () => (
        <>
            {selectedFile && (
                <VideoPreview file={selectedFile} onVideoLoad={handleVideoLoad} />
            )}

            <div className="form-section">
                <h3 className="form-section-title">
                    <FileVideo size={20} />
                    Video Details
                </h3>

                <div className="form-group">
                    <label className="form-label">
                        Title<span className="form-label-required">*</span>
                    </label>
                    <input
                        type="text"
                        className="form-input"
                        value={formData.title}
                        onChange={(e) => handleInputChange('title', e.target.value)}
                        placeholder="Enter a descriptive title"
                        maxLength={100}
                    />
                </div>

                <div className="form-group">
                    <label className="form-label">Description</label>
                    <textarea
                        className="form-textarea"
                        value={formData.description}
                        onChange={(e) => handleInputChange('description', e.target.value)}
                        placeholder="Describe your video..."
                        rows={4}
                        maxLength={2000}
                    />
                </div>

                <div className="form-group">
                    <label className="form-label">Tags (up to 10)</label>
                    <div className="tags-input-container">
                        {formData.tags.map((tag) => (
                            <span key={tag} className="tag-item">
                                {tag}
                                <button
                                    type="button"
                                    className="tag-remove"
                                    onClick={() => handleRemoveTag(tag)}
                                >
                                    <X size={12} />
                                </button>
                            </span>
                        ))}
                        <input
                            type="text"
                            className="tags-input"
                            value={tagInput}
                            onChange={(e) => setTagInput(e.target.value)}
                            onKeyDown={handleAddTag}
                            placeholder={formData.tags.length === 0 ? 'Type and press Enter' : ''}
                            disabled={formData.tags.length >= 10}
                        />
                    </div>
                    <p className="form-hint">Press Enter or comma to add tags</p>
                </div>
            </div>

            <div className="upload-actions">
                <Button variant="ghost" size="md" onClick={() => goToStep('select')}>
                    <ChevronLeft size={18} />
                    Back
                </Button>
                <div className="upload-actions-right">
                    <Button variant="secondary" size="md" onClick={() => goToStep('metadata')}>
                        Add AI Info
                        <Sparkles size={16} />
                    </Button>
                    <Button
                        variant="primary"
                        size="lg"
                        disabled={!formData.title.trim()}
                        onClick={handleUpload}
                    >
                        <Upload size={18} />
                        Upload Video
                    </Button>
                </div>
            </div>
        </>
    );

    const renderMetadataStep = () => (
        <>
            <div className="ai-metadata-section">
                <h3 className="form-section-title">
                    <Sparkles size={20} />
                    AI Generation Details
                </h3>
                <p style={{ color: 'var(--text-secondary)', marginBottom: 'var(--space-6)' }}>
                    Help others discover and learn from your AI-generated content.
                </p>

                <div className="form-group">
                    <label className="form-label">AI Model</label>
                    <div className="model-grid">
                        {AI_MODELS.map((model) => (
                            <div
                                key={model.name}
                                className={`model-option ${formData.modelName === model.name ? 'selected' : ''}`}
                                onClick={() => handleModelSelect(model.name, model.version)}
                            >
                                <div className="model-option-name">{model.name}</div>
                                {model.version && (
                                    <div className="model-option-version">{model.version}</div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>

                <div className="form-group">
                    <label className="form-label">Prompt</label>
                    <textarea
                        className="form-textarea"
                        value={formData.prompt}
                        onChange={(e) => handleInputChange('prompt', e.target.value)}
                        placeholder="The prompt used to generate this video..."
                        rows={3}
                    />
                </div>

                <div className="form-group">
                    <label className="form-label">Negative Prompt</label>
                    <textarea
                        className="form-textarea"
                        value={formData.negativePrompt}
                        onChange={(e) => handleInputChange('negativePrompt', e.target.value)}
                        placeholder="What to avoid in generation..."
                        rows={2}
                    />
                </div>

                <div className="form-row">
                    <div className="form-group">
                        <label className="form-label">Seed</label>
                        <input
                            type="number"
                            className="form-input"
                            value={formData.seed}
                            onChange={(e) => handleInputChange('seed', e.target.value)}
                            placeholder="e.g., 42"
                        />
                    </div>
                    <div className="form-group">
                        <label className="form-label">Steps</label>
                        <input
                            type="number"
                            className="form-input"
                            value={formData.steps}
                            onChange={(e) => handleInputChange('steps', e.target.value)}
                            placeholder="e.g., 30"
                        />
                    </div>
                </div>

                <div className="form-group">
                    <label className="form-label">Guidance Scale (CFG)</label>
                    <input
                        type="number"
                        step="0.1"
                        className="form-input"
                        value={formData.guidanceScale}
                        onChange={(e) => handleInputChange('guidanceScale', e.target.value)}
                        placeholder="e.g., 7.5"
                    />
                </div>
            </div>

            <div className="upload-actions">
                <Button variant="ghost" size="md" onClick={() => goToStep('details')}>
                    <ChevronLeft size={18} />
                    Back
                </Button>
                <Button
                    variant="primary"
                    size="lg"
                    disabled={!formData.title.trim()}
                    onClick={handleUpload}
                >
                    <Upload size={18} />
                    Upload Video
                </Button>
            </div>
        </>
    );

    const renderUploadingStep = () => (
        <div style={{ padding: 'var(--space-8) 0' }}>
            <UploadProgress
                status={uploadStatus}
                progress={uploadProgress}
                message={uploadMessage}
            />
        </div>
    );

    const renderSuccessStep = () => (
        <div className="upload-success">
            <CheckCircle className="upload-success-icon" size={80} />
            <h2>Video Uploaded Successfully!</h2>
            <p>Your video is now being processed. It will be available shortly.</p>
            <div style={{ display: 'flex', gap: 'var(--space-4)', justifyContent: 'center' }}>
                <Button
                    variant="secondary"
                    size="lg"
                    onClick={() => {
                        setStep('select');
                        setSelectedFile(null);
                        setVideoMetadata(null);
                        setFormData({
                            title: '',
                            description: '',
                            tags: [],
                            prompt: '',
                            negativePrompt: '',
                            modelName: '',
                            modelVersion: '',
                            generatorApp: '',
                            seed: '',
                            steps: '',
                            guidanceScale: '',
                        });
                        setUploadStatus('idle');
                        setUploadProgress(0);
                    }}
                >
                    Upload Another
                </Button>
                <Button
                    variant="primary"
                    size="lg"
                    onClick={() => router.push(`/${locale}/browse`)}
                >
                    Browse Videos
                </Button>
            </div>
        </div>
    );

    return (
        <div className="upload-container">
            <div className="container">
                <div className="upload-header">
                    <h1>
                        <span className="gradient-text">Upload</span> Your Video
                    </h1>
                    <p>Share your AI-generated masterpiece with the world</p>
                </div>

                <div className="upload-card">
                    {renderStepIndicator()}

                    {step === 'select' && renderSelectStep()}
                    {step === 'details' && renderDetailsStep()}
                    {step === 'metadata' && renderMetadataStep()}
                    {step === 'uploading' && renderUploadingStep()}
                    {step === 'success' && renderSuccessStep()}
                </div>
            </div>
        </div>
    );
};
