import React from 'react';
import { Handle, Position } from 'reactflow';
import './NodeStyles.css';

const LifeOpsCardNode = ({ data }) => {
  const getCardColor = () => {
    switch (data.cardType) {
      case 'financial':
        return '#10b981'; // green
      case 'network':
        return '#3b82f6'; // blue
      case 'daily':
        return '#f59e0b'; // orange
      case 'calendar':
        return '#8b5cf6'; // purple
      case 'diary':
        return '#ec4899'; // pink
      default:
        return '#6b7280'; // gray
    }
  };

  const renderStats = () => {
    switch (data.cardType) {
      case 'financial':
        return (
          <div className="life-ops-stats">
            <div className="life-ops-stat">
              <span className="life-ops-stat-label">Income</span>
              <span className="life-ops-stat-value">${data.stats.totalIncome?.toLocaleString() || 0}</span>
            </div>
            <div className="life-ops-stat">
              <span className="life-ops-stat-label">Expenses</span>
              <span className="life-ops-stat-value">${data.stats.totalExpenses?.toLocaleString() || 0}</span>
            </div>
            <div className="life-ops-stat">
              <span className="life-ops-stat-label">Runway</span>
              <span className="life-ops-stat-value">{data.stats.runway || 0} mo</span>
            </div>
          </div>
        );
      case 'network':
        return (
          <div className="life-ops-stats">
            <div className="life-ops-stat">
              <span className="life-ops-stat-label">Total</span>
              <span className="life-ops-stat-value">{data.stats.total}</span>
            </div>
            <div className="life-ops-stat">
              <span className="life-ops-stat-label">Active</span>
              <span className="life-ops-stat-value">{data.stats.active}</span>
            </div>
            <div className="life-ops-stat">
              <span className="life-ops-stat-label">Upcoming</span>
              <span className="life-ops-stat-value">{data.stats.upcoming}</span>
            </div>
          </div>
        );
      case 'daily':
        return (
          <div className="life-ops-stats">
            <div className="life-ops-stat">
              <span className="life-ops-stat-label">Total Logs</span>
              <span className="life-ops-stat-value">{data.stats.totalLogs}</span>
            </div>
            <div className="life-ops-stat">
              <span className="life-ops-stat-label">This Week</span>
              <span className="life-ops-stat-value">{data.stats.recentLogs}</span>
            </div>
          </div>
        );
      case 'calendar':
        return (
          <div className="life-ops-stats">
            <div className="life-ops-stat">
              <span className="life-ops-stat-label">Total</span>
              <span className="life-ops-stat-value">{data.stats.totalEvents}</span>
            </div>
            <div className="life-ops-stat">
              <span className="life-ops-stat-label">Upcoming</span>
              <span className="life-ops-stat-value">{data.stats.upcoming}</span>
            </div>
            <div className="life-ops-stat">
              <span className="life-ops-stat-label">Today</span>
              <span className="life-ops-stat-value">{data.stats.today}</span>
            </div>
          </div>
        );
      case 'diary':
        return (
          <div className="life-ops-stats">
            <div className="life-ops-stat">
              <span className="life-ops-stat-label">Total</span>
              <span className="life-ops-stat-value">{data.stats.totalEntries}</span>
            </div>
            <div className="life-ops-stat">
              <span className="life-ops-stat-label">This Week</span>
              <span className="life-ops-stat-value">{data.stats.thisWeek}</span>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div
      className="custom-node life-ops-card-node"
      style={{
        borderColor: getCardColor(),
        boxShadow: `0 0 20px ${getCardColor()}40`
      }}
    >
      <Handle
        type="target"
        position={Position.Top}
        className="node-handle"
        style={{ background: getCardColor() }}
      />

      <div className="life-ops-card-header">
        <span className="life-ops-icon">{data.icon}</span>
        <h4 className="life-ops-title">{data.label}</h4>
      </div>

      <div className="life-ops-card-body">
        {renderStats()}
      </div>

      <div className="life-ops-card-footer">
        <span className="life-ops-hint">Click to view details →</span>
      </div>

      <Handle
        type="source"
        position={Position.Bottom}
        className="node-handle"
        style={{ background: getCardColor() }}
      />
    </div>
  );
};

export default LifeOpsCardNode;
