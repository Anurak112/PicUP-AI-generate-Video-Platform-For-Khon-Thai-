'use client';

import React from 'react';
import { CheckCircle, AlertCircle, Loader } from 'lucide-react';
import './Upload.css';

export type UploadStatus = 'idle' | 'uploading' | 'processing' | 'success' | 'error';

interface UploadProgressProps {
    status: UploadStatus;
    progress: number;
    message?: string;
}

export const UploadProgress: React.FC<UploadProgressProps> = ({
    status,
    progress,
    message,
}) => {
    const getStatusLabel = () => {
        switch (status) {
            case 'uploading':
                return 'Uploading video...';
            case 'processing':
                return 'Processing...';
            case 'success':
                return 'Upload complete!';
            case 'error':
                return 'Upload failed';
            default:
                return '';
        }
    };

    const getStatusColor = () => {
        switch (status) {
            case 'success':
                return 'var(--success)';
            case 'error':
                return 'var(--error)';
            default:
                return 'var(--accent-primary)';
        }
    };

    if (status === 'idle') return null;

    return (
        <div className="upload-progress">
            <div className="progress-header">
                <span className="progress-label">
                    {status === 'uploading' && <Loader size={16} className="animate-spin" style={{ marginRight: 8, display: 'inline' }} />}
                    {status === 'success' && <CheckCircle size={16} style={{ marginRight: 8, display: 'inline', color: 'var(--success)' }} />}
                    {status === 'error' && <AlertCircle size={16} style={{ marginRight: 8, display: 'inline', color: 'var(--error)' }} />}
                    {getStatusLabel()}
                </span>
                {status === 'uploading' && (
                    <span className="progress-percentage" style={{ color: getStatusColor() }}>
                        {Math.round(progress)}%
                    </span>
                )}
            </div>

            {(status === 'uploading' || status === 'processing') && (
                <div className="progress-bar">
                    <div
                        className="progress-fill"
                        style={{
                            width: `${progress}%`,
                            background: status === 'processing'
                                ? 'linear-gradient(90deg, var(--accent-secondary), var(--accent-pink))'
                                : undefined,
                        }}
                    />
                </div>
            )}

            {message && (
                <p className="progress-status" style={{ color: status === 'error' ? 'var(--error)' : undefined }}>
                    {message}
                </p>
            )}
        </div>
    );
};
