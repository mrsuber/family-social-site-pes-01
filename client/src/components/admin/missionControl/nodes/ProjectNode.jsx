import React from 'react';
import { Handle, Position } from 'reactflow';
import './NodeStyles.css';
import { Assignment, PlayArrow, Pause, CheckCircle } from '@material-ui/icons';

const ProjectNode = ({ data }) => {
  const getStatusIcon = () => {
    switch (data.status) {
      case 'active':
        return <PlayArrow style={{ color: '#10b981', fontSize: 14 }} />;
      case 'paused':
        return <Pause style={{ color: '#f59e0b', fontSize: 14 }} />;
      case 'completed':
        return <CheckCircle style={{ color: '#3b82f6', fontSize: 14 }} />;
      default:
        return null;
    }
  };

  return (
    <div className={`custom-node project-node status-${data.status}`}>
      <Handle
        type="target"
        position={Position.Top}
        className="node-handle"
      />
      <div className="node-header project-header">
        <Assignment className="node-icon" />
        <span className="node-badge">PROJECT</span>
      </div>
      <div className="node-body">
        <div className="project-header-row">
          <h4 className="project-name">{data.label}</h4>
          {getStatusIcon()}
        </div>
        {data.description && (
          <p className="project-description">{data.description}</p>
        )}
        <div className="project-meta">
          {data.teamSize && (
            <span className="meta-item">Team: {data.teamSize}</span>
          )}
          {data.priority && (
            <span className={`priority-badge priority-${data.priority}`}>
              {data.priority}
            </span>
          )}
        </div>
      </div>
      <Handle
        type="source"
        position={Position.Bottom}
        className="node-handle"
      />
    </div>
  );
};

export default ProjectNode;
