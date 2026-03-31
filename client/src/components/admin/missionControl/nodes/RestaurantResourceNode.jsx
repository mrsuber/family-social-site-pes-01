import React from 'react';
import { Handle, Position } from 'reactflow';
import { Restaurant, MenuBook, Storage, LocalShipping } from '@material-ui/icons';
import './NodeStyles.css';

const RestaurantResourceNode = ({ data }) => {
  const getIcon = () => {
    switch (data.resourceType) {
      case 'restaurant':
        return <Restaurant style={{ fontSize: 20 }} />;
      case 'menu':
        return <MenuBook style={{ fontSize: 18 }} />;
      case 'inventory':
        return <Storage style={{ fontSize: 18 }} />;
      case 'supplier':
        return <LocalShipping style={{ fontSize: 18 }} />;
      default:
        return <Restaurant style={{ fontSize: 18 }} />;
    }
  };

  const getColor = () => {
    switch (data.resourceType) {
      case 'restaurant':
        return '#f59e0b';
      case 'menu':
        return '#10b981';
      case 'inventory':
        return '#3b82f6';
      case 'supplier':
        return '#8b5cf6';
      default:
        return '#6b7280';
    }
  };

  return (
    <div className="restaurant-resource-node" style={{ borderColor: getColor() }}>
      <Handle type="target" position={Position.Top} />

      <div className="node-header" style={{ backgroundColor: getColor() }}>
        {getIcon()}
        <span className="node-type">{data.resourceType}</span>
      </div>

      <div className="node-content">
        <div className="node-title">{data.label}</div>
        {data.count && (
          <div className="node-stats">
            <span className="stat-badge">{data.count} items</span>
          </div>
        )}
        {data.status && (
          <div className="node-status">
            <span className={`status-badge status-${data.status}`}>{data.status}</span>
          </div>
        )}
      </div>

      <Handle type="source" position={Position.Bottom} />
    </div>
  );
};

export default RestaurantResourceNode;
