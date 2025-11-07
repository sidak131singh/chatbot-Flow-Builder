import React from 'react';
import { BaseEdge, EdgeLabelRenderer, getBezierPath } from 'reactflow';
import './CustomEdge.css';

//BaseEdge component - React Flow component that renders the actual edge line
//EdgeLabelRenderer: Special component for rendering content on top of edges(like minus button)
//getBezierPath: Function that calculates a smooth curved path between two points

const CustomEdge = ({
  id,
  sourceX,
  sourceY,
  targetX,
  targetY,
  sourcePosition, //right handle of source node
  targetPosition, //left handle of target node
  style = {},
  markerEnd,    
}) => {
  const [edgePath, labelX, labelY] = getBezierPath({ // calls getBezierPath source and target positions
    sourceX,     // returns an array with the path and label coordinates(where delete button will be placed)
    sourceY,
    sourcePosition,
    targetX,
    targetY,
    targetPosition,
  });

  //Handle edge deletion
  const onEdgeClick = (evt, edgeId) => {
    evt.stopPropagation(); //so clicking delete doesn't deselect nodes
    // custom browser event named 'delete-edge'
    //done because the CustomEdge component file doesn't have direct access to setEdges
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
            // Center the label on the edge
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
            <svg //minus button icon
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
// react component must return a single parent element
// but here we use a fragment to wrap both elements(edge and minus button)
//thats why we used a wrapper <> </>

export default CustomEdge;


/*User hovers over edge
         ↓
CSS shows delete button (opacity: 0 → 1)
         ↓
User clicks minus button (−)
         ↓
onEdgeClick() fires
         ↓
Creates custom event: 'delete-edge'
         ↓
window.dispatchEvent()
         ↓
App.jsx catches event (useEffect listener)
         ↓
setEdges() filters out this edge
         ↓
Edge disappears from canvas*/