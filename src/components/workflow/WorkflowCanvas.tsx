'use client';

import React, { useState, useCallback, useMemo } from 'react';
import {
    ReactFlow,
    Controls,
    Background,
    applyNodeChanges,
    applyEdgeChanges,
    addEdge,
    Connection,
    Edge,
    Node,
    OnNodesChange,
    OnEdgesChange,
    OnConnect,
    NodeTypes,
    useReactFlow,
    ReactFlowProvider,
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import './WorkflowCanvas.css';
import { TextNode, type TextNodeNode } from './nodes/TextNode';
import { EditorNode, type EditorNodeNode } from './nodes/EditorNode';
import { PreviewNode, type PreviewNodeNode } from './nodes/PreviewNode';
import { Plus, Zap, MousePointer2, ZoomIn } from 'lucide-react';

type WorkflowNode = TextNodeNode | EditorNodeNode | PreviewNodeNode;

const nodeTypes = {
    textNode: TextNode,
    editorNode: EditorNode,
    previewNode: PreviewNode,
};

const initialNodes: WorkflowNode[] = [
    {
        id: 'text-1',
        type: 'textNode',
        position: { x: 50, y: 150 },
        data: { text: 'A futuristic cyberpunk city with neon lights', label: 'Text' },
    },
    {
        id: 'editor-1',
        type: 'editorNode',
        position: { x: 450, y: 100 },
        data: { model: 'gemini-nano', ratio: 'auto' },
    },
    {
        id: 'preview-1',
        type: 'previewNode',
        position: { x: 425, y: 450 },
        data: { imageUrl: '' },
    },
];

const initialEdges: Edge[] = [
    { id: 'e1', source: 'text-1', target: 'editor-1', targetHandle: 'input-text', animated: true, style: { stroke: '#7c4dff' } },
    { id: 'e2', source: 'editor-1', target: 'preview-1', sourceHandle: 'output', animated: true, style: { stroke: '#ff00ff' } },
];

const WorkflowCanvasInner: React.FC = () => {
    const { fitView } = useReactFlow();
    const [nodes, setNodes] = useState<WorkflowNode[]>(initialNodes);
    const [edges, setEdges] = useState<Edge[]>(initialEdges);

    const onNodesChange: OnNodesChange = useCallback(
        (changes) => setNodes((nds) => applyNodeChanges(changes, nds) as WorkflowNode[]),
        []
    );
    const onEdgesChange: OnEdgesChange = useCallback(
        (changes) => setEdges((eds) => applyEdgeChanges(changes, eds)),
        []
    );
    const onConnect: OnConnect = useCallback(
        (params: Connection) => setEdges((eds) => addEdge(params, eds)),
        []
    );

    const handleRun = useCallback((editorId: string) => {
        // Find connected preview node
        const edge = edges.find(e => e.source === editorId && (e.sourceHandle === 'output' || e.sourceHandle === 'output-right'));
        if (!edge) return;

        const previewId = edge.target;

        // Set generating state
        setNodes((nds) => nds.map((node) => {
            if (node.id === previewId) {
                return { ...node, data: { ...node.data, isGenerating: true } };
            }
            if (node.id === editorId) {
                return { ...node, data: { ...node.data, isGenerating: true } };
            }
            return node;
        }) as WorkflowNode[]);

        // Simulate generation
        setTimeout(() => {
            setNodes((nds) => nds.map((node) => {
                if (node.id === previewId) {
                    return {
                        ...node,
                        data: {
                            ...node.data,
                            isGenerating: false,
                            imageUrl: `https://picsum.photos/seed/${node.id}-${Date.now()}/600/600`
                        }
                    };
                }
                if (node.id === editorId) {
                    return { ...node, data: { ...node.data, isGenerating: false } };
                }
                return node;
            }) as WorkflowNode[]);
        }, 2000);
    }, [edges]);

    const handleTextChange = useCallback((id: string, text: string) => {
        setNodes((nds) => nds.map(node => node.id === id ? { ...node, data: { ...node.data, text } } : node) as WorkflowNode[]);
    }, []);

    const handleModelChange = useCallback((id: string, model: string) => {
        setNodes((nds) => nds.map(node => node.id === id ? { ...node, data: { ...node.data, model } } : node) as WorkflowNode[]);
    }, []);

    const handleRatioChange = useCallback((id: string, ratio: string) => {
        setNodes((nds) => nds.map(node => node.id === id ? { ...node, data: { ...node.data, ratio } } : node) as WorkflowNode[]);
    }, []);

    // Enrich nodes with callbacks
    const enrichedNodes = useMemo(() => {
        return nodes.map(node => {
            if (node.type === 'textNode') {
                return { ...node, data: { ...node.data, onChange: handleTextChange } };
            }
            if (node.type === 'editorNode') {
                return {
                    ...node,
                    data: {
                        ...node.data,
                        onRun: handleRun,
                        onModelChange: handleModelChange,
                        onRatioChange: handleRatioChange
                    }
                };
            }
            return node;
        });
    }, [nodes, handleTextChange, handleRun, handleModelChange, handleRatioChange]);

    const addNewStack = () => {
        const stackId = Date.now().toString();
        const yOffset = nodes.length * 200;

        const newNodes: WorkflowNode[] = [
            { id: `text-${stackId}`, type: 'textNode', position: { x: 50, y: 150 + yOffset }, data: { text: '', label: 'Text' } },
            { id: `editor-${stackId}`, type: 'editorNode', position: { x: 450, y: 100 + yOffset }, data: { model: 'gemini-nano', ratio: 'auto' } },
            { id: `preview-${stackId}`, type: 'previewNode', position: { x: 425, y: 450 + yOffset }, data: { imageUrl: '' } },
        ];

        const newEdges: Edge[] = [
            { id: `e-text-${stackId}`, source: `text-${stackId}`, target: `editor-${stackId}`, targetHandle: 'input-text', animated: true, style: { stroke: '#7c4dff' } },
            { id: `e-editor-${stackId}`, source: `editor-${stackId}`, target: `preview-${stackId}`, sourceHandle: 'output', animated: true, style: { stroke: '#ff00ff' } },
        ];

        setNodes((nds) => nds.concat(newNodes));
        setEdges((eds) => eds.concat(newEdges));
    };

    return (
        <div className="workflow-container">
            <ReactFlow
                nodes={enrichedNodes}
                edges={edges}
                onNodesChange={onNodesChange}
                onEdgesChange={onEdgesChange}
                onConnect={onConnect}
                nodeTypes={nodeTypes}
                fitView
            >
                <Background color="#333" gap={30} />
                <Controls />
            </ReactFlow>

            <div className="workflow-controls">
                <button className="control-btn" onClick={addNewStack} title="Add New Stack">
                    <Plus size={20} />
                </button>
                <button className="control-btn" title="Selection Mode">
                    <MousePointer2 size={18} />
                </button>
                <button className="control-btn" onClick={() => fitView()} title="Fit View">
                    <ZoomIn size={18} />
                </button>
            </div>

        </div>
    );
};

export const WorkflowCanvas: React.FC = () => (
    <ReactFlowProvider>
        <WorkflowCanvasInner />
    </ReactFlowProvider>
);
