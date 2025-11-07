import React from 'react';
import './SaveButton.css';

/**
 * SaveButton component - validates and saves the flow
 * Validation rules:
 * - If there are multiple nodes, only one node can have no incoming connections (start node)
 * - Shows toast notification if validation fails or succeeds
 * - Logs flow data (nodes and edges) to console on success
 */
const SaveButton = ({ nodes, edges, onSave, onShowToast }) => {
  /**
   * Validate the flow before saving
   * Returns an error message if validation fails, null otherwise
   */
  const validateFlow = () => {
    // If there are no nodes or only one node, flow is valid
    if (nodes.length <= 1) {
      return null;
    }

    // Check how many nodes have no incoming connections
    // Exclude trigger nodes from this count as they are always start nodes
    const nodesWithoutIncoming = nodes.filter(node => {
      // Skip trigger nodes - they are meant to be start nodes
      if (node.type === 'trigger') {
        return false;
      }
      
      // Check if this node has any incoming edges
      const hasIncoming = edges.some(edge => edge.target === node.id);
      return !hasIncoming;
    });

    // If more than one node (excluding triggers) has no incoming connections, it's an error
    if (nodesWithoutIncoming.length > 1) {
      return 'Cannot save flow: More than one node has empty target handles.\nEach flow should have only one start node.';
    }

    return null;
  };

  /**
   * Handle save button click
   */
  const handleSave = () => {
    const error = validateFlow();
    
    if (error) {
      // Show error toast
      if (onShowToast) {
        onShowToast(error, 'error');
      }
    } else {
      // Flow is valid, save it
      const flowData = {
        nodes: nodes.map(node => ({
          id: node.id,
          type: node.type,
          position: node.position,
          data: node.data
        })),
        edges: edges.map(edge => ({
          id: edge.id,
          source: edge.source,
          target: edge.target
        }))
      };

      console.log('✅ Flow saved successfully!');
      console.log('Flow Data:', JSON.stringify(flowData, null, 2));
      
      // Show success toast
      if (onShowToast) {
        onShowToast('Flow saved successfully!', 'success');
      }
      
      // Call optional onSave callback
      if (onSave) {
        onSave(flowData);
      }
    }
  };

  return (
    <button className="save-button" onClick={handleSave} title="Save flow">
      Save Changes
    </button>
  );
};

export default SaveButton;
