import React, { useState, useRef, useEffect } from 'react';
import { Handle, Position, useReactFlow } from 'reactflow';
import './MediaNode.css';

/**
 * MediaNode component - for sending media content (images, videos, audio, documents)
 * Features:
 * - Media type selection (Image, Video, Audio, Document)
 * - URL input for media
 * - Caption field
 * - Quick reply buttons (max 3)
 * - Add content blocks
 * - Delete button
 */
const MediaNode = ({ data, selected, id }) => {
  const { setNodes, setEdges } = useReactFlow();
  const [showMediaTypeDropdown, setShowMediaTypeDropdown] = useState(false);
  const buttonRefs = useRef([]);
  const nodeRef = useRef(null);

  /**
   * Handle node deletion
   */
  const handleDelete = () => {
    // Remove the node
    setNodes((nodes) => nodes.filter((node) => node.id !== id));
    
    // Remove all edges connected to this node
    setEdges((edges) => edges.filter(
      (edge) => edge.source !== id && edge.target !== id
    ));
  };

  /**
   * Handle media type change
   */
  const handleMediaTypeChange = (mediaType) => {
    setNodes((nds) =>
      nds.map((node) => {
        if (node.id === id) {
          return {
            ...node,
            data: {
              ...node.data,
              mediaType: mediaType,
            },
          };
        }
        return node;
      })
    );
    setShowMediaTypeDropdown(false);
  };

  /**
   * Handle URL change
   */
  const handleURLChange = (e) => {
    e.stopPropagation();
    const newURL = e.target.value;
    
    setNodes((nds) =>
      nds.map((node) => {
        if (node.id === id) {
          return {
            ...node,
            data: {
              ...node.data,
              mediaURL: newURL,
            },
          };
        }
        return node;
      })
    );
  };

  /**
   * Handle caption change
   */
  const handleCaptionChange = (e) => {
    e.stopPropagation();
    const newCaption = e.target.value;
    
    setNodes((nds) =>
      nds.map((node) => {
        if (node.id === id) {
          return {
            ...node,
            data: {
              ...node.data,
              caption: newCaption,
            },
          };
        }
        return node;
      })
    );
  };

  /**
   * Add a quick reply button
   */
  const handleAddButton = (e) => {
    e.stopPropagation();
    const currentButtons = data.buttons || [];
    
    if (currentButtons.length >= 3) {
      return; // Max 3 buttons
    }
    
    setNodes((nds) =>
      nds.map((node) => {
        if (node.id === id) {
          return {
            ...node,
            data: {
              ...node.data,
              buttons: [...currentButtons, { text: '' }],
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
    const updatedButtons = [...(data.buttons || [])];
    updatedButtons[index] = { text: newText };
    
    setNodes((nds) =>
      nds.map((node) => {
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
  };

  /**
   * Remove a button
   */
  const handleRemoveButton = (index) => {
    const updatedButtons = (data.buttons || []).filter((_, i) => i !== index);
    
    setNodes((nds) =>
      nds.map((node) => {
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
  };

  const mediaType = data.mediaType || 'image';
  const mediaURL = data.mediaURL || '';
  const caption = data.caption || '';
  const buttons = data.buttons || [];

  return (
    <div className={`media-node ${selected ? 'selected' : ''}`} ref={nodeRef}>
      {/* Delete button */}
      <button className="delete-node-btn" onClick={handleDelete} title="Delete node">
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M3 6h18M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a2 2 0 012-2h4a2 2 0 012 2v2M10 11v6M14 11v6"/>
        </svg>
      </button>

      {/* Header */}
      <div className="media-node-header">
        <div className="header-left">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <rect x="3" y="3" width="18" height="18" rx="2" ry="2"/>
            <circle cx="8.5" cy="8.5" r="1.5"/>
            <polyline points="21 15 16 10 5 21"/>
          </svg>
          <span>Media Button</span>
        </div>
      </div>

      {/* Body */}
      <div className="media-node-body">
        {/* Media Type Selector */}
        <div className="media-section">
          <label className="section-label">Select Media Type</label>
          <div className="media-type-selector" onClick={(e) => {
            e.stopPropagation();
            setShowMediaTypeDropdown(!showMediaTypeDropdown);
          }}>
            <span className="selected-media-type">
              {mediaType.charAt(0).toUpperCase() + mediaType.slice(1)}
            </span>
            <span className="dropdown-arrow">▼</span>
          </div>
          
          {showMediaTypeDropdown && (
            <div className="media-type-dropdown" onClick={(e) => e.stopPropagation()}>
              <div className="dropdown-item" onClick={() => handleMediaTypeChange('image')}>
                Image
              </div>
              <div className="dropdown-item" onClick={() => handleMediaTypeChange('video')}>
                Video
              </div>
              <div className="dropdown-item" onClick={() => handleMediaTypeChange('audio')}>
                Audio
              </div>
              <div className="dropdown-item" onClick={() => handleMediaTypeChange('document')}>
                Document
              </div>
            </div>
          )}
          <p className="section-hint">Select media type you want.</p>
        </div>

        {/* URL Input */}
        <div className="media-section">
          <label className="section-label">Enter or Paste URL</label>
          <input
            type="text"
            className="media-input"
            value={mediaURL}
            onChange={handleURLChange}
            onClick={(e) => e.stopPropagation()}
            placeholder="Enter media URL here."
          />
        </div>

        {/* File Upload Area */}
        <div className="media-section">
          <div className="file-upload-area">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#9ca3af" strokeWidth="2">
              <path d="M7 18a4.6 4.4 0 0 1 0 -9a5 4.5 0 0 1 11 2h1a3.5 3.5 0 0 1 0 7h-1"/>
              <polyline points="9 15 12 12 15 15"/>
              <line x1="12" y1="12" x2="12" y2="21"/>
            </svg>
            <p>Drag and Drop file or Browse</p>
          </div>
        </div>

        {/* Caption */}
        <div className="media-section">
          <label className="section-label">Enter Caption</label>
          <textarea
            className="media-textarea"
            value={caption}
            onChange={handleCaptionChange}
            onClick={(e) => e.stopPropagation()}
            placeholder="Enter caption text here."
            rows={3}
          />
        </div>

        {/* Quick Reply Buttons */}
        {buttons.length > 0 && (
          <div className="media-section">
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

      {/* Handles */}
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

export default MediaNode;
