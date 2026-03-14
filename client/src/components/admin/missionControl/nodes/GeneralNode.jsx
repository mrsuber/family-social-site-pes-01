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

        {data.objectives && data.objectives.length > 0 && (
          <div className="objectives-section">
            <span className="objectives-label">Objectives ({data.objectives.length})</span>
            <ul className="objectives-list">
              {data.objectives.slice(0, 2).map((objective, index) => (
                <li key={index}>{objective}</li>
              ))}
              {data.objectives.length > 2 && (
                <li className="more-objectives">+{data.objectives.length - 2} more...</li>
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
