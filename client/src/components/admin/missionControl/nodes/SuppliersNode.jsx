import React from 'react';
import { Handle, Position } from 'reactflow';
import { LocalShipping, Star, Phone, CheckCircle } from '@material-ui/icons';
import './NodeStyles.css';

const SuppliersNode = ({ data }) => {
  const getAverageRating = () => {
    if (data.averageRating) {
      return (
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: 4,
          padding: '6px 10px',
          background: 'rgba(245, 158, 11, 0.1)',
          borderRadius: 6,
          border: '1px solid rgba(245, 158, 11, 0.3)'
        }}>
          <Star style={{ fontSize: 14, color: '#fbbf24' }} />
          <span style={{ fontSize: 12, fontWeight: 600, color: '#fbbf24' }}>
            {data.averageRating.toFixed(1)}
          </span>
          <span style={{ fontSize: 10, color: '#9ca3af' }}>avg rating</span>
        </div>
      );
    }
    return null;
  };

  return (
    <div
      className="restaurant-suppliers-node custom-node"
      onClick={() => data.onNodeClick && data.onNodeClick(data)}
      style={{ borderColor: '#8b5cf6' }}
    >
      <Handle type="target" position={Position.Top} className="node-handle" />

      <div className="suppliers-node-header" style={{ background: 'linear-gradient(135deg, #8b5cf6 0%, #6d28d9 100%)' }}>
        <LocalShipping style={{ fontSize: 20, color: 'white' }} />
        <span style={{ color: 'white', fontWeight: 700, fontSize: 11, letterSpacing: '0.5px' }}>SUPPLIERS</span>
      </div>

      <div className="suppliers-node-body" style={{ padding: 16, color: '#f3f4f6' }}>
        <h4 style={{ margin: '0 0 12px 0', fontSize: 15, fontWeight: 600, color: '#f3f4f6' }}>
          {data.label || 'Supplier Network'}
        </h4>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {/* Total Suppliers */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '8px 12px',
            background: 'rgba(139, 92, 246, 0.1)',
            borderRadius: 8,
            border: '1px solid rgba(139, 92, 246, 0.3)'
          }}>
            <span style={{ fontSize: 12, color: '#9ca3af' }}>Total Suppliers</span>
            <span style={{ fontSize: 16, fontWeight: 700, color: '#a78bfa' }}>
              {data.totalSuppliers || 0}
            </span>
          </div>

          {/* Active vs Inactive */}
          <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: 8 }}>
            <div style={{
              padding: '8px 10px',
              background: 'rgba(16, 185, 129, 0.1)',
              borderRadius: 6,
              border: '1px solid rgba(16, 185, 129, 0.2)',
              display: 'flex',
              alignItems: 'center',
              gap: 6
            }}>
              <CheckCircle style={{ fontSize: 16, color: '#10b981' }} />
              <div>
                <div style={{ fontSize: 14, fontWeight: 700, color: '#10b981' }}>
                  {data.activeSuppliers || 0}
                </div>
                <div style={{ fontSize: 9, color: '#9ca3af', textTransform: 'uppercase' }}>
                  Active
                </div>
              </div>
            </div>

            <div style={{
              padding: '8px 10px',
              background: 'rgba(107, 114, 128, 0.1)',
              borderRadius: 6,
              border: '1px solid rgba(107, 114, 128, 0.2)',
              textAlign: 'center'
            }}>
              <div style={{ fontSize: 14, fontWeight: 700, color: '#9ca3af' }}>
                {data.inactiveSuppliers || 0}
              </div>
              <div style={{ fontSize: 9, color: '#6b7280', textTransform: 'uppercase', marginTop: 2 }}>
                Inactive
              </div>
            </div>
          </div>

          {/* Average Rating */}
          {getAverageRating()}

          {/* Next Delivery */}
          {data.nextDeliveryDate && (
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: 6,
              padding: '8px 10px',
              background: 'rgba(59, 130, 246, 0.1)',
              borderRadius: 6,
              border: '1px solid rgba(59, 130, 246, 0.2)'
            }}>
              <LocalShipping style={{ fontSize: 14, color: '#60a5fa' }} />
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 10, color: '#9ca3af', textTransform: 'uppercase' }}>
                  Next Delivery
                </div>
                <div style={{ fontSize: 11, fontWeight: 600, color: '#d1d5db', marginTop: 2 }}>
                  {new Date(data.nextDeliveryDate).toLocaleDateString()}
                </div>
              </div>
            </div>
          )}

          {/* Contact Info */}
          {data.totalContacts > 0 && (
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: 6,
              padding: '4px 0',
              fontSize: 10,
              color: '#9ca3af'
            }}>
              <Phone style={{ fontSize: 12 }} />
              <span>{data.totalContacts} contact{data.totalContacts > 1 ? 's' : ''} available</span>
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
          <span style={{ fontSize: 10, color: '#8b5cf6', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.5px' }}>
            Click to Manage Suppliers
          </span>
        </div>
      </div>

      <Handle type="source" position={Position.Bottom} className="node-handle" />
    </div>
  );
};

export default SuppliersNode;
