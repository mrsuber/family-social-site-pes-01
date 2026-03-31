import React from 'react';
import { Handle, Position } from 'reactflow';
import './NodeStyles.css';
import { AttachMoney, TrendingUp, AccountBalance } from '@material-ui/icons';

const InvestorNode = ({ data }) => {
  const formatCurrency = (amount, currency = 'XAF') => {
    if (!amount) return '0';
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currency,
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  };

  return (
    <div className={`custom-node investor-node ${data.focused ? 'node-focused' : ''}`}>
      <Handle
        type="target"
        position={Position.Top}
        className="node-handle investor-handle"
      />
      <div className="investor-badge">
        <AttachMoney style={{ fontSize: 12 }} />
        <span>INVESTOR</span>
      </div>
      <div className="investor-node-content">
        <div className="investor-avatar">
          {data.photo ? (
            <img src={data.photo} alt={data.label} />
          ) : (
            <div className="avatar-placeholder-investor">
              <AccountBalance style={{ fontSize: 24, color: '#d97706' }} />
            </div>
          )}
        </div>
        <div className="investor-info">
          <h4 className="investor-name">{data.label}</h4>
          <div className="investment-amount">
            <TrendingUp style={{ fontSize: 14, color: '#10b981' }} />
            <span className="amount-value">
              {formatCurrency(data.investmentAmount, data.currency || 'XAF')}
            </span>
          </div>
          {data.investmentDate && (
            <p className="investment-date">
              Since {new Date(data.investmentDate).toLocaleDateString('en-US', {
                month: 'short',
                year: 'numeric'
              })}
            </p>
          )}
          {data.equityPercentage && (
            <div className="equity-bar">
              <div className="equity-label">{data.equityPercentage}% equity</div>
              <div className="equity-fill-container">
                <div
                  className="equity-fill"
                  style={{ width: `${Math.min(data.equityPercentage, 100)}%` }}
                ></div>
              </div>
            </div>
          )}
        </div>
      </div>
      <Handle
        type="source"
        position={Position.Bottom}
        className="node-handle investor-handle"
      />
    </div>
  );
};

export default InvestorNode;
