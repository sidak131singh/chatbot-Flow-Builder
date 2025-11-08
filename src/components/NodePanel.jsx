import React from 'react';
import './NodePanel.css';


const NodePanel = ({ onAddNode }) => { // callback function from App.jsx
 
  const onDragStart = (event, nodeType) => {
    event.dataTransfer.setData('application/reactflow', nodeType);//Handle drag start event
    event.dataTransfer.effectAllowed = 'move';  // set cursor to show move icon while moving
  };

  //Handle click event - adds node to center of canvas
  const handleAddNode = (nodeType) => { 
    onAddNode(nodeType);
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
          onClick={() => handleAddNode('message')}
          title="Drag to canvas or click to add"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ marginRight: '8px' }}>
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
          </svg>
          <div className="node-item-label">Message</div>
        </div>

        {/* Media Node Item - draggable */}
        <div
          className="node-item"
          draggable
          onDragStart={(event) => onDragStart(event, 'media')}
          onClick={() => handleAddNode('media')}
          title="Drag to canvas or click to add"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ marginRight: '8px' }}>
            <rect x="3" y="3" width="18" height="18" rx="2" ry="2"/>
            <circle cx="8.5" cy="8.5" r="1.5"/>
            <polyline points="21 15 16 10 5 21"/>
          </svg>
          <div className="node-item-label">Media</div>
        </div>
      </div>

      <div className="panel-footer">
        <p className="panel-hint">Drag or click to add</p>
      </div>
    </div>
  );
};

export default NodePanel;
