import React from 'react';
import { Handle, Position } from 'reactflow';
import './NodeStyles.css';
import { TrendingDown, Warning } from '@material-ui/icons';

const ExpenseNode = ({ data }) => {
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
  const isEssential = data.isEssential !== false;

  return (
    <div
      className={`custom-node expense-node ${isActive ? 'expense-active' : 'expense-inactive'}`}
      style={{
        background: isActive ? '#fee2e2' : '#f3f4f6',
        borderLeft: `4px solid ${isActive ? (isEssential ? '#dc2626' : '#f59e0b') : '#9ca3af'}`,
        boxShadow: isActive && isEssential ? '0 4px 12px rgba(220, 38, 38, 0.3)' : '0 2px 8px rgba(0,0,0,0.1)'
      }}
    >
      <Handle type="target" position={Position.Top} className="node-handle" />

      <div className="expense-header">
        <div className="expense-icon">
          <TrendingDown style={{ color: isActive ? '#dc2626' : '#9ca3af', fontSize: 18 }} />
        </div>
        <div className="expense-type">
          {data.category?.toUpperCase() || 'EXPENSE'}
          {isEssential && isActive && (
            <Warning style={{ color: '#dc2626', fontSize: 14, marginLeft: 4 }} />
          )}
        </div>
      </div>

      <div className="expense-content">
        <h4 className="expense-name">{data.label}</h4>
        <div className="expense-amount" style={{ color: isActive ? '#991b1b' : '#6b7280' }}>
          {formatCurrency(data.monthlyEquivalent || data.amount, data.currency)}
          <span className="expense-frequency">/month</span>
        </div>
        {data.provider && (
          <div className="expense-provider">Provider: {data.provider}</div>
        )}
        {data.frequency && data.frequency !== 'monthly' && (
          <div className="expense-note">
            Billed {data.frequency} ({formatCurrency(data.amount, data.currency)})
          </div>
        )}
      </div>

      <Handle type="source" position={Position.Bottom} className="node-handle" />
    </div>
  );
};

export default ExpenseNode;
