import React from 'react';
import { Handle, Position } from 'reactflow';
import './NodeStyles.css';
import { AttachMoney, Computer, LocalAtm, Build, Assessment } from '@material-ui/icons';

const AssetNode = ({ data }) => {
  const getAssetIcon = () => {
    switch (data.assetType) {
      case 'technology':
        return <Computer style={{ fontSize: 16 }} />;
      case 'financial':
        return <LocalAtm style={{ fontSize: 16 }} />;
      case 'equipment':
        return <Build style={{ fontSize: 16 }} />;
      case 'research':
        return <Assessment style={{ fontSize: 16 }} />;
      default:
        return <AttachMoney style={{ fontSize: 16 }} />;
    }
  };

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

  const isTarget = data.acquisitionStatus === 'target';

  return (
    <div className={`custom-node asset-node ${isTarget ? 'asset-target' : 'asset-acquired'} ${data.focused ? 'node-focused' : ''}`}>
      <Handle
        type="target"
        position={Position.Top}
        className="node-handle asset-handle"
      />
      <div className="asset-node-content">
        <div className="asset-icon-wrapper">
          {getAssetIcon()}
        </div>
        <div className="asset-info">
          <h4 className="asset-name">{data.label}</h4>
          <div className="asset-value">{formatCurrency(data.value, data.currency || 'XAF')}</div>
          {isTarget && <div className="asset-target-badge">TARGET</div>}
          <div className="asset-condition">
            <span>Condition:</span>
            <div className="condition-bar">
              <div
                className="condition-fill"
                style={{
                  width: `${data.condition}%`,
                  background: data.condition >= 90
                    ? '#10b981'
                    : data.condition >= 70
                    ? '#f59e0b'
                    : '#ef4444',
                }}
              ></div>
            </div>
            <span className="condition-value">{data.condition}%</span>
          </div>
        </div>
      </div>
      <Handle
        type="source"
        position={Position.Bottom}
        className="node-handle asset-handle"
      />
    </div>
  );
};

export default AssetNode;
