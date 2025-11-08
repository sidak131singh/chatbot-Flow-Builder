import React, { useState, useEffect, useRef } from 'react';
import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';
import './DownloadButton.css';

/**
 * DownloadButton - downloads the flow canvas as an image or PDF
 * Automatically fits the view before capturing to include all nodes
 */
const DownloadButton = ({ reactFlowInstance }) => {
  const [showMenu, setShowMenu] = useState(false);
  const menuRef = useRef(null);

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setShowMenu(false);
      }
    };

    if (showMenu) {
      document.addEventListener('mousedown', handleClickOutside);
    }   

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showMenu]);

  const captureCanvas = async () => {
    // Fit view to show all nodes before capturing
    if (reactFlowInstance) {
      reactFlowInstance.fitView({ padding: 0.4, duration: 500, maxZoom: 1 });
      
      // Wait for the fit view animation to complete and rendering to settle
      await new Promise(resolve => setTimeout(resolve, 800));
    }
    
    // Get the React Flow viewport element
    const flowElement = document.querySelector('.react-flow');
    
    if (!flowElement) {
      console.error('React Flow element not found');
      return null;
    }

    // Capture the canvas with better options
    const canvas = await html2canvas(flowElement, {
      backgroundColor: '#ffffff',
      scale: 2, // Higher quality (2x resolution)
      logging: false,
      useCORS: true,
      allowTaint: true,
      foreignObjectRendering: false,
      windowHeight: flowElement.scrollHeight + 100,
      windowWidth: flowElement.scrollWidth + 100,
      scrollY: -50,
      scrollX: -50,
      height: flowElement.scrollHeight + 100,
      width: flowElement.scrollWidth + 100,
    });

    return canvas;
  };

  const handleDownloadPNG = async () => {
    try {
      setShowMenu(false);
      const canvas = await captureCanvas();
      
      if (!canvas) return;

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
      console.error('Error downloading PNG:', error);
    }
  };

  const handleDownloadPDF = async () => {
    try {
      setShowMenu(false);
      const canvas = await captureCanvas();
      
      if (!canvas) return;

      // Convert canvas to image data
      const imgData = canvas.toDataURL('image/png');
      
      // Calculate PDF dimensions (A4 size in landscape)
      const imgWidth = canvas.width;
      const imgHeight = canvas.height;
      const ratio = imgWidth / imgHeight;
      
      // A4 dimensions in mm
      const pdfWidth = ratio > 1 ? 297 : 210;
      const pdfHeight = ratio > 1 ? 210 : 297;
      
      // Calculate image dimensions to fit in PDF
      let finalWidth = pdfWidth - 20; // 10mm margin on each side
      let finalHeight = finalWidth / ratio;
      
      if (finalHeight > pdfHeight - 20) {
        finalHeight = pdfHeight - 20;
        finalWidth = finalHeight * ratio;
      }

      // Create PDF
      const pdf = new jsPDF({
        orientation: ratio > 1 ? 'landscape' : 'portrait',
        unit: 'mm',
        format: 'a4'
      });

      // Add image to PDF (centered)
      const xOffset = (pdfWidth - finalWidth) / 2;
      const yOffset = (pdfHeight - finalHeight) / 2;
      
      pdf.addImage(imgData, 'PNG', xOffset, yOffset, finalWidth, finalHeight);
      
      // Download PDF
      const timestamp = new Date().toISOString().slice(0, 10);
      pdf.save(`chatbot-flow-${timestamp}.pdf`);
    } catch (error) {
      console.error('Error downloading PDF:', error);
    }
  };

  const handleDownload = async () => {
    setShowMenu(!showMenu);
  };

  return (
    <div className="download-button-container" ref={menuRef}>
      <button className="download-button" onClick={handleDownload} title="Download flow">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
          <polyline points="7 10 12 15 17 10"/>
          <line x1="12" y1="15" x2="12" y2="3"/>
        </svg>
        Download
        <span className="arrow-box">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <polyline points="6 9 12 15 18 9"/>
          </svg>
        </span>
      </button>
      
      {showMenu && (
        <div className="download-menu">
          <div className="download-menu-item" onClick={handleDownloadPNG}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <rect x="3" y="3" width="18" height="18" rx="2" ry="2"/>
              <circle cx="8.5" cy="8.5" r="1.5"/>
              <polyline points="21 15 16 10 5 21"/>
            </svg>
            Download as PNG
          </div>
          <div className="download-menu-item" onClick={handleDownloadPDF}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
              <polyline points="14 2 14 8 20 8"/>
              <line x1="16" y1="13" x2="8" y2="13"/>
              <line x1="16" y1="17" x2="8" y2="17"/>
              <polyline points="10 9 9 9 8 9"/>
            </svg>
            Download as PDF
          </div>
        </div>
      )}
    </div>
  );
};

export default DownloadButton;
