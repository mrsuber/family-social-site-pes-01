import React from 'react';
import { Handle, Position } from 'reactflow';
import './NodeStyles.css';
import { TrendingUp, AttachMoney } from '@material-ui/icons';

const RevenueNode = ({ data }) => {
  const formatCurrency = (value, currency = 'XAF') => {
    if (!value) return 'N/A';
    if (currency === 'XAF') {
      if (value >= 1000000) return `${(value / 1000000).toFixed(2)}M XAF`;
      if (value >= 1000) return `${(value / 1000).toFixed(0)}K XAF`;
      return `${value.toLocaleString()} XAF`;
    }
    return `${value.toLocaleString()} ${currency}`;
  };

  const isActive = data.status === 'active';
  const isCompleted = data.status === 'completed';

  return (
    <div
      className={`custom-node revenue-node ${isActive ? 'revenue-active' : isCompleted ? 'revenue-completed' : 'revenue-inactive'}`}
      style={{
        background: isActive ? '#d1fae5' : isCompleted ? '#e5e7eb' : '#fef3c7',
        borderLeft: `4px solid ${isActive ? '#10b981' : isCompleted ? '#9ca3af' : '#f59e0b'}`,
        boxShadow: isActive ? '0 4px 12px rgba(16, 185, 129, 0.3)' : '0 2px 8px rgba(0,0,0,0.1)'
      }}
    >
      <Handle type="target" position={Position.Top} className="node-handle" />

      <div className="revenue-header">
        <div className="revenue-icon">
          {isActive ? <TrendingUp style={{ color: '#10b981', fontSize: 18 }} /> : <AttachMoney style={{ fontSize: 18 }} />}
        </div>
        <div className="revenue-type">
          {data.incomeType?.toUpperCase() || 'INCOME'}
        </div>
      </div>

      <div className="revenue-content">
        <h4 className="revenue-name" style={{ textDecoration: isCompleted ? 'line-through' : 'none' }}>
          {data.label}
        </h4>
        <div className="revenue-amount" style={{ color: isActive ? '#047857' : '#6b7280' }}>
          {formatCurrency(data.amount, data.currency)}
          {data.frequency && data.frequency !== 'one-time' && (
            <span className="revenue-frequency">/{data.frequency}</span>
          )}
        </div>
        {data.clientName && (
          <div className="revenue-client">Client: {data.clientName}</div>
        )}
        {isCompleted && (
          <div className="revenue-status-badge">COMPLETED</div>
        )}
      </div>

      <Handle type="source" position={Position.Bottom} className="node-handle" />
    </div>
  );
};

export default RevenueNode;
