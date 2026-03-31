import React from 'react';
import { Handle, Position } from 'reactflow';
import './NodeStyles.css';
import { Business, CheckCircle, HourglassEmpty } from '@material-ui/icons';

const GeneralNode = ({ data }) => {
  const getStatusIcon = () => {
    switch (data.status) {
      case 'operational':
        return <CheckCircle style={{ color: '#10b981', fontSize: 16 }} />;
      case 'planning':
        return <HourglassEmpty style={{ color: '#f59e0b', fontSize: 16 }} />;
      default:
        return null;
    }
  };

  // Parse objectives if it's a JSON string
  const parseObjectives = () => {
    if (!data.objectives) return [];

    // If it's already an array, return it
    if (Array.isArray(data.objectives)) {
      return data.objectives;
    }

    // If it's a string, try to parse it
    if (typeof data.objectives === 'string') {
      try {
        const parsed = JSON.parse(data.objectives);
        return Array.isArray(parsed) ? parsed : [];
      } catch (e) {
        console.error('Failed to parse objectives:', e);
        return [];
      }
    }

    return [];
  };

  const objectives = parseObjectives();

  return (
    <div className={`custom-node general-node status-${data.status} ${data.focused ? 'node-focused' : ''}`}>
      <Handle
        type="target"
        position={Position.Top}
        className="node-handle"
      />
      <div className="node-header general-header">
        <Business className="node-icon" />
        <span className="node-badge">GENERAL {data.orderNumber}</span>
      </div>
      <div className="node-body">
        <div className="general-header-row">
          <h3 className="node-name">{data.label}</h3>
          {getStatusIcon()}
        </div>
        <p className="node-description">{data.description}</p>

        {objectives.length > 0 && (
          <div className="objectives-section">
            <span className="objectives-label">Objectives ({objectives.length})</span>
            <ul className="objectives-list">
              {objectives.slice(0, 2).map((objective, index) => (
                <li key={index}>{objective}</li>
              ))}
              {objectives.length > 2 && (
                <li className="more-objectives">+{objectives.length - 2} more...</li>
              )}
            </ul>
          </div>
        )}
      </div>
      <Handle
        type="source"
        position={Position.Bottom}
        className="node-handle"
      />
    </div>
  );
};

export default GeneralNode;
