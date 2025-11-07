import React from 'react';
import { Handle, Position, useReactFlow } from 'reactflow';
import './MessageNode.css';

//handle : creates connection points on nodes
//position : defines where the handle appears on the node (left, right, top, bottom)
//useReactFlow : hook to access and manipulate the React Flow state and methods(setNodes, setEdges)

//data : text message content
//selected : boolean indicating if the node is currently selected
//id : unique identifier for the node

const MessageNode = ({ data, selected, id }) => {
  const { setNodes, setEdges } = useReactFlow();

  /**
   * Handle node deletion
   * Removes the node and all connected edges
   */
  const handleDelete = (e) => {
    e.stopPropagation(); // Prevent node selection when clicking delete
    
    // Remove the node from the array after filtering out by matching with id 
    setNodes((nodes) => nodes.filter((node) => node.id !== id));
    
    // Remove all edges connected to this node
    setEdges((edges) => 
      edges.filter((edge) => edge.source !== id && edge.target !== id)
    );
  };

  return (
    //if not selected className will be just message-node else 'message-node selected'
    <div className={`message-node ${selected ? 'selected' : ''}`}>
      {/* Header section with icon, title, and delete button */}
      <div className="message-node-header">
        <div className="message-icon">💬</div>
        <div className="message-title">Send Message</div>
        <button 
          className="delete-button" 
          onClick={handleDelete} // call handleDelete on click
          title="Delete node"
        >
          <svg // svg of the trash bin icon 
            width="14" 
            height="14" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="2" 
            strokeLinecap="round" 
            strokeLinejoin="round"
          >
            <polyline points="3 6 5 6 21 6"></polyline>
            <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
            <line x1="10" y1="11" x2="10" y2="17"></line>
            <line x1="14" y1="11" x2="14" y2="17"></line>
          </svg>
        </button>
      </div>
      
      {/* Body section with message text */}
      <div className="message-node-body">
        <div className="message-text">
          {data.message || 'Enter your message...'}
        </div>
      </div>

      {/* Target handle (left side) - accepts incoming connections */}
      <Handle
        type="target"
        position={Position.Left}
        id="target"
        className="custom-handle"
      />

      {/* Source handle (right side) - creates outgoing connections */}
      <Handle
        type="source"
        position={Position.Right}
        id="source"
        className="custom-handle"
      />
    </div>
  );
};

export default MessageNode;
