import React, { useEffect } from 'react';
import './Toast.css';

/**
 * Toast component - displays success or error notifications
 * @param {string} message - The message to display
 * @param {string} type - 'success' or 'error'
 * @param {function} onClose - Callback when toast is closed
 * @param {number} duration - Auto-close duration in ms (default: 3000)
 */
const Toast = ({ message, type = 'success', onClose, duration = 3000 }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, onClose]);

  return (
    <div className={`toast toast-${type}`}>
      <span className="toast-message">{message}</span>
      <button className="toast-close" onClick={onClose}>
        ×
      </button>
    </div>
  );
};

export default Toast;
