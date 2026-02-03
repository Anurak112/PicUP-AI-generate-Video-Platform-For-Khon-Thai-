'use client';

import React, { useState } from 'react';
import { Handle, Position, NodeProps, type Node } from '@xyflow/react';
import { Sparkles, Image as ImageIcon, Plus } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export type ImageNodeData = {
    label: string;
    prompt: string;
    imageUrl?: string;
    isGenerating?: boolean;
    onGenerate?: (id: string, prompt: string) => void;
    onAddChild?: (id: string) => void;
};

export type ImageNodeNode = Node<ImageNodeData, 'imageNode'>;

export const ImageNode = ({ id, data, selected }: NodeProps<ImageNodeNode>) => {
    const [prompt, setPrompt] = useState(data.prompt || '');

    const handleGenerate = () => {
        if (data.onGenerate) {
            data.onGenerate(id, prompt);
        }
    };

    const handleAddChild = () => {
        if (data.onAddChild) {
            data.onAddChild(id);
        }
    };

    return (
        <div className={`image-node ${selected ? 'selected' : ''}`}>
            <Handle type="target" position={Position.Top} />

            <div className="node-header">
                <ImageIcon size={14} />
                <span>{data.label || 'Image Generation'}</span>
            </div>

            <div className="node-content">
                <div className="node-prompt-area">
                    <label className="node-label">Prompt</label>
                    <textarea
                        className="node-textarea"
                        value={prompt}
                        onChange={(e) => setPrompt(e.target.value)}
                        placeholder="Describe your image..."
                    />
                </div>

                <div className="node-image-preview">
                    <AnimatePresence mode="wait">
                        {data.isGenerating ? (
                            <motion.div
                                key="loader"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                className="node-image-placeholder"
                            >
                                <div className="generation-loader"></div>
                                <span>Generating...</span>
                            </motion.div>
                        ) : data.imageUrl ? (
                            <motion.img
                                key="image"
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                src={data.imageUrl}
                                alt="Generated"
                            />
                        ) : (
                            <div className="node-image-placeholder">
                                <Sparkles size={32} />
                                <span>No output yet</span>
                            </div>
                        )}
                    </AnimatePresence>
                </div>
            </div>

            <div className="node-footer">
                <div style={{ display: 'flex', gap: '8px', width: '100%' }}>
                    <button
                        className="node-generate-btn"
                        onClick={handleGenerate}
                        disabled={data.isGenerating}
                        style={{ flex: 2 }}
                    >
                        <Sparkles size={14} />
                        {data.isGenerating ? 'Processing' : 'Generate'}
                    </button>
                    <button
                        className="control-btn"
                        onClick={handleAddChild}
                        title="Add child node"
                        style={{ width: '34px', height: '34px', borderRadius: '6px' }}
                    >
                        <Plus size={16} />
                    </button>
                </div>
            </div>

            <Handle type="source" position={Position.Bottom} />
            <Handle type="source" position={Position.Right} />
        </div>
    );
};
