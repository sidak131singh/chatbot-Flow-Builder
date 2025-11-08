import React, { useEffect } from 'react';
import './Toast.css';

/**
 * Toast component - displays success or error notifications
 * @param {string} message - The message to display
 * @param {string} type - 'success' or 'error'
 * @param {function} onClose - Callback when toast is closed
 * @param {number} duration - Auto-close duration in ms (default: auto-calculated based on message length)
 */
const Toast = ({ message, type = 'success', onClose, duration }) => {
  // Auto-calculate duration based on message length if not provided
  const autoDuration = duration || (message.length > 100 ? 8000 : 4000);
  
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, autoDuration);

    return () => clearTimeout(timer);
  }, [autoDuration, onClose]);

  return (
    <div className={`toast toast-${type}`}>
      <div className="toast-message">
        {message.split('\n').map((line, index) => (
          <React.Fragment key={index}>
            {line}
            {index < message.split('\n').length - 1 && <br />}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

export default Toast;
