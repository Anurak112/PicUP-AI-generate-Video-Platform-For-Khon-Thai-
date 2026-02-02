'use client';

import React, { useState, useCallback, useRef } from 'react';
import { Upload, Film, X } from 'lucide-react';
import './Upload.css';

interface DropZoneProps {
    onFileSelect: (file: File) => void;
    selectedFile: File | null;
    onRemoveFile: () => void;
    error?: string | null;
}

// Max file size: 500MB
const MAX_FILE_SIZE = 500 * 1024 * 1024;
const ALLOWED_TYPES = ['video/mp4', 'video/webm', 'video/quicktime'];
const ALLOWED_EXTENSIONS = ['.mp4', '.webm', '.mov'];

export const DropZone: React.FC<DropZoneProps> = ({
    onFileSelect,
    selectedFile,
    onRemoveFile,
    error,
}) => {
    const [isDragOver, setIsDragOver] = useState(false);
    const [validationError, setValidationError] = useState<string | null>(null);
    const inputRef = useRef<HTMLInputElement>(null);

    const validateFile = useCallback((file: File): string | null => {
        if (!ALLOWED_TYPES.includes(file.type)) {
            return `Invalid file type. Allowed formats: ${ALLOWED_EXTENSIONS.join(', ')}`;
        }
        if (file.size > MAX_FILE_SIZE) {
            return `File size too large. Maximum: ${MAX_FILE_SIZE / 1024 / 1024}MB`;
        }
        return null;
    }, []);

    const handleFile = useCallback((file: File) => {
        const error = validateFile(file);
        if (error) {
            setValidationError(error);
            return;
        }
        setValidationError(null);
        onFileSelect(file);
    }, [validateFile, onFileSelect]);

    const handleDragOver = useCallback((e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragOver(true);
    }, []);

    const handleDragLeave = useCallback((e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragOver(false);
    }, []);

    const handleDrop = useCallback((e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragOver(false);

        const files = e.dataTransfer.files;
        if (files.length > 0) {
            handleFile(files[0]);
        }
    }, [handleFile]);

    const handleClick = () => {
        inputRef.current?.click();
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        if (files && files.length > 0) {
            handleFile(files[0]);
        }
    };

    const formatFileSize = (bytes: number): string => {
        if (bytes < 1024) return bytes + ' B';
        if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
        if (bytes < 1024 * 1024 * 1024) return (bytes / 1024 / 1024).toFixed(1) + ' MB';
        return (bytes / 1024 / 1024 / 1024).toFixed(2) + ' GB';
    };

    const displayError = validationError || error;

    return (
        <div>
            {displayError && (
                <div className="upload-error">
                    <X className="upload-error-icon" size={20} />
                    <span className="upload-error-message">{displayError}</span>
                </div>
            )}

            <div
                className={`drop-zone ${isDragOver ? 'drag-over' : ''} ${selectedFile ? 'has-file' : ''}`}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                onClick={handleClick}
            >
                <input
                    ref={inputRef}
                    type="file"
                    accept={ALLOWED_TYPES.join(',')}
                    onChange={handleInputChange}
                    style={{ display: 'none' }}
                />

                {!selectedFile ? (
                    <>
                        <Upload className="drop-zone-icon" size={80} />
                        <h3 className="drop-zone-title">
                            Drag and drop your video here
                        </h3>
                        <p className="drop-zone-subtitle">
                            or click to browse files
                        </p>
                        <span className="drop-zone-browse">
                            <Film size={16} />
                            Select video file
                        </span>
                        <p className="drop-zone-formats">
                            Supported formats: MP4, WebM, MOV • Max size: 500MB
                        </p>
                    </>
                ) : (
                    <div className="file-info" onClick={(e) => e.stopPropagation()}>
                        <div className="file-info-icon">
                            <Film size={24} />
                        </div>
                        <div className="file-info-details">
                            <div className="file-info-name">{selectedFile.name}</div>
                            <div className="file-info-size">{formatFileSize(selectedFile.size)}</div>
                        </div>
                        <button
                            className="file-info-remove"
                            onClick={(e) => {
                                e.stopPropagation();
                                onRemoveFile();
                                setValidationError(null);
                            }}
                            aria-label="Remove file"
                        >
                            <X size={20} />
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};
