import React from 'react';
import './NodePanel.css';

/**
 * NodePanel component - displays available node types
 * Users can drag or click items to add new nodes to the canvas
 * Currently supports only "Message" nodes, but extensible for future node types
 */
const NodePanel = ({ onAddNode }) => {
  /**
   * Handle drag start event
   * Sets the node type in dataTransfer for drop handling
   */
  const onDragStart = (event, nodeType) => {
    event.dataTransfer.setData('application/reactflow', nodeType);
    event.dataTransfer.effectAllowed = 'move';
  };

  /**
   * Handle click event - adds node to center of canvas
   */
  const handleAddNode = () => {
    onAddNode('message');
  };

  return (
    <div className="node-panel">
      <div className="panel-header">
        <h3>Nodes Panel</h3>
      </div>
      
      <div className="panel-content">
        {/* Message Node Item - draggable */}
        <div
          className="node-item"
          draggable
          onDragStart={(event) => onDragStart(event, 'message')}
          onClick={handleAddNode}
          title="Drag to canvas or click to add"
        >
          <div className="node-item-icon">💬</div>
          <div className="node-item-label">Message</div>
        </div>

        {/* Placeholder for future node types */}
        {/* <div className="node-item" draggable>
          <div className="node-item-icon">🤔</div>
          <div className="node-item-label">Decision</div>
        </div> */}
      </div>

      <div className="panel-footer">
        <p className="panel-hint">Drag or click to add</p>
      </div>
    </div>
  );
};

export default NodePanel;
