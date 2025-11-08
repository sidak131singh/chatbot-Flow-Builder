import React, { useState, useRef, useCallback, useEffect } from 'react';
import ReactFlow, {
  ReactFlowProvider,
  addEdge,
  useNodesState,
  useEdgesState,
  Controls,
  Background,
  MiniMap,
} from 'reactflow';
import 'reactflow/dist/style.css';

import MessageNode from './components/MessageNode';
import MediaNode from './components/MediaNode';
import TriggerNode from './components/TriggerNode';
import NodePanel from './components/NodePanel';
import SettingsPanel from './components/SettingsPanel';
import MediaSettingsPanel from './components/MediaSettingsPanel';
import TriggerSettingsPanel from './components/TriggerSettingsPanel';
import SaveButton from './components/SaveButton';
import CustomEdge from './components/CustomEdge';
import Toast from './components/Toast';
import './App.css';

// Define custom node types
const nodeTypes = {
  message: MessageNode,
  media: MediaNode,
  trigger: TriggerNode,
};

// Define custom edge types
const edgeTypes = {
  custom: CustomEdge,
};

// Initial nodes - start with trigger node
const initialNodes = [
  {
    id: 'trigger_1',
    type: 'trigger',
    position: { x: 100, y: 100 },
    data: { 
      triggerEvent: 'keyword',
      keywords: []
    },
  },
];

// Initial edges
const initialEdges = [];

/**
 * Get next available node ID based on existing nodes
 * Ensures continuous numbering even after deletions
 */
const getNextNodeId = (existingNodes) => {
  if (existingNodes.length === 0) return 1;
  
  // Extract all node numbers from existing nodes
  const existingNumbers = existingNodes
    .map(node => {
      const match = node.id.match(/node_(\d+)/);
      return match ? parseInt(match[1]) : 0;
    })
    .filter(num => num > 0);
  
  if (existingNumbers.length === 0) return 1;
  
  // Find the smallest missing number, or use max + 1
  const maxNum = Math.max(...existingNumbers);
  for (let i = 1; i <= maxNum; i++) {
    if (!existingNumbers.includes(i)) {
      return i;
    }
  }
  return maxNum + 1;
};

/**
 * Main App component - Chatbot Flow Builder
 * Features:
 * - Drag and drop nodes from panel
 * - Connect nodes with edges
 * - Edit node text via settings panel
 * - Validate and save flow
 */
function App() {
  // React Flow state management
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const [selectedNode, setSelectedNode] = useState(null);
  const reactFlowWrapper = useRef(null);
  const [reactFlowInstance, setReactFlowInstance] = useState(null);
  
  // Toast notification state
  const [toast, setToast] = useState(null);

  /**
   * Show toast notification
   */
  const showToast = useCallback((message, type) => {
    setToast({ message, type });
  }, []);

  /**
   * Close toast notification
   */
  const closeToast = useCallback(() => {
    setToast(null);
  }, []);

  /**
   * Handle edge deletion from CustomEdge component
   */
  useEffect(() => {
    const handleDeleteEdge = (event) => {
      const { edgeId } = event.detail;
      setEdges((eds) => eds.filter((edge) => edge.id !== edgeId));
    };

    window.addEventListener('delete-edge', handleDeleteEdge);
    return () => {
      window.removeEventListener('delete-edge', handleDeleteEdge);
    };
  }, [setEdges]);

  /**
   * Handle node deletion - deselect if selected node is deleted
   */
  useEffect(() => {
    if (selectedNode) {
      // Check if the selected node still exists
      const nodeExists = nodes.some(node => node.id === selectedNode.id);
      if (!nodeExists) {
        // Node was deleted, go back to NodePanel
        setSelectedNode(null);
      }
    }
  }, [nodes, selectedNode]);

  /**
   * Handle node selection
   * When a node is clicked, show settings panel
   */
  const onNodeClick = useCallback((event, node) => {
    setSelectedNode(node);
  }, []);

  /**
   * Handle canvas click (deselect node)
   */
  const onPaneClick = useCallback(() => {
    setSelectedNode(null);
  }, []);

  /**
   * Handle edge connection
   * Validates that source handle can only have one outgoing edge
   */
  const onConnect = useCallback(
    (params) => {
      // Check if source already has an outgoing edge
      const sourceHasEdge = edges.some(
        (edge) => edge.source === params.source && edge.sourceHandle === params.sourceHandle
      );

      // If source already has an edge, prevent connection
      if (sourceHasEdge) {
        showToast('A node can only have one outgoing connection from its source handle.', 'error');
        return;
      }

      // Add the new edge with custom type
      setEdges((eds) => addEdge({ ...params, type: 'custom' }, eds));
    },
    [edges, setEdges, showToast]
  );

  /**
   * Handle drag over event (for drop zone)
   */
  const onDragOver = useCallback((event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
  }, []);

  /**
   * Handle drop event - create new node at drop position
   */
  const onDrop = useCallback(
    (event) => {
      event.preventDefault();

      const type = event.dataTransfer.getData('application/reactflow');

      // Check if the dropped element is valid
      if (typeof type === 'undefined' || !type) {
        return;
      }

      // Get the drop position
      const position = reactFlowInstance.screenToFlowPosition({
        x: event.clientX,
        y: event.clientY,
      });

      // Get next available node ID
      const nextId = getNextNodeId(nodes);

      // Create new node based on type
      const newNode = {
        id: `node_${nextId}`,
        type: type,
        position,
        data: type === 'message' 
          ? { message: '', buttons: [] }
          : type === 'media'
          ? { 
              mediaType: 'image',
              mediaURL: '',
              caption: '',
              buttons: []
            }
          : {},
      };

      setNodes((nds) => nds.concat(newNode));
    },
    [reactFlowInstance, nodes, setNodes]
  );

  /**
   * Add node programmatically (click to add from panel)
   */
  const onAddNode = useCallback(
    (type) => {
      // Add node at center of viewport
      const position = reactFlowInstance 
        ? reactFlowInstance.screenToFlowPosition({
            x: window.innerWidth / 2 - 200,
            y: window.innerHeight / 2,
          })
        : { x: 250, y: 250 };

      // Get next available node ID
      const nextId = getNextNodeId(nodes);

      // Create appropriate node based on type
      const newNode = {
        id: `node_${nextId}`,
        type: type,
        position,
        data: type === 'message' 
          ? { message: '', buttons: [] }
          : type === 'media'
          ? { 
              mediaType: 'image',
              mediaURL: '',
              caption: '',
              buttons: []
            }
          : {},
      };

      setNodes((nds) => nds.concat(newNode));
    },
    [reactFlowInstance, nodes, setNodes]
  );

  /**
   * Update node data (for both message and trigger nodes)
   */
  const onUpdateNode = useCallback(
    (nodeId, newData) => {
      setNodes((nds) =>
        nds.map((node) => {
          if (node.id === nodeId) {
            return {
              ...node,
              data: newData,
            };
          }
          return node;
        })
      );
    },
    [setNodes]
  );

  /**
   * Handle back button in settings panel
   */
  const onBackToPanel = useCallback(() => {
    setSelectedNode(null);
  }, []);

  return (
    <div className="app">
      {/* Toast notification */}
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={closeToast}
        />
      )}

      {/* Header with save button */}
      <header className="app-header">
        <h1 className="app-title">Chatbot Flow Builder</h1>
        <SaveButton 
          nodes={nodes} 
          edges={edges} 
          onShowToast={showToast}
        />
      </header>

      {/* Main content area */}
      <div className="app-content">
        {/* Flow canvas */}
        <div className="flow-container" ref={reactFlowWrapper}>
          <ReactFlowProvider>
            <ReactFlow
              nodes={nodes}
              edges={edges}
              onNodesChange={onNodesChange}
              onEdgesChange={onEdgesChange}
              onConnect={onConnect}
              onNodeClick={onNodeClick}
              onPaneClick={onPaneClick}
              onInit={setReactFlowInstance}
              onDrop={onDrop}
              onDragOver={onDragOver}
              nodeTypes={nodeTypes}
              edgeTypes={edgeTypes}
              fitView
              proOptions={{ hideAttribution: true }}
            >
              <Background color="#f0f0f0" gap={16} />
              <Controls />
              <MiniMap
                nodeColor={(node) => {
                  return '#b2ebf2';
                }}
                nodeStrokeWidth={3}
                zoomable
                pannable
              />
            </ReactFlow>
          </ReactFlowProvider>
        </div>

        {/* Right side panel - either NodePanel, SettingsPanel, MediaSettingsPanel, or TriggerSettingsPanel */}
        <div className="side-panel">
          {selectedNode ? (
            selectedNode.type === 'trigger' ? (
              <TriggerSettingsPanel
                selectedNode={selectedNode}
                onUpdateNode={onUpdateNode}
                onBack={onBackToPanel}
              />
            ) : selectedNode.type === 'media' ? (
              <MediaSettingsPanel
                selectedNode={selectedNode}
                onUpdateNode={onUpdateNode}
                onBack={onBackToPanel}
              />
            ) : (
              <SettingsPanel
                selectedNode={selectedNode}
                onUpdateNode={onUpdateNode}
                onBack={onBackToPanel}
              />
            )
          ) : (
            <NodePanel onAddNode={onAddNode} />
          )}
        </div>
      </div>
    </div>
  );
}


export default App;
