import React, { useState, useEffect } from 'react';
import './TriggerSettingsPanel.css';

/**
 * TriggerSettingsPanel - displays settings for the trigger node
 * Allows users to:
 * - Select trigger event type
 * - Add/remove keywords for keyword match trigger
 */
const TriggerSettingsPanel = ({ selectedNode, onUpdateNode, onBack }) => {
  const [triggerEvent, setTriggerEvent] = useState('keyword');
  const [keywords, setKeywords] = useState([]);
  const [keywordInput, setKeywordInput] = useState('');

  // Update local state when selectedNode changes
  useEffect(() => {
    if (selectedNode) {
      setTriggerEvent(selectedNode.data.triggerEvent || 'keyword');
      setKeywords(selectedNode.data.keywords || []);
    }
  }, [selectedNode]);

  /**
   * Handle trigger event change
   */
  const handleEventChange = (e) => {
    const newEvent = e.target.value;
    setTriggerEvent(newEvent);
    onUpdateNode(selectedNode.id, {
      ...selectedNode.data,
      triggerEvent: newEvent,
    });
  };

  /**
   * Handle adding a keyword
   */
  const handleAddKeyword = (e) => {
    if (e.key === 'Enter' && keywordInput.trim()) {
      e.preventDefault();
      const newKeyword = keywordInput.trim();
      if (!keywords.includes(newKeyword)) {
        const updatedKeywords = [...keywords, newKeyword];
        setKeywords(updatedKeywords);
        onUpdateNode(selectedNode.id, {
          ...selectedNode.data,
          keywords: updatedKeywords,
        });
      }
      setKeywordInput('');
    }
  };

  /**
   * Handle removing a keyword
   */
  const handleRemoveKeyword = (keywordToRemove) => {
    const updatedKeywords = keywords.filter(k => k !== keywordToRemove);
    setKeywords(updatedKeywords);
    onUpdateNode(selectedNode.id, {
      ...selectedNode.data,
      keywords: updatedKeywords,
    });
  };

  if (!selectedNode) {
    return null;
  }

  return (
    <div className="trigger-settings-panel">
      {/* Header with back button */}
      <div className="settings-header">
        <button className="back-button" onClick={onBack} title="Back to nodes panel">
          ← 
        </button>
        <h3>Trigger</h3>
      </div>

      {/* Content area */}
      <div className="settings-content">
        {/* Trigger Event Selector */}
        <div className="settings-section">
          <label className="settings-label" htmlFor="trigger-event">
            Trigger Event
          </label>
          <select
            id="trigger-event"
            className="settings-select"
            value={triggerEvent}
            onChange={handleEventChange}
          >
            <option value="keyword">Keyword Match</option>
            <option value="start_conversation">User Start Conversation</option>
            <option value="button_selected">Button Selected</option>
            <option value="contact_added">Contact Added</option>
          </select>
          <p className="settings-description">
            {triggerEvent === 'keyword' && 'Trigger the flow when a user\'s message matches any defined keyword.'}
            {triggerEvent === 'start_conversation' && 'Event occurs when a user initiates a new conversation.'}
            {triggerEvent === 'button_selected' && 'Trigger event when a user replies via a quick reply button on a sent template.'}
            {triggerEvent === 'contact_added' && 'Trigger when a new contact is created.'}
          </p>
        </div>

        {/* Keywords Input (only for keyword trigger) */}
        {triggerEvent === 'keyword' && (
          <div className="settings-section">
            <label className="settings-label" htmlFor="keywords-input">
              Enter Keywords
            </label>
            <input
              id="keywords-input"
              type="text"
              className="settings-input"
              value={keywordInput}
              onChange={(e) => setKeywordInput(e.target.value)}
              onKeyDown={handleAddKeyword}
              placeholder="Type, press enter to add keyword."
              autoFocus
            />
            <p className="settings-hint">
              Type a keyword and press Enter to add it
            </p>

            {/* Display added keywords */}
            {keywords.length > 0 && (
              <div className="keywords-display">
                {keywords.map((keyword, index) => (
                  <div key={index} className="keyword-chip">
                    <span>{keyword}</span>
                    <button
                      className="keyword-remove"
                      onClick={() => handleRemoveKeyword(keyword)}
                      title="Remove keyword"
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default TriggerSettingsPanel;
