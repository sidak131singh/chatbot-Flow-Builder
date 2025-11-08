import React from 'react';
import './Suggestions.css';

/**
 * Suggestions component - displays persistent suggestions for improving the flow
 * Stays visible until user closes it
 */
const Suggestions = ({ suggestions, onClose, hasToast }) => {
  if (!suggestions || suggestions.length === 0) {
    return null;
  }

  // Adjust position based on whether toast is visible
  const topPosition = hasToast ? '80px' : '20px';

  return (
    <div className="suggestions-container" style={{ top: topPosition }}>
      <div className="suggestions-header">
        <span className="suggestions-title">Suggestions</span>
        <button className="suggestions-close" onClick={onClose} title="Close suggestions">
          ×
        </button>
      </div>
      <div className="suggestions-content">
        {suggestions.map((suggestion, index) => (
          <div key={index} className="suggestion-item">
            {suggestion}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Suggestions;
