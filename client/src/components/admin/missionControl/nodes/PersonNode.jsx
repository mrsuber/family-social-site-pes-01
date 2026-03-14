import React from 'react';
import { Handle, Position } from 'reactflow';
import './NodeStyles.css';
import { Person, Favorite, Business as BusinessIcon, AccountCircle } from '@material-ui/icons';

const PersonNode = ({ data }) => {
  const getRelationshipIcon = () => {
    switch (data.relationshipType) {
      case 'employee':
        return <Person style={{ fontSize: 14 }} />;
      case 'girlfriend_candidate':
        return <Favorite style={{ fontSize: 14, color: '#ec4899' }} />;
      case 'business_contact':
        return <BusinessIcon style={{ fontSize: 14 }} />;
      default:
        return <AccountCircle style={{ fontSize: 14 }} />;
    }
  };

  const getRelationshipLabel = () => {
    switch (data.relationshipType) {
      case 'employee':
        return 'Employee';
      case 'girlfriend_candidate':
        return 'Candidate';
      case 'business_contact':
        return 'Business';
      case 'current_candidate':
        return 'Current';
      default:
        return 'Person';
    }
  };

  return (
    <div className={`custom-node person-node ${data.focused ? 'node-focused' : ''}`}>
      <Handle
        type="target"
        position={Position.Top}
        className="node-handle person-handle"
      />
      <div className="person-node-content">
        <div className="person-avatar">
          {data.photo ? (
            <img src={data.photo} alt={data.label} />
          ) : (
            <div className="avatar-placeholder-small">{data.label?.charAt(0)}</div>
          )}
        </div>
        <div className="person-info">
          <h4 className="person-name">{data.label}</h4>
          <p className="person-title">{data.title || 'No title'}</p>
          <div className="person-meta">
            {getRelationshipIcon()}
            <span>{getRelationshipLabel()}</span>
          </div>
          {data.performanceRating && data.performanceRating > 0 && (
            <div className="performance-bar">
              <div
                className="performance-fill"
                style={{
                  width: `${data.performanceRating}%`,
                  background: data.performanceRating >= 80
                    ? '#10b981'
                    : data.performanceRating >= 60
                    ? '#f59e0b'
                    : '#ef4444',
                }}
              ></div>
            </div>
          )}
        </div>
      </div>
      <Handle
        type="source"
        position={Position.Bottom}
        className="node-handle person-handle"
      />
    </div>
  );
};

export default PersonNode;
