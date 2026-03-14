import React from 'react';
import { Handle, Position } from 'reactflow';
import './NodeStyles.css';
import { Star } from '@material-ui/icons';

const CommanderNode = ({ data }) => {
  return (
    <div className="custom-node commander-node">
      <div className="node-header commander-header">
        <Star className="node-icon" />
        <span className="node-badge">HIGH COMMANDER</span>
      </div>
      <div className="node-body">
        <div className="node-avatar-large">
          {data.photo ? (
            <img src={data.photo} alt={data.label} />
          ) : (
            <div className="avatar-placeholder">{data.label?.charAt(0)}</div>
          )}
        </div>
        <h3 className="node-name">{data.label}</h3>
        <p className="node-title">{data.title}</p>

        <div className="commander-stats">
          <div className="stat-item">
            <span className="stat-value">{data.stats?.generals || 0}</span>
            <span className="stat-label">Generals</span>
          </div>
          <div className="stat-item">
            <span className="stat-value">{data.stats?.people || 0}</span>
            <span className="stat-label">People</span>
          </div>
          <div className="stat-item">
            <span className="stat-value">{data.stats?.projects || 0}</span>
            <span className="stat-label">Projects</span>
          </div>
        </div>
      </div>
      <Handle
        type="source"
        position={Position.Bottom}
        className="node-handle commander-handle"
      />
    </div>
  );
};

export default CommanderNode;
