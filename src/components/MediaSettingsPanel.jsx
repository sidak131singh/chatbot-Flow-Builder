import React from 'react';
import './MediaSettingsPanel.css';

/**
 * MediaSettingsPanel - displays settings for media nodes
 * Allows users to:
 * - Select media type
 * - Enter media URL
 * - Add caption
 * - Add quick reply buttons (max 3)
 */
const MediaSettingsPanel = ({ selectedNode, onUpdateNode, onBack }) => {
  if (!selectedNode) {
    return null;
  }

  const mediaType = selectedNode.data.mediaType || 'image';
  const mediaURL = selectedNode.data.mediaURL || '';
  const caption = selectedNode.data.caption || '';
  const buttons = selectedNode.data.buttons || [];

  /**
   * Handle media type change
   */
  const handleMediaTypeChange = (e) => {
    onUpdateNode(selectedNode.id, {
      ...selectedNode.data,
      mediaType: e.target.value,
    });
  };

  /**
   * Handle URL change
   */
  const handleURLChange = (e) => {
    onUpdateNode(selectedNode.id, {
      ...selectedNode.data,
      mediaURL: e.target.value,
    });
  };

  /**
   * Handle caption change
   */
  const handleCaptionChange = (e) => {
    onUpdateNode(selectedNode.id, {
      ...selectedNode.data,
      caption: e.target.value,
    });
  };

  /**
   * Add a quick reply button
   */
  const handleAddButton = () => {
    if (buttons.length >= 3) return;
    
    onUpdateNode(selectedNode.id, {
      ...selectedNode.data,
      buttons: [...buttons, { text: '' }],
    });
  };

  /**
   * Update button text
   */
  const handleButtonTextChange = (index, newText) => {
    const updatedButtons = [...buttons];
    updatedButtons[index] = { text: newText };
    
    onUpdateNode(selectedNode.id, {
      ...selectedNode.data,
      buttons: updatedButtons,
    });
  };

  /**
   * Remove a button
   */
  const handleRemoveButton = (index) => {
    const updatedButtons = buttons.filter((_, i) => i !== index);
    
    onUpdateNode(selectedNode.id, {
      ...selectedNode.data,
      buttons: updatedButtons,
    });
  };

  return (
    <div className="media-settings-panel">
      {/* Header with back button */}
      <div className="settings-header">
        <button className="back-button" onClick={onBack} title="Back to nodes panel">
          ← 
        </button>
        <h3>Media Button</h3>
      </div>

      {/* Content area */}
      <div className="settings-content">
        {/* Media Type Selector */}
        <div className="settings-section">
          <label className="settings-label" htmlFor="media-type">
            Select Media Type
          </label>
          <select
            id="media-type"
            className="settings-select"
            value={mediaType}
            onChange={handleMediaTypeChange}
          >
            <option value="image">Image</option>
            <option value="video">Video</option>
            <option value="audio">Audio</option>
            <option value="document">Document</option>
          </select>
          <p className="settings-hint">Select media type you want.</p>
        </div>

        {/* URL Input */}
        <div className="settings-section">
          <label className="settings-label" htmlFor="media-url">
            Enter or Paste URL
          </label>
          <input
            id="media-url"
            type="text"
            className="settings-input"
            value={mediaURL}
            onChange={handleURLChange}
            placeholder="Enter media URL here."
          />
        </div>

        {/* File Upload Placeholder */}
        <div className="settings-section">
          <div className="file-upload-placeholder">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#9ca3af" strokeWidth="2">
              <path d="M7 18a4.6 4.4 0 0 1 0 -9a5 4.5 0 0 1 11 2h1a3.5 3.5 0 0 1 0 7h-1"/>
              <polyline points="9 15 12 12 15 15"/>
              <line x1="12" y1="12" x2="12" y2="21"/>
            </svg>
            <p>Drag and Drop file or Browse</p>
          </div>
        </div>

        {/* Caption */}
        <div className="settings-section">
          <label className="settings-label" htmlFor="caption">
            Enter Caption
          </label>
          <textarea
            id="caption"
            className="settings-textarea"
            value={caption}
            onChange={handleCaptionChange}
            placeholder="Enter caption text here."
            rows={3}
          />
        </div>

        {/* Quick Reply Buttons */}
        {buttons.length > 0 && (
          <div className="settings-section">
            <label className="settings-label">Quick Reply Buttons</label>
            {buttons.map((button, index) => (
              <div key={index} className="button-input-row">
                <input
                  type="text"
                  className="button-input"
                  value={button.text}
                  onChange={(e) => handleButtonTextChange(index, e.target.value)}
                  placeholder={`Button ${index + 1} text`}
                />
                <button
                  className="remove-btn"
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    handleRemoveButton(index);
                  }}
                  onMouseDown={(e) => e.stopPropagation()}
                  title="Remove button"
                >
                  ×
                </button>
              </div>
            ))}
          </div>
        )}

        {/* Add Button */}
        {buttons.length < 3 && (
          <div className="settings-section">
            <button className="add-button" onClick={handleAddButton}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="10"/>
                <line x1="12" y1="8" x2="12" y2="16"/>
                <line x1="8" y1="12" x2="16" y2="12"/>
              </svg>
              Add Button
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default MediaSettingsPanel;
