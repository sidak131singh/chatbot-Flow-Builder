import React, { useRef } from 'react';
import { Handle, Position, useReactFlow } from 'reactflow';
import './MessageNode.css';

//handle : creates connection points on nodes
//position : defines where the handle appears on the node (left, right, top, bottom)
//useReactFlow : hook to access and manipulate the React Flow state and methods(setNodes, setEdges)

//data : text message content, buttons array
//selected : boolean indicating if the node is currently selected
//id : unique identifier for the node

const MessageNode = ({ data, selected, id }) => {
  const { setNodes, setEdges } = useReactFlow();
  const buttonRefs = useRef([]);

  const buttons = data.buttons || [];

  /**
   * Handle message text change
   */
  const handleMessageChange = (e) => {
    e.stopPropagation();
    const newMessage = e.target.value;
    
    setNodes((nodes) =>
      nodes.map((node) => {
        if (node.id === id) {
          return {
            ...node,
            data: {
              ...node.data,
              message: newMessage,
            },
          };
        }
        return node;
      })
    );
  };

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

  /**
   * Add a quick reply button (max 3)
   */
  const handleAddButton = (e) => {
    e.stopPropagation();
    if (buttons.length >= 3) return;
    
    setNodes((nodes) =>
      nodes.map((node) => {
        if (node.id === id) {
          return {
            ...node,
            data: {
              ...node.data,
              buttons: [...buttons, { text: '' }],
            },
          };
        }
        return node;
      })
    );
  };

  /**
   * Update button text
   */
  const handleButtonTextChange = (index, newText) => {
    setNodes((nodes) =>
      nodes.map((node) => {
        if (node.id === id) {
          const updatedButtons = [...buttons];
          updatedButtons[index] = { text: newText };
          return {
            ...node,
            data: {
              ...node.data,
              buttons: updatedButtons,
            },
          };
        }
        return node;
      })
    );
  };

  /**
   * Remove a button
   */
  const handleRemoveButton = (index) => {
    const updatedButtons = buttons.filter((_, i) => i !== index);
    
    setNodes((nodes) =>
      nodes.map((node) => {
        if (node.id === id) {
          return {
            ...node,
            data: {
              ...node.data,
              buttons: updatedButtons,
            },
          };
        }
        return node;
      })
    );

    // Remove edges connected to this button's handle
    setEdges((edges) =>
      edges.filter((edge) => edge.sourceHandle !== `button-${index}` || edge.source !== id)
    );
  };

  return (
    //if not selected className will be just message-node else 'message-node selected'
    <div className={`message-node ${selected ? 'selected' : ''}`}>
      {/* Header section with icon, title, and delete button */}
      <div className="message-node-header">
        <svg className="message-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
        </svg>
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
        <div className="message-text-container">
          <textarea
            className="message-text-input"
            value={data.message || ''}
            onChange={handleMessageChange}
            onClick={(e) => e.stopPropagation()}
            placeholder="Enter your message..."
            rows={3}
          />
        </div>

        {/* Quick Reply Buttons */}
        {buttons.length > 0 && (
          <div className="message-section">
            <label className="section-label">Quick Reply Buttons</label>
            {buttons.map((button, index) => (
              <div 
                key={index} 
                className="button-input-row-wrapper"
              >
                <div 
                  className="button-input-row"
                  ref={(el) => (buttonRefs.current[index] = el)}
                >
                  <input
                    type="text"
                    className="button-input"
                    value={button.text}
                    onChange={(e) => {
                      e.stopPropagation();
                      handleButtonTextChange(index, e.target.value);
                    }}
                    onClick={(e) => e.stopPropagation()}
                    placeholder={`Button ${index + 1} text`}
                  />
                  <button
                    className="remove-button-btn"
                    onClick={(e) => {
                      e.stopPropagation();
                      e.preventDefault();
                      handleRemoveButton(index);
                    }}
                    onMouseDown={(e) => e.stopPropagation()}
                    title="Remove button"
                  >
                    ×
                  </button>
                </div>
                {/* Source handle for this specific button */}
                <Handle
                  type="source"
                  position={Position.Right}
                  id={`button-${index}`}
                  className="button-handle-inline"
                />
              </div>
            ))}
          </div>
        )}

        {/* Add Button */}
        {buttons.length < 3 && (
          <button
            className="add-button-btn"
            onClick={handleAddButton}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="12" r="10"/>
              <line x1="12" y1="8" x2="12" y2="16"/>
              <line x1="8" y1="12" x2="16" y2="12"/>
            </svg>
            Add Button
          </button>
        )}
      </div>

      {/* Target handle (left side) - accepts incoming connections */}
      <Handle
        type="target"
        position={Position.Left}
        id="target"
        className="custom-handle"
      />

      {/* Only show default source handle if no buttons exist */}
      {buttons.length === 0 && (
        <Handle
          type="source"
          position={Position.Right}
          id="source"
          className="custom-handle"
        />
      )}
    </div>
  );
};

export default MessageNode;
