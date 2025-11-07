import React, { useState, useRef, useEffect } from 'react';
import { Handle, Position, useReactFlow } from 'reactflow';
import './TriggerNode.css';

/**
 * TriggerNode component - represents the starting point of a chatbot flow
 * Features:
 * - Different trigger events (Keyword Match, User Start Conversation, etc.)
 * - Keywords input for keyword match trigger
 * - Source handle only (no target - it's the start)
 * - Cannot be deleted (always present as flow starter)
 * - Interactive dropdown and keyword input directly on the node
 */
const TriggerNode = ({ data, selected, id }) => {
  const { setNodes } = useReactFlow();
  const [keywordInput, setKeywordInput] = useState('');
  const [showKeywordInput, setShowKeywordInput] = useState(false);
  const keywordInputRef = useRef(null);

  // Get trigger event display name
  const getTriggerEventLabel = (eventType) => {
    switch (eventType) {
      case 'keyword':
        return 'Keyword Match';
      case 'start_conversation':
        return 'User Start Conversation';
      case 'button_selected':
        return 'Button Selected';
      case 'contact_added':
        return 'Contact Added';
      default:
        return 'Keyword Match';
    }
  };

  // Focus keyword input when it becomes visible
  useEffect(() => {
    if (showKeywordInput && keywordInputRef.current) {
      keywordInputRef.current.focus();
    }
  }, [showKeywordInput]);

  /**
   * Handle trigger event change
   */
  const handleEventChange = (e) => {
    e.stopPropagation(); // Prevent node selection
    const newEvent = e.target.value;
    
    setNodes((nds) =>
      nds.map((node) => {
        if (node.id === id) {
          return {
            ...node,
            data: {
              ...node.data,
              triggerEvent: newEvent,
            },
          };
        }
        return node;
      })
    );
  };

  /**
   * Handle adding a keyword
   */
  const handleAddKeyword = (e) => {
    if (e.key === 'Enter' && keywordInput.trim()) {
      e.preventDefault();
      e.stopPropagation();
      
      const newKeyword = keywordInput.trim();
      const currentKeywords = data.keywords || [];
      
      if (!currentKeywords.includes(newKeyword)) {
        setNodes((nds) =>
          nds.map((node) => {
            if (node.id === id) {
              return {
                ...node,
                data: {
                  ...node.data,
                  keywords: [...currentKeywords, newKeyword],
                },
              };
            }
            return node;
          })
        );
      }
      
      setKeywordInput('');
      setShowKeywordInput(false);
    } else if (e.key === 'Escape') {
      setKeywordInput('');
      setShowKeywordInput(false);
    }
  };

  /**
   * Handle removing a keyword
   */
  const handleRemoveKeyword = (e, keywordToRemove) => {
    e.stopPropagation(); // Prevent node selection
    
    const updatedKeywords = (data.keywords || []).filter(k => k !== keywordToRemove);
    
    setNodes((nds) =>
      nds.map((node) => {
        if (node.id === id) {
          return {
            ...node,
            data: {
              ...node.data,
              keywords: updatedKeywords,
            },
          };
        }
        return node;
      })
    );
  };

  /**
   * Show keyword input field
   */
  const handleShowKeywordInput = (e) => {
    e.stopPropagation(); // Prevent node selection
    setShowKeywordInput(true);
  };

  return (
    <div className={`trigger-node ${selected ? 'selected' : ''}`}>
      {/* Header section */}
      <div className="trigger-node-header">
        <div className="trigger-title">Trigger</div>
      </div>

      {/* Body section */}
      <div className="trigger-node-body">
        <div className="trigger-event-label">Trigger Event</div>
        
        {/* Interactive dropdown for trigger event */}
        <select
          className="trigger-event-dropdown"
          value={data.triggerEvent || 'keyword'}
          onChange={handleEventChange}
          onClick={(e) => e.stopPropagation()}
        >
          <option value="keyword">Keyword Match</option>
          <option value="start_conversation">User Start Conversation</option>
          <option value="button_selected">Button Selected</option>
          <option value="contact_added">Contact Added</option>
        </select>

        {/* Show keywords for keyword trigger type */}
        {(data.triggerEvent === 'keyword' || !data.triggerEvent) && (
          <div className="trigger-keywords-section">
            {data.keywords && data.keywords.length > 0 && (
              <div className="trigger-keywords">
                <div className="keywords-label">Keywords:</div>
                <div className="keywords-list">
                  {data.keywords.map((keyword, index) => (
                    <span key={index} className="keyword-tag">
                      {keyword}
                      <button
                        className="keyword-remove-btn"
                        onClick={(e) => handleRemoveKeyword(e, keyword)}
                        title="Remove keyword"
                      >
                        ×
                      </button>
                    </span>
                  ))}
                </div>
              </div>
            )}
            
            {/* Keyword input field */}
            {showKeywordInput ? (
              <input
                ref={keywordInputRef}
                type="text"
                className="keyword-input-field"
                value={keywordInput}
                onChange={(e) => setKeywordInput(e.target.value)}
                onKeyDown={handleAddKeyword}
                onBlur={() => {
                  setKeywordInput('');
                  setShowKeywordInput(false);
                }}
                onClick={(e) => e.stopPropagation()}
                placeholder="Type keyword, press Enter"
              />
            ) : (
              <button
                className="add-keyword-btn"
                onClick={handleShowKeywordInput}
              >
                + Add Keyword
              </button>
            )}
          </div>
        )}

        {/* Message for other trigger types */}
        {data.triggerEvent === 'start_conversation' && (
          <div className="trigger-description">
            Triggers when user initiates a new conversation
          </div>
        )}
        {data.triggerEvent === 'button_selected' && (
          <div className="trigger-description">
            Triggers when user clicks a quick reply button
          </div>
        )}
        {data.triggerEvent === 'contact_added' && (
          <div className="trigger-description">
            Triggers when a new contact is created
          </div>
        )}
      </div>

      {/* Source handle only (no target - trigger is the start) */}
      <Handle
        type="source"
        position={Position.Right}
        id="source"
        className="custom-handle"
      />
    </div>
  );
};

export default TriggerNode;
