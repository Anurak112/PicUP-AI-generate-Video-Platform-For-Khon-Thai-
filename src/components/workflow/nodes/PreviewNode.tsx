'use client';

import React from 'react';
import { Handle, Position, NodeProps, type Node } from '@xyflow/react';
import { ImageIcon, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export type PreviewNodeData = {
    imageUrl?: string;
    isGenerating?: boolean;
};

export type PreviewNodeNode = Node<PreviewNodeData, 'previewNode'>;

export const PreviewNode = ({ id, data, selected }: NodeProps<PreviewNodeNode>) => {
    return (
        <div className={`workflow-node preview-node ${selected ? 'selected' : ''}`}>
            <div className="node-header">
                <ImageIcon size={14} />
                <span>Image</span>
            </div>
            <div className="node-content preview-content">
                <AnimatePresence mode="wait">
                    {data.isGenerating ? (
                        <motion.div
                            key="loader"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="preview-placeholder"
                        >
                            <div className="generation-loader"></div>
                            <span>Generating...</span>
                        </motion.div>
                    ) : data.imageUrl ? (
                        <motion.img
                            key="image"
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            src={data.imageUrl}
                            alt="Generated Output"
                            className="preview-image"
                        />
                    ) : (
                        <div className="preview-placeholder">
                            <Sparkles size={32} />
                            <span>No output yet</span>
                        </div>
                    )}
                </AnimatePresence>
            </div>
            <Handle type="target" position={Position.Top} id="input" />
            <Handle type="source" position={Position.Right} id="output" />
        </div>
    );
};
