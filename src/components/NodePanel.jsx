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
