'use client';

import React from 'react';
import { Handle, Position, NodeProps, type Node } from '@xyflow/react';
import { Settings2, Play } from 'lucide-react';

export type EditorNodeData = {
    model: string;
    ratio: string;
    isGenerating?: boolean;
    onRun?: (id: string) => void;
    onModelChange?: (id: string, model: string) => void;
    onRatioChange?: (id: string, ratio: string) => void;
};

export type EditorNodeNode = Node<EditorNodeData, 'editorNode'>;

export const EditorNode = ({ id, data, selected }: NodeProps<EditorNodeNode>) => {
    return (
        <div className={`workflow-node editor-node ${selected ? 'selected' : ''}`}>
            <div className="node-header">
                <Settings2 size={14} />
                <span>Image Editor</span>
            </div>
            <div className="node-content">
                <div className="setting-row">
                    <label>Select Model</label>
                    <select
                        value={data.model}
                        onChange={(e) => data.onModelChange?.(id, e.target.value)}
                        className="node-select"
                    >
                        <option value="gemini-nano">Gemini-Nano Banana</option>
                        <option value="stable-diffusion">Stable Diffusion XL</option>
                        <option value="flux-1">Flux.1 Pro</option>
                    </select>
                </div>
                <div className="setting-row">
                    <label>Ratio</label>
                    <select
                        value={data.ratio}
                        onChange={(e) => data.onRatioChange?.(id, e.target.value)}
                        className="node-select"
                    >
                        <option value="auto">Auto</option>
                        <option value="1:1">1:1 Square</option>
                        <option value="16:9">16:9 Cinematic</option>
                        <option value="9:16">9:16 Portrait</option>
                    </select>
                </div>
                <div className="node-actions">
                    <button
                        className="run-btn"
                        onClick={() => data.onRun?.(id)}
                        disabled={data.isGenerating}
                    >
                        <span>Run 3</span>
                        <Play size={12} fill="currentColor" />
                    </button>
                </div>
            </div>

            <Handle type="target" position={Position.Left} id="input-text" style={{ top: '30%' }} />
            <Handle type="source" position={Position.Bottom} id="output" />
            <Handle type="source" position={Position.Right} id="output-right" />
        </div>
    );
};
