import React from 'react';
import { BaseEdge, EdgeLabelRenderer, getBezierPath } from 'reactflow';
import './CustomEdge.css';

/**
 * CustomEdge component - displays edges with a delete button on hover
 * Features:
 * - Shows minus sign button when hovering over edge
 * - Removes edge when button is clicked
 * - Smooth bezier curve
 */
const CustomEdge = ({
  id,
  sourceX,
  sourceY,
  targetX,
  targetY,
  sourcePosition,
  targetPosition,
  style = {},
  markerEnd,
}) => {
  const [edgePath, labelX, labelY] = getBezierPath({
    sourceX,
    sourceY,
    sourcePosition,
    targetX,
    targetY,
    targetPosition,
  });

  /**
   * Handle edge deletion
   */
  const onEdgeClick = (evt, edgeId) => {
    evt.stopPropagation();
    // This will be handled by React Flow's onEdgesDelete
    const deleteEvent = new CustomEvent('delete-edge', { detail: { edgeId } });
    window.dispatchEvent(deleteEvent);
  };

  return (
    <>
      <BaseEdge path={edgePath} markerEnd={markerEnd} style={style} />
      <EdgeLabelRenderer>
        <div
          style={{
            position: 'absolute',
            transform: `translate(-50%, -50%) translate(${labelX}px,${labelY}px)`,
            fontSize: 12,
            pointerEvents: 'all',
          }}
          className="edge-button-wrapper"
        >
          <button
            className="edge-delete-button"
            onClick={(event) => onEdgeClick(event, id)}
            title="Delete edge"
          >
            <svg
              width="12"
              height="12"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="5" y1="12" x2="19" y2="12"></line>
            </svg>
          </button>
        </div>
      </EdgeLabelRenderer>
    </>
  );
};

export default CustomEdge;
