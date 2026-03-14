import React from 'react';
import { Handle, Position } from 'reactflow';
import './NodeStyles.css';
import { Business, Group, CheckCircle, Error } from '@material-ui/icons';

const DepartmentNode = ({ data }) => {
  const getStatusIcon = () => {
    switch (data.status) {
      case 'active':
        return <CheckCircle style={{ fontSize: 12, color: '#10b981' }} />;
      case 'restructuring':
        return <Error style={{ fontSize: 12, color: '#f59e0b' }} />;
      default:
        return <Business style={{ fontSize: 12 }} />;
    }
  };

  const getStatusColor = () => {
    switch (data.status) {
      case 'active':
        return '#10b981';
      case 'inactive':
        return '#6b7280';
      case 'restructuring':
        return '#f59e0b';
      default:
        return '#3b82f6';
    }
  };

  return (
    <div className={`custom-node department-node ${data.focused ? 'node-focused' : ''}`}
         style={{ borderColor: getStatusColor() }}>
      <Handle
        type="target"
        position={Position.Top}
        className="node-handle department-handle"
        style={{ background: getStatusColor() }}
      />
      <div className="department-node-content">
        <div className="department-header">
          <Business style={{ fontSize: 18, color: getStatusColor() }} />
          <h4 className="department-name">{data.label}</h4>
        </div>

        <div className="department-info">
          {data.description && (
            <p className="department-description">{data.description}</p>
          )}

          <div className="department-meta">
            <div className="department-stat">
              <Group style={{ fontSize: 14 }} />
              <span>{data.peopleCount || 0} people</span>
            </div>
            <div className="department-status">
              {getStatusIcon()}
              <span>{data.status || 'active'}</span>
            </div>
          </div>

          {data.objectives && data.objectives.length > 0 && (
            <div className="department-objectives">
              <span className="objectives-count">
                {data.objectives.length} objectives
              </span>
            </div>
          )}
        </div>
      </div>
      <Handle
        type="source"
        position={Position.Bottom}
        className="node-handle department-handle"
        style={{ background: getStatusColor() }}
      />
    </div>
  );
};

export default DepartmentNode;
