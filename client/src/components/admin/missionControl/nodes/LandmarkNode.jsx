import React from 'react';
import { Handle, Position } from 'reactflow';
import './NodeStyles.css';
import { Flag, Schedule, AttachMoney, CheckCircle } from '@material-ui/icons';

const LandmarkNode = ({ data }) => {
  const formatCurrency = (value, currency = 'XAF') => {
    if (!value) return 'N/A';

    // For XAF, format as "1,500,000 XAF" or "1.5M XAF"
    if (currency === 'XAF') {
      if (value >= 1000000) {
        return `${(value / 1000000).toFixed(2)}M XAF`;
      } else if (value >= 1000) {
        return `${(value / 1000).toFixed(0)}K XAF`;
      }
      return `${value.toLocaleString()} XAF`;
    }

    // For other currencies, use standard formatting
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currency || 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };

  // Calculate urgency and determine border color
  const getUrgencyStatus = () => {
    const now = new Date();
    const endDate = new Date(data.endDate);
    const startDate = new Date(data.startDate);
    const daysUntilDeadline = Math.ceil((endDate - now) / (1000 * 60 * 60 * 24));
    const totalDays = Math.ceil((endDate - startDate) / (1000 * 60 * 60 * 24));

    // If done, always green
    if (data.status === 'done') {
      return { color: '#10b981', label: 'DONE', urgency: 'low' };
    }

    // If overdue
    if (daysUntilDeadline < 0) {
      return { color: '#dc2626', label: 'OVERDUE', urgency: 'critical' };
    }

    // If within reminder period (default 7 days or custom)
    const reminderDays = data.reminderDays || 7;
    if (daysUntilDeadline <= reminderDays) {
      return { color: '#f59e0b', label: `${daysUntilDeadline}d left`, urgency: 'high' };
    }

    // If in progress
    if (data.status === 'processing') {
      return { color: '#3b82f6', label: 'IN PROGRESS', urgency: 'medium' };
    }

    // Not started, plenty of time
    return { color: '#6b7280', label: 'PENDING', urgency: 'low' };
  };

  const urgencyStatus = getUrgencyStatus();

  const getPriorityIcon = () => {
    if (data.priority === 'critical') return '🔥';
    if (data.priority === 'high') return '⚠️';
    return '';
  };

  const getDeadlineText = () => {
    const now = new Date();
    const endDate = new Date(data.endDate);
    const daysUntilDeadline = Math.ceil((endDate - now) / (1000 * 60 * 60 * 24));

    const dateStr = endDate.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: endDate.getFullYear() !== now.getFullYear() ? 'numeric' : undefined
    });

    if (daysUntilDeadline < 0) {
      return `overdue - ${dateStr}`;
    } else if (daysUntilDeadline === 0) {
      return `today - ${dateStr}`;
    } else if (daysUntilDeadline === 1) {
      return `tomorrow - ${dateStr}`;
    } else if (daysUntilDeadline <= 30) {
      return `in ${daysUntilDeadline} days - ${dateStr}`;
    } else if (daysUntilDeadline <= 60) {
      const weeks = Math.floor(daysUntilDeadline / 7);
      return `in ${weeks} week${weeks > 1 ? 's' : ''} - ${dateStr}`;
    } else {
      const months = Math.floor(daysUntilDeadline / 30);
      return `in ${months} month${months > 1 ? 's' : ''} - ${dateStr}`;
    }
  };

  return (
    <div
      className={`custom-node landmark-node ${data.focused ? 'node-focused' : ''}`}
      style={{
        borderColor: urgencyStatus.color,
        borderWidth: '3px',
        borderStyle: 'solid',
        boxShadow: data.focused
          ? `0 0 15px ${urgencyStatus.color}`
          : `0 2px 8px ${urgencyStatus.color}40`
      }}
    >
      <Handle
        type="target"
        position={Position.Top}
        className="node-handle landmark-handle"
      />

      <div className="landmark-node-content">
        {/* Header */}
        <div className="landmark-header" style={{ background: urgencyStatus.color }}>
          <div className="landmark-header-left">
            <Flag style={{ fontSize: 16, marginRight: 6 }} />
            <span className="landmark-title-small">{data.label}</span>
          </div>
          <div className="landmark-priority">{getPriorityIcon()}</div>
        </div>

        {/* Status Badge */}
        <div className="landmark-status-row">
          <div
            className="landmark-status-badge"
            style={{
              background: `${urgencyStatus.color}20`,
              color: urgencyStatus.color,
              border: `1px solid ${urgencyStatus.color}`
            }}
          >
            {urgencyStatus.label}
          </div>
          {data.paymentStatus === 'paid' && (
            <CheckCircle style={{ fontSize: 14, color: '#10b981', marginLeft: 4 }} />
          )}
        </div>

        {/* Progress Bar */}
        <div className="landmark-progress">
          <div className="progress-label">
            <span>{data.progress || 0}%</span>
          </div>
          <div className="progress-bar">
            <div
              className="progress-fill"
              style={{
                width: `${data.progress || 0}%`,
                background: data.status === 'done'
                  ? '#10b981'
                  : `linear-gradient(90deg, ${urgencyStatus.color}, ${urgencyStatus.color}dd)`,
              }}
            ></div>
          </div>
        </div>

        {/* Budget Info */}
        {data.amount && (
          <div className="landmark-budget">
            <AttachMoney style={{ fontSize: 14, opacity: 0.7 }} />
            <span className="budget-amount">{formatCurrency(data.amount, data.currency)}</span>
            {data.paymentStatus && (
              <span
                className="payment-status"
                style={{
                  color: data.paymentStatus === 'paid' ? '#10b981' : '#f59e0b'
                }}
              >
                {data.paymentStatus === 'paid' ? '✓ Paid' : '◯ Pending'}
              </span>
            )}
          </div>
        )}

        {/* Timeline */}
        <div className="landmark-timeline">
          <Schedule style={{ fontSize: 12, opacity: 0.6, marginRight: 4 }} />
          <span className="timeline-text">
            {getDeadlineText()}
          </span>
        </div>

        {/* Category Tag */}
        {data.category && (
          <div className="landmark-category">
            <span className="category-tag">{data.category}</span>
          </div>
        )}
      </div>

      <Handle
        type="source"
        position={Position.Bottom}
        className="node-handle landmark-handle"
      />
    </div>
  );
};

export default LandmarkNode;
