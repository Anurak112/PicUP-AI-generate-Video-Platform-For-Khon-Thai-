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
import { ImageNode, type ImageNodeData, type ImageNodeNode } from './ImageNode';
import { Plus, Zap, MousePointer2, ZoomIn } from 'lucide-react';

const nodeTypes = {
    imageNode: ImageNode,
};

const generateInitialWorkflow = () => {
    const nodes: ImageNodeNode[] = [];
    const edges: Edge[] = [];
    const totalNodes = 15;
    const verticalGap = 500;
    const horizontalGap = 350;

    for (let i = 1; i <= totalNodes; i++) {
        const level = Math.floor(Math.log2(i));
        const indexInLevel = i - Math.pow(2, level);
        const nodesInLevel = Math.pow(2, level);

        // Center the level horizontally
        const totalLevelWidth = (nodesInLevel - 1) * horizontalGap * (Math.pow(2, 3 - level));
        const xOffset = 600 - totalLevelWidth / 2;
        const x = xOffset + indexInLevel * horizontalGap * (Math.pow(2, 3 - level));
        const y = level * verticalGap;

        nodes.push({
            id: i.toString(),
            type: 'imageNode',
            position: { x, y },
            data: {
                label: i === 1 ? 'Master Concept' : `Iteration ${i}`,
                prompt: i === 1 ? 'A futuristic cyberpunk city with neon lights' : `Refinement of concept ${Math.floor(i / 2)}`,
                imageUrl: `https://picsum.photos/seed/pixel-node-${i}/400/400`,
                isGenerating: false,
            },
        });

        if (i > 1) {
            const parentId = Math.floor(i / 2).toString();
            edges.push({
                id: `e${parentId}-${i}`,
                source: parentId,
                target: i.toString(),
                animated: true,
                style: { stroke: '#7c4dff' },
            });
        }
    }
    return { nodes, edges };
};

const { nodes: initialNodes, edges: initialEdges } = generateInitialWorkflow();

const WorkflowCanvasInner: React.FC = () => {
    const { fitView } = useReactFlow();
    const [nodes, setNodes] = useState<ImageNodeNode[]>(initialNodes);
    const [edges, setEdges] = useState<Edge[]>(initialEdges);

    const onNodesChange: OnNodesChange = useCallback(
        (changes) => setNodes((nds) => applyNodeChanges(changes, nds) as ImageNodeNode[]),
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

    const handleGenerate = useCallback((nodeId: string, prompt: string) => {
        // Set generating state
        setNodes((nds) =>
            nds.map((node: ImageNodeNode) => {
                if (node.id === nodeId) {
                    return {
                        ...node,
                        data: { ...node.data, isGenerating: true, prompt },
                    };
                }
                return node;
            })
        );

        // Simulate API call
        setTimeout(() => {
            setNodes((nds) =>
                nds.map((node: ImageNodeNode) => {
                    if (node.id === nodeId) {
                        return {
                            ...node,
                            data: {
                                ...node.data,
                                isGenerating: false,
                                imageUrl: `https://picsum.photos/seed/${nodeId}-${Date.now()}/400/400`
                            },
                        };
                    }
                    return node;
                })
            );
        }, 2000);
    }, []);

    const handleAddChild = useCallback((parentId: string) => {
        const parentNode = nodes.find(n => n.id === parentId);
        if (!parentNode) return;

        const newId = (nodes.length + 1).toString();
        const newNode: ImageNodeNode = {
            id: newId,
            type: 'imageNode',
            position: {
                x: parentNode.position.x + (Math.random() * 200 - 100),
                y: parentNode.position.y + 350
            },
            data: {
                label: `Variation ${newId}`,
                prompt: parentNode.data.prompt || '',
            },
        };

        const newEdge: Edge = {
            id: `e${parentId}-${newId}`,
            source: parentId,
            target: newId,
            animated: true,
            style: { stroke: '#7c4dff' },
        };

        setNodes((nds) => nds.concat(newNode));
        setEdges((eds) => eds.concat(newEdge));
    }, [nodes]);

    // Enrich nodes with callbacks
    const enrichedNodes = useMemo(() => {
        return nodes.map(node => ({
            ...node,
            data: {
                ...node.data,
                onGenerate: handleGenerate,
                onAddChild: handleAddChild,
            }
        }));
    }, [nodes, handleGenerate, handleAddChild]);

    const addNewRootNode = () => {
        const newId = (nodes.length + 1).toString();
        const newNode: ImageNodeNode = {
            id: newId,
            type: 'imageNode',
            position: { x: 100, y: 100 },
            data: { label: 'New Workflow', prompt: '' },
        };
        setNodes((nds) => nds.concat(newNode));
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
                <button className="control-btn" onClick={addNewRootNode} title="Add Root Node">
                    <Plus size={20} />
                </button>
                <button className="control-btn" title="Selection Mode">
                    <MousePointer2 size={18} />
                </button>
                <button className="control-btn" onClick={() => fitView()} title="Fit View">
                    <ZoomIn size={18} />
                </button>
            </div>

            <div style={{ position: 'absolute', top: '20px', left: '20px', pointerEvents: 'none' }}>
                <h2 style={{ margin: 0, fontSize: '1.2rem', color: '#7c4dff', fontWeight: 800 }}>PIXEL WORKFLOW</h2>
                <p style={{ margin: 0, fontSize: '0.7rem', color: 'rgba(255,255,255,0.4)' }}>LIVE GENERATION VISUALIZER</p>
            </div>
        </div>
    );
};

export const WorkflowCanvas: React.FC = () => (
    <ReactFlowProvider>
        <WorkflowCanvasInner />
    </ReactFlowProvider>
);
