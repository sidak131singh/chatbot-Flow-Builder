import React, { useState, useEffect } from 'react';
import './SettingsPanel.css';

/**
 * SettingsPanel component - displays settings for the selected node
 * Replaces NodePanel when a node is selected
 * Allows users to edit the message text and quick reply buttons of the selected node
 */
const SettingsPanel = ({ selectedNode, onUpdateNode, onBack }) => {
  // Local state for the text input
  const [text, setText] = useState('');

  // Get buttons from node data
  const buttons = selectedNode?.data?.buttons || [];

  // Update local state when selectedNode changes
  useEffect(() => {
    if (selectedNode) {
      setText(selectedNode.data.message || '');
    }
  }, [selectedNode]);

  /**
   * Handle text change and update node in real-time
   */
  const handleTextChange = (e) => {
    const newText = e.target.value;
    setText(newText);
    onUpdateNode(selectedNode.id, {
      ...selectedNode.data,
      message: newText,
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

  if (!selectedNode) {
    return null;
  }

  return (
    <div className="settings-panel">
      {/* Header with back button */}
      <div className="settings-header">
        <button className="back-button" onClick={onBack} title="Back to nodes panel">
          ← 
        </button>
        <h3>Message</h3>
      </div>

      {/* Content area with text input */}
      <div className="settings-content">
        <div className="settings-section">
          <label className="settings-label" htmlFor="message-text">
            Text
          </label>
          <textarea
            id="message-text"
            className="settings-textarea"
            value={text}
            onChange={handleTextChange}
            placeholder="Enter your message here..."
            rows={6}
            autoFocus
            disabled={false}
            readOnly={false}
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

export default SettingsPanel;
