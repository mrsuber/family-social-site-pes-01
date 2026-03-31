import React from 'react';
import { Handle, Position } from 'reactflow';
import { Receipt, Schedule, AttachMoney, TrendingUp } from '@material-ui/icons';
import './NodeStyles.css';

const OrdersPOSNode = ({ data }) => {
  const getStatusColor = (status) => {
    switch (status) {
      case 'high': return '#10b981';
      case 'medium': return '#f59e0b';
      case 'low': return '#ef4444';
      default: return '#6b7280';
    }
  };

  return (
    <div
      className="restaurant-orders-node custom-node"
      onClick={() => data.onNodeClick && data.onNodeClick(data)}
      style={{ borderColor: '#f59e0b' }}
    >
      <Handle type="target" position={Position.Top} className="node-handle" />

      <div className="orders-node-header" style={{ background: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)' }}>
        <Receipt style={{ fontSize: 20, color: 'white' }} />
        <span style={{ color: 'white', fontWeight: 700, fontSize: 11, letterSpacing: '0.5px' }}>ORDERS & POS</span>
      </div>

      <div className="orders-node-body" style={{ padding: 16, color: '#f3f4f6' }}>
        <h4 style={{ margin: '0 0 12px 0', fontSize: 15, fontWeight: 600, color: '#f3f4f6' }}>
          {data.label || 'Order Management'}
        </h4>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {/* Active Orders */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '10px 12px',
            background: 'rgba(245, 158, 11, 0.15)',
            borderRadius: 8,
            border: '1px solid rgba(245, 158, 11, 0.4)'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <Schedule style={{ fontSize: 18, color: '#f59e0b' }} />
              <span style={{ fontSize: 12, color: '#d1d5db' }}>Active Orders</span>
            </div>
            <span style={{ fontSize: 18, fontWeight: 700, color: '#fbbf24' }}>
              {data.activeOrders || 0}
            </span>
          </div>

          {/* Daily Sales */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '10px 12px',
            background: 'rgba(16, 185, 129, 0.1)',
            borderRadius: 8,
            border: '1px solid rgba(16, 185, 129, 0.3)'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <AttachMoney style={{ fontSize: 18, color: '#10b981' }} />
              <span style={{ fontSize: 12, color: '#d1d5db' }}>Today's Sales</span>
            </div>
            <span style={{ fontSize: 16, fontWeight: 700, color: '#10b981' }}>
              {data.currency || 'XAF'} {data.todaySales?.toLocaleString() || '0'}
            </span>
          </div>

          {/* Order Stats Grid */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 6, marginTop: 4 }}>
            <div style={{
              padding: '8px 4px',
              background: 'rgba(59, 130, 246, 0.1)',
              borderRadius: 6,
              textAlign: 'center'
            }}>
              <div style={{ fontSize: 14, fontWeight: 700, color: '#60a5fa' }}>
                {data.preparingCount || 0}
              </div>
              <div style={{ fontSize: 8, color: '#9ca3af', textTransform: 'uppercase', marginTop: 2 }}>
                Preparing
              </div>
            </div>

            <div style={{
              padding: '8px 4px',
              background: 'rgba(245, 158, 11, 0.1)',
              borderRadius: 6,
              textAlign: 'center'
            }}>
              <div style={{ fontSize: 14, fontWeight: 700, color: '#fbbf24' }}>
                {data.readyCount || 0}
              </div>
              <div style={{ fontSize: 8, color: '#9ca3af', textTransform: 'uppercase', marginTop: 2 }}>
                Ready
              </div>
            </div>

            <div style={{
              padding: '8px 4px',
              background: 'rgba(16, 185, 129, 0.1)',
              borderRadius: 6,
              textAlign: 'center'
            }}>
              <div style={{ fontSize: 14, fontWeight: 700, color: '#10b981' }}>
                {data.completedToday || 0}
              </div>
              <div style={{ fontSize: 8, color: '#9ca3af', textTransform: 'uppercase', marginTop: 2 }}>
                Completed
              </div>
            </div>
          </div>

          {/* Performance Indicator */}
          {data.performanceStatus && (
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: 6,
              padding: '6px 10px',
              background: `rgba(${data.performanceStatus === 'high' ? '16, 185, 129' : data.performanceStatus === 'medium' ? '245, 158, 11' : '239, 68, 68'}, 0.1)`,
              borderRadius: 6,
              border: `1px solid rgba(${data.performanceStatus === 'high' ? '16, 185, 129' : data.performanceStatus === 'medium' ? '245, 158, 11' : '239, 68, 68'}, 0.3)`
            }}>
              <TrendingUp style={{ fontSize: 14, color: getStatusColor(data.performanceStatus) }} />
              <span style={{ fontSize: 10, color: '#9ca3af' }}>
                {data.performanceStatus === 'high' ? 'High Volume' : data.performanceStatus === 'medium' ? 'Moderate' : 'Slow'}
              </span>
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
          <span style={{ fontSize: 10, color: '#f59e0b', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.5px' }}>
            Click to View Orders
          </span>
        </div>
      </div>

      <Handle type="source" position={Position.Bottom} className="node-handle" />
    </div>
  );
};

export default OrdersPOSNode;
