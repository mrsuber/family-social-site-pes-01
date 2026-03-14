import React from 'react';
import { Handle, Position } from 'reactflow';
import './NodeStyles.css';
import { PersonAdd, Favorite, Business as BusinessIcon, AccountCircle, HelpOutline } from '@material-ui/icons';

const PersonalCircleNode = ({ data }) => {
  const getRelationshipIcon = () => {
    switch (data.relationshipType) {
      case 'girlfriend_candidate':
        return <Favorite style={{ fontSize: 14, color: '#ec4899' }} />;
      case 'business_contact':
        return <BusinessIcon style={{ fontSize: 14 }} />;
      case 'friend':
      case 'family':
        return <AccountCircle style={{ fontSize: 14 }} />;
      default:
        return <HelpOutline style={{ fontSize: 14 }} />;
    }
  };

  const getRelationshipLabel = () => {
    switch (data.relationshipType) {
      case 'girlfriend_candidate':
        return 'Candidate';
      case 'business_contact':
        return 'Business';
      case 'friend':
        return 'Friend';
      case 'family':
        return 'Family';
      default:
        return 'Evaluating';
    }
  };

  const getStatusText = () => {
    if (data.fullData?.assignmentStatus === 'evaluating') {
      return '🔍 Evaluating';
    }
    return '👤 Personal Circle';
  };

  return (
    <div className={`custom-node personal-circle-node ${data.focused ? 'node-focused' : ''}`}>
      <Handle
        type="target"
        position={Position.Top}
        className="node-handle personal-circle-handle"
      />
      <div className="personal-circle-node-content">
        <div className="personal-circle-avatar">
          {data.photo ? (
            <img src={data.photo} alt={data.label} />
          ) : (
            <div className="avatar-placeholder-personal">{data.label?.charAt(0)}</div>
          )}
          <div className="personal-circle-indicator">
            <PersonAdd style={{ fontSize: 12 }} />
          </div>
        </div>
        <div className="personal-circle-info">
          <h4 className="personal-circle-name">{data.label}</h4>
          <p className="personal-circle-title">{data.title || 'No role assigned'}</p>
          <div className="personal-circle-meta">
            {getRelationshipIcon()}
            <span>{getRelationshipLabel()}</span>
          </div>
          <div className="personal-circle-status">
            {getStatusText()}
          </div>
        </div>
      </div>
      <Handle
        type="source"
        position={Position.Bottom}
        className="node-handle personal-circle-handle"
      />
    </div>
  );
};

export default PersonalCircleNode;
