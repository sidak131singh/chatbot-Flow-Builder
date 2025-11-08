import React from 'react';
import './SaveButton.css';

/**
 * SaveButton component - validates the flow
 * Validation rules:
 * - If there are multiple nodes, only one node can have no incoming connections (start node)
 * - Shows toast notification if validation fails or succeeds
 * - Shows suggestions for unconnected quick reply buttons
 */
const SaveButton = ({ nodes, edges, onSave, onShowToast, onShowSuggestions }) => {
  /**
   * Check for unconnected quick reply buttons and return suggestions
   */
  const checkUnconnectedButtons = () => {
    const suggestions = [];
    
    nodes.forEach(node => {
      // Check if node has buttons (message or media nodes)
      const buttons = node.data?.buttons || [];
      
      if (buttons.length > 0) {
        buttons.forEach((button, index) => {
          // Check if this button's handle has an outgoing connection
          const buttonHandleId = `button-${index}`;
          const hasConnection = edges.some(
            edge => edge.source === node.id && edge.sourceHandle === buttonHandleId
          );
          
          if (!hasConnection && button.text) {
            const nodeType = node.type === 'message' ? 'Message' : 'Media';
            suggestions.push(
              `${nodeType} node: Button ${index + 1} "${button.text}" can be connected to another node`
            );
          }
        });
      }
    });
    
    return suggestions;
  };

  /**
   * Validate the flow before saving
   * Returns an error message if validation fails, null otherwise
   */
  const validateFlow = () => {
    // If there are no nodes or only one node, flow is valid
    if (nodes.length <= 1) {
      return null;
    }

    // Check for nodes without incoming connections (excluding trigger nodes)
    const nodesWithoutIncoming = nodes.filter(node => {
      // Skip trigger nodes - they are meant to be start nodes
      if (node.type === 'trigger') {
        return false;
      }
      
      // Check if this node has any incoming edges
      const hasIncoming = edges.some(edge => edge.target === node.id);
      return !hasIncoming;
    });

    // If any node (excluding triggers) has no incoming connection, show specific error
    if (nodesWithoutIncoming.length > 0) {
      // Create error messages for each unconnected node
      const errors = nodesWithoutIncoming.map(node => {
        const nodeTypeLabel = node.type === 'message' ? 'Message node' : 
                             node.type === 'media' ? 'Media node' : 
                             node.type.charAt(0).toUpperCase() + node.type.slice(1) + ' node';
        return `${nodeTypeLabel} target handle is not connected`;
      });
      
      return `Invalid flow:\n${errors.join('\n')}`;
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
      // Flow is valid - check for suggestions
      const suggestions = checkUnconnectedButtons();
      
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

      console.log('Flow is correct!');
      console.log('Flow Data:', JSON.stringify(flowData, null, 2));
      
      // Show success toast
      if (onShowToast) {
        onShowToast('Flow validated', 'success');
      }
      
      // Show suggestions if any exist
      if (suggestions.length > 0 && onShowSuggestions) {
        onShowSuggestions(suggestions);
      }
      
      // Call optional onSave callback
      if (onSave) {
        onSave(flowData);
      }
    }
  };

  return (
    <div className="save-button-container">
      <button className="save-button" onClick={handleSave} title="Validate flow structure">
        Validate Flow
      </button>
    </div>
  );
};

export default SaveButton;
