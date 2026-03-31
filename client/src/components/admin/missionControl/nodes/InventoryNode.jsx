import React from 'react';
import { Handle, Position } from 'reactflow';
import { Storage, Warning, CheckCircle } from '@material-ui/icons';
import './NodeStyles.css';

const InventoryNode = ({ data }) => {
  const getLowStockWarning = () => {
    if (data.lowStockCount > 0) {
      return (
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: 6,
          padding: '6px 10px',
          background: 'rgba(239, 68, 68, 0.15)',
          borderRadius: 6,
          border: '1px solid rgba(239, 68, 68, 0.3)',
          animation: 'pulse-warning 2s ease-in-out infinite'
        }}>
          <Warning style={{ fontSize: 16, color: '#ef4444' }} />
          <span style={{ fontSize: 11, color: '#fca5a5', fontWeight: 600 }}>
            {data.lowStockCount} Low Stock Alert{data.lowStockCount > 1 ? 's' : ''}
          </span>
        </div>
      );
    }
    return null;
  };

  return (
    <>
      <style>
        {`
          @keyframes pulse-warning {
            0%, 100% {
              opacity: 1;
            }
            50% {
              opacity: 0.7;
            }
          }
        `}
      </style>
      <div
        className="restaurant-inventory-node custom-node"
        onClick={() => data.onNodeClick && data.onNodeClick(data)}
        style={{ borderColor: '#3b82f6' }}
      >
        <Handle type="target" position={Position.Top} className="node-handle" />

        <div className="inventory-node-header" style={{ background: 'linear-gradient(135deg, #3b82f6 0%, #1e40af 100%)' }}>
          <Storage style={{ fontSize: 20, color: 'white' }} />
          <span style={{ color: 'white', fontWeight: 700, fontSize: 11, letterSpacing: '0.5px' }}>INVENTORY</span>
        </div>

        <div className="inventory-node-body" style={{ padding: 16, color: '#f3f4f6' }}>
          <h4 style={{ margin: '0 0 12px 0', fontSize: 15, fontWeight: 600, color: '#f3f4f6' }}>
            {data.label || 'Inventory Management'}
          </h4>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {/* Total Items */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '8px 12px',
              background: 'rgba(59, 130, 246, 0.1)',
              borderRadius: 8,
              border: '1px solid rgba(59, 130, 246, 0.3)'
            }}>
              <span style={{ fontSize: 12, color: '#9ca3af' }}>Total Items</span>
              <span style={{ fontSize: 16, fontWeight: 700, color: '#60a5fa' }}>
                {data.totalItems || 0}
              </span>
            </div>

            {/* Stock Status Grid */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
              <div style={{
                padding: '6px 8px',
                background: 'rgba(16, 185, 129, 0.1)',
                borderRadius: 6,
                border: '1px solid rgba(16, 185, 129, 0.2)',
                textAlign: 'center'
              }}>
                <div style={{ fontSize: 14, fontWeight: 700, color: '#10b981' }}>
                  {data.inStockCount || 0}
                </div>
                <div style={{ fontSize: 9, color: '#9ca3af', textTransform: 'uppercase', marginTop: 2 }}>
                  In Stock
                </div>
              </div>

              <div style={{
                padding: '6px 8px',
                background: 'rgba(239, 68, 68, 0.1)',
                borderRadius: 6,
                border: '1px solid rgba(239, 68, 68, 0.2)',
                textAlign: 'center'
              }}>
                <div style={{ fontSize: 14, fontWeight: 700, color: '#ef4444' }}>
                  {data.outOfStockCount || 0}
                </div>
                <div style={{ fontSize: 9, color: '#9ca3af', textTransform: 'uppercase', marginTop: 2 }}>
                  Out
                </div>
              </div>
            </div>

            {/* Low Stock Warning */}
            {getLowStockWarning()}

            {/* Last Restock Info */}
            {data.lastRestockDate && (
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: 6,
                padding: '4px 0',
                fontSize: 10,
                color: '#9ca3af'
              }}>
                <CheckCircle style={{ fontSize: 12 }} />
                <span>Last restock: {new Date(data.lastRestockDate).toLocaleDateString()}</span>
              </div>
            )}
          </div>

          {/* Footer hint */}
          <div style={{
            marginTop: 12,
            paddingTop: 10,
            borderTop: '1px solid #374151',
            textAlign: 'center'
          }}>
            <span style={{ fontSize: 10, color: '#3b82f6', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.5px' }}>
              Click to Manage Stock
            </span>
          </div>
        </div>

        <Handle type="source" position={Position.Bottom} className="node-handle" />
      </div>
    </>
  );
};

export default InventoryNode;
