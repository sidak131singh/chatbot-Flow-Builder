import React, { useState, useEffect } from 'react';
import './SettingsPanel.css';

/**
 * SettingsPanel component - displays settings for the selected node
 * Replaces NodePanel when a node is selected
 * Allows users to edit the message text of the selected node
 */
const SettingsPanel = ({ selectedNode, onUpdateNode, onBack }) => {
  // Local state for the text input
  const [text, setText] = useState('');

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
   * Handle focus - clear default text if it's still the placeholder
   */
  const handleFocus = (e) => {
    // Check if text matches the pattern "text message X" where X is a number
    if (text && text.match(/^text message \d+$/)) {
      setText('');
      onUpdateNode(selectedNode.id, {
        ...selectedNode.data,
        message: '',
      });
    }
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
            onFocus={handleFocus}
            placeholder="Enter your message here..."
            rows={6}
            autoFocus
          />
        </div>
      </div>
    </div>
  );
};

export default SettingsPanel;
