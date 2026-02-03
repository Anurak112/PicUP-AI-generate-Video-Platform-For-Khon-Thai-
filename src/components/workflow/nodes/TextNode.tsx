'use client';

import React, { useState } from 'react';
import { Handle, Position, NodeProps, type Node } from '@xyflow/react';
import { Type } from 'lucide-react';

export type TextNodeData = {
    label: string;
    text: string;
    onChange?: (id: string, text: string) => void;
};

export type TextNodeNode = Node<TextNodeData, 'textNode'>;

export const TextNode = ({ id, data, selected }: NodeProps<TextNodeNode>) => {
    const [text, setText] = useState(data.text || '');

    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        const newText = e.target.value;
        setText(newText);
        if (data.onChange) {
            data.onChange(id, newText);
        }
    };

    return (
        <div className={`workflow-node text-node ${selected ? 'selected' : ''}`}>
            <div className="node-header">
                <Type size={14} />
                <span>Text</span>
            </div>
            <div className="node-content">
                <textarea
                    className="node-textarea"
                    value={text}
                    onChange={handleChange}
                    placeholder="Tell me your ideas"
                />
            </div>
            <Handle type="source" position={Position.Right} id="output" />
        </div>
    );
};
