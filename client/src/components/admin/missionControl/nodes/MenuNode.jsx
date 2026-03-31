import React from 'react';
import { Handle, Position } from 'reactflow';
import { MenuBook, StarBorder, LocalDining } from '@material-ui/icons';
import './NodeStyles.css';

const MenuNode = ({ data }) => {
  return (
    <div
      className="restaurant-menu-node custom-node"
      onClick={() => data.onNodeClick && data.onNodeClick(data)}
      style={{ borderColor: '#10b981' }}
    >
      <Handle type="target" position={Position.Top} className="node-handle" />

      <div className="menu-node-header" style={{ background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)' }}>
        <MenuBook style={{ fontSize: 20, color: 'white' }} />
        <span style={{ color: 'white', fontWeight: 700, fontSize: 11, letterSpacing: '0.5px' }}>MENU MANAGEMENT</span>
      </div>

      <div className="menu-node-body" style={{ padding: 16, color: '#f3f4f6' }}>
        <h4 style={{ margin: '0 0 12px 0', fontSize: 15, fontWeight: 600, color: '#f3f4f6' }}>
          {data.label || 'Menu System'}
        </h4>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {/* Total Items */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '8px 12px',
            background: 'rgba(16, 185, 129, 0.1)',
            borderRadius: 8,
            border: '1px solid rgba(16, 185, 129, 0.3)'
          }}>
            <span style={{ fontSize: 12, color: '#9ca3af' }}>Total Items</span>
            <span style={{ fontSize: 16, fontWeight: 700, color: '#10b981' }}>
              {data.totalItems || 0}
            </span>
          </div>

          {/* Categories */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '8px 12px',
            background: 'rgba(59, 130, 246, 0.1)',
            borderRadius: 8,
            border: '1px solid rgba(59, 130, 246, 0.3)'
          }}>
            <span style={{ fontSize: 12, color: '#9ca3af' }}>Categories</span>
            <span style={{ fontSize: 14, fontWeight: 600, color: '#60a5fa' }}>
              {data.categories || 0}
            </span>
          </div>

          {/* Popular Items */}
          {data.popularCount > 0 && (
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: 8,
              padding: '6px 10px',
              background: 'rgba(245, 158, 11, 0.1)',
              borderRadius: 6,
              border: '1px solid rgba(245, 158, 11, 0.2)'
            }}>
              <StarBorder style={{ fontSize: 16, color: '#f59e0b' }} />
              <span style={{ fontSize: 11, color: '#d1d5db' }}>
                {data.popularCount} Popular Dishes
              </span>
            </div>
          )}

          {/* Available Status */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: 6,
            marginTop: 4
          }}>
            <LocalDining style={{ fontSize: 14, color: '#10b981' }} />
            <span style={{ fontSize: 11, color: '#9ca3af' }}>
              {data.availableItems || 0} Available Today
            </span>
          </div>
        </div>

        {/* Footer hint */}
        <div style={{
          marginTop: 12,
          paddingTop: 10,
          borderTop: '1px solid #374151',
          textAlign: 'center'
        }}>
          <span style={{ fontSize: 10, color: '#10b981', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.5px' }}>
            Click to Manage
          </span>
        </div>
      </div>

      <Handle type="source" position={Position.Bottom} className="node-handle" />
    </div>
  );
};

export default MenuNode;
