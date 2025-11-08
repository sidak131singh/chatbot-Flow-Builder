import React from 'react';
import html2canvas from 'html2canvas';
import './DownloadButton.css';

/**
 * DownloadButton - downloads the flow canvas as an image
 */
const DownloadButton = () => {
  const handleDownload = async () => {
    try {
      // Get the React Flow viewport element
      const flowElement = document.querySelector('.react-flow');
      
      if (!flowElement) {
        console.error('React Flow element not found');
        return;
      }

      // Capture the canvas
      const canvas = await html2canvas(flowElement, {
        backgroundColor: '#ffffff',
        scale: 2, // Higher quality (2x resolution)
        logging: false,
        useCORS: true,
      });

      // Convert to blob and download
      canvas.toBlob((blob) => {
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        const timestamp = new Date().toISOString().slice(0, 10);
        link.download = `chatbot-flow-${timestamp}.png`;
        link.href = url;
        link.click();
        URL.revokeObjectURL(url);
      });
    } catch (error) {
      console.error('Error downloading flow:', error);
    }
  };

  return (
    <button className="download-button" onClick={handleDownload} title="Download flow as image">
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
        <polyline points="7 10 12 15 17 10"/>
        <line x1="12" y1="15" x2="12" y2="3"/>
      </svg>
      Download
    </button>
  );
};

export default DownloadButton;
