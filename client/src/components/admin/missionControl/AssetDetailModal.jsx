import React, { useState, useEffect } from 'react';
import './PersonDetailModal.css';

const AssetDetailModal = ({ asset, onClose, onUpdate }) => {
  const [isEditing, setIsEditing] = useState(false);
  const assetData = asset?.fullData || asset || {};

  const [editData, setEditData] = useState({
    name: assetData.name || '',
    assetType: assetData.assetType || 'equipment',
    acquisitionStatus: assetData.acquisitionStatus || 'target',
    serialNumber: assetData.serialNumber || '',
    status: assetData.status || 'working',
    purchaseCost: assetData.purchaseCost || '',
    currency: assetData.currency || 'USD',
    purchaseDate: assetData.purchaseDate ? assetData.purchaseDate.split('T')[0] : '',
    lastMaintenanceDate: assetData.lastMaintenanceDate ? assetData.lastMaintenanceDate.split('T')[0] : '',
    nextMaintenanceDate: assetData.nextMaintenanceDate ? assetData.nextMaintenanceDate.split('T')[0] : '',
    location: assetData.location || '',
    condition: assetData.condition || 100,
    notes: assetData.notes || ''
  });

  useEffect(() => {
    if (assetData) {
      setEditData({
        name: assetData.name || '',
        assetType: assetData.assetType || 'equipment',
        acquisitionStatus: assetData.acquisitionStatus || 'target',
        serialNumber: assetData.serialNumber || '',
        status: assetData.status || 'working',
        purchaseCost: assetData.purchaseCost || '',
        currency: assetData.currency || 'USD',
        purchaseDate: assetData.purchaseDate ? assetData.purchaseDate.split('T')[0] : '',
        lastMaintenanceDate: assetData.lastMaintenanceDate ? assetData.lastMaintenanceDate.split('T')[0] : '',
        nextMaintenanceDate: assetData.nextMaintenanceDate ? assetData.nextMaintenanceDate.split('T')[0] : '',
        location: assetData.location || '',
        condition: assetData.condition || 100,
        notes: assetData.notes || ''
      });
    }
  }, [assetData]);

  const handleSave = async () => {
    try {
      await onUpdate(editData);
      setIsEditing(false);
    } catch (error) {
      console.error('Error saving asset:', error);
      alert('Failed to save asset details');
    }
  };

  const getStatusColor = (status) => {
    const colors = {
      working: '#10b981',
      maintenance: '#f59e0b',
      broken: '#ef4444',
      decommissioned: '#6b7280'
    };
    return colors[status] || '#6b7280';
  };

  const getConditionColor = (condition) => {
    if (condition >= 80) return '#10b981';
    if (condition >= 50) return '#f59e0b';
    return '#ef4444';
  };

  const isTarget = (editData.acquisitionStatus || assetData.acquisitionStatus) === 'target';

  return (
    <div className="person-detail-modal-overlay" onClick={onClose}>
      <div
        className="person-detail-modal-wrapper"
        onClick={(e) => e.stopPropagation()}
        style={{ maxWidth: '900px', maxHeight: '90vh' }}
      >
        <div className="person-detail-modal">
          {/* Header */}
          <div className="person-detail-header" style={{
            background: isTarget
              ? 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)'
              : 'linear-gradient(135deg, #3b82f6 0%, #1e40af 100%)',
            padding: '24px',
            borderRadius: '12px 12px 0 0',
            color: 'white'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <div style={{ flex: 1 }}>
                <h2 style={{ margin: '0 0 8px 0', fontSize: '28px', fontWeight: '700' }}>
                  🔧 {assetData.name || 'Unnamed Asset'}
                </h2>
                <div style={{ display: 'flex', gap: '12px', alignItems: 'center', flexWrap: 'wrap' }}>
                  {isTarget ? (
                    <span style={{
                      padding: '6px 14px',
                      borderRadius: '20px',
                      background: 'rgba(255, 255, 255, 0.25)',
                      fontSize: '13px',
                      fontWeight: '700',
                      border: '2px solid rgba(255, 255, 255, 0.4)'
                    }}>
                      🎯 TARGET TO ACQUIRE
                    </span>
                  ) : (
                    <span style={{
                      padding: '6px 14px',
                      borderRadius: '20px',
                      background: 'rgba(255, 255, 255, 0.25)',
                      fontSize: '13px',
                      fontWeight: '700',
                      border: '2px solid rgba(255, 255, 255, 0.4)'
                    }}>
                      ✅ ACQUIRED
                    </span>
                  )}
                  <span style={{
                    padding: '6px 14px',
                    borderRadius: '20px',
                    background: getStatusColor(assetData.status),
                    fontSize: '12px',
                    fontWeight: '600'
                  }}>
                    {assetData.status || 'working'}
                  </span>
                  <span style={{ fontSize: '14px', opacity: 0.9 }}>
                    Condition: {assetData.condition || 100}%
                  </span>
                </div>
              </div>
              <button
                onClick={onClose}
                style={{
                  background: 'rgba(255, 255, 255, 0.2)',
                  border: 'none',
                  color: 'white',
                  fontSize: '24px',
                  cursor: 'pointer',
                  width: '36px',
                  height: '36px',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                ×
              </button>
            </div>
          </div>

          {/* Body */}
          <div className="person-detail-body" style={{
            padding: '24px',
            maxHeight: 'calc(90vh - 200px)',
            overflowY: 'auto'
          }}>
            {/* Basic Information */}
            <div className="person-detail-section">
              <h3 className="person-detail-section-title">
                <span className="person-detail-section-icon">ℹ️</span>
                Basic Information
              </h3>
              <div className="person-detail-section-content">
                <div className="person-detail-field">
                  <label>Asset Name</label>
                  {isEditing ? (
                    <input
                      type="text"
                      value={editData.name}
                      onChange={(e) => setEditData({ ...editData, name: e.target.value })}
                      className="person-detail-input"
                    />
                  ) : (
                    <p>{assetData.name || 'N/A'}</p>
                  )}
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                  <div className="person-detail-field">
                    <label>Asset Type</label>
                    {isEditing ? (
                      <select
                        value={editData.assetType}
                        onChange={(e) => setEditData({ ...editData, assetType: e.target.value })}
                        className="person-detail-input"
                      >
                        <option value="technology">Technology</option>
                        <option value="equipment">Equipment</option>
                        <option value="vehicle">Vehicle</option>
                        <option value="property">Property</option>
                        <option value="financial">Financial</option>
                        <option value="other">Other</option>
                      </select>
                    ) : (
                      <p>{assetData.assetType || 'N/A'}</p>
                    )}
                  </div>

                  <div className="person-detail-field">
                    <label>Serial Number</label>
                    {isEditing ? (
                      <input
                        type="text"
                        value={editData.serialNumber}
                        onChange={(e) => setEditData({ ...editData, serialNumber: e.target.value })}
                        className="person-detail-input"
                      />
                    ) : (
                      <p>{assetData.serialNumber || 'N/A'}</p>
                    )}
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                  <div className="person-detail-field">
                    <label>Acquisition Status</label>
                    {isEditing ? (
                      <select
                        value={editData.acquisitionStatus}
                        onChange={(e) => setEditData({ ...editData, acquisitionStatus: e.target.value })}
                        className="person-detail-input"
                      >
                        <option value="target">TARGET - To Acquire</option>
                        <option value="acquired">ACQUIRED - Already Owned</option>
                      </select>
                    ) : (
                      <p style={{
                        display: 'inline-block',
                        padding: '6px 14px',
                        borderRadius: '12px',
                        background: isTarget ? '#f59e0b' : '#3b82f6',
                        color: 'white',
                        fontSize: '12px',
                        fontWeight: '600'
                      }}>
                        {isTarget ? '🎯 TARGET' : '✅ ACQUIRED'}
                      </p>
                    )}
                  </div>

                  <div className="person-detail-field">
                    <label>Status</label>
                    {isEditing ? (
                      <select
                        value={editData.status}
                        onChange={(e) => setEditData({ ...editData, status: e.target.value })}
                        className="person-detail-input"
                      >
                        <option value="working">Working</option>
                        <option value="maintenance">Maintenance</option>
                        <option value="broken">Broken</option>
                        <option value="decommissioned">Decommissioned</option>
                      </select>
                    ) : (
                      <p style={{
                        display: 'inline-block',
                        padding: '4px 12px',
                        borderRadius: '12px',
                        background: getStatusColor(assetData.status),
                        color: 'white',
                        fontSize: '12px',
                        fontWeight: '600'
                      }}>
                        {assetData.status || 'working'}
                      </p>
                    )}
                  </div>
                </div>

                <div className="person-detail-field">
                  <label>Condition ({editData.condition}%)</label>
                  {isEditing ? (
                    <div>
                      <input
                        type="range"
                        min="0"
                        max="100"
                        value={editData.condition}
                        onChange={(e) => setEditData({ ...editData, condition: parseInt(e.target.value) })}
                        style={{ width: '100%' }}
                      />
                      <div style={{ textAlign: 'center', marginTop: '8px', color: getConditionColor(editData.condition), fontWeight: '600' }}>
                        {editData.condition}%
                      </div>
                    </div>
                  ) : (
                    <div>
                      <div style={{
                        width: '100%',
                        height: '24px',
                        background: 'rgba(255, 255, 255, 0.05)',
                        borderRadius: '12px',
                        overflow: 'hidden'
                      }}>
                        <div style={{
                          width: `${assetData.condition}%`,
                          height: '100%',
                          background: getConditionColor(assetData.condition),
                          transition: 'width 0.3s ease'
                        }} />
                      </div>
                      <p style={{ marginTop: '8px', textAlign: 'center', color: getConditionColor(assetData.condition), fontWeight: '600' }}>
                        {assetData.condition}%
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Financial Information */}
            <div className="person-detail-section">
              <h3 className="person-detail-section-title">
                <span className="person-detail-section-icon">💰</span>
                Financial
              </h3>
              <div className="person-detail-section-content">
                <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '16px' }}>
                  <div className="person-detail-field">
                    <label>Purchase Cost</label>
                    {isEditing ? (
                      <input
                        type="number"
                        step="0.01"
                        value={editData.purchaseCost}
                        onChange={(e) => setEditData({ ...editData, purchaseCost: e.target.value })}
                        className="person-detail-input"
                      />
                    ) : (
                      <p>{assetData.purchaseCost ? `${parseFloat(assetData.purchaseCost).toLocaleString()}` : 'Not set'}</p>
                    )}
                  </div>

                  <div className="person-detail-field">
                    <label>Currency</label>
                    {isEditing ? (
                      <select
                        value={editData.currency}
                        onChange={(e) => setEditData({ ...editData, currency: e.target.value })}
                        className="person-detail-input"
                      >
                        <option value="USD">USD</option>
                        <option value="EUR">EUR</option>
                        <option value="GBP">GBP</option>
                        <option value="XAF">XAF</option>
                      </select>
                    ) : (
                      <p>{assetData.currency || 'USD'}</p>
                    )}
                  </div>
                </div>

                <div className="person-detail-field">
                  <label>Purchase Date</label>
                  {isEditing ? (
                    <input
                      type="date"
                      value={editData.purchaseDate}
                      onChange={(e) => setEditData({ ...editData, purchaseDate: e.target.value })}
                      className="person-detail-input"
                    />
                  ) : (
                    <p>{assetData.purchaseDate ? new Date(assetData.purchaseDate).toLocaleDateString() : 'Not set'}</p>
                  )}
                </div>
              </div>
            </div>

            {/* Location */}
            <div className="person-detail-section">
              <h3 className="person-detail-section-title">
                <span className="person-detail-section-icon">📍</span>
                Location
              </h3>
              <div className="person-detail-section-content">
                <div className="person-detail-field">
                  <label>Physical Location</label>
                  {isEditing ? (
                    <input
                      type="text"
                      value={editData.location}
                      onChange={(e) => setEditData({ ...editData, location: e.target.value })}
                      className="person-detail-input"
                      placeholder="e.g., Office 2, Warehouse A"
                    />
                  ) : (
                    <p>{assetData.location || 'Not specified'}</p>
                  )}
                </div>
              </div>
            </div>

            {/* Maintenance */}
            <div className="person-detail-section">
              <h3 className="person-detail-section-title">
                <span className="person-detail-section-icon">🔧</span>
                Maintenance
              </h3>
              <div className="person-detail-section-content">
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                  <div className="person-detail-field">
                    <label>Last Maintenance</label>
                    {isEditing ? (
                      <input
                        type="date"
                        value={editData.lastMaintenanceDate}
                        onChange={(e) => setEditData({ ...editData, lastMaintenanceDate: e.target.value })}
                        className="person-detail-input"
                      />
                    ) : (
                      <p>{assetData.lastMaintenanceDate ? new Date(assetData.lastMaintenanceDate).toLocaleDateString() : 'Never'}</p>
                    )}
                  </div>

                  <div className="person-detail-field">
                    <label>Next Maintenance</label>
                    {isEditing ? (
                      <input
                        type="date"
                        value={editData.nextMaintenanceDate}
                        onChange={(e) => setEditData({ ...editData, nextMaintenanceDate: e.target.value })}
                        className="person-detail-input"
                      />
                    ) : (
                      <p>{assetData.nextMaintenanceDate ? new Date(assetData.nextMaintenanceDate).toLocaleDateString() : 'Not scheduled'}</p>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Notes */}
            <div className="person-detail-section">
              <h3 className="person-detail-section-title">
                <span className="person-detail-section-icon">📝</span>
                Notes
              </h3>
              <div className="person-detail-section-content">
                <div className="person-detail-field">
                  {isEditing ? (
                    <textarea
                      value={editData.notes}
                      onChange={(e) => setEditData({ ...editData, notes: e.target.value })}
                      className="person-detail-textarea"
                      rows="4"
                      placeholder="Add notes about this asset..."
                    />
                  ) : (
                    <p style={{ whiteSpace: 'pre-wrap' }}>{assetData.notes || 'No notes'}</p>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="person-detail-footer">
            {isEditing ? (
              <>
                <button
                  onClick={() => setIsEditing(false)}
                  className="person-detail-action-btn"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSave}
                  className="person-detail-action-btn"
                  style={{
                    background: isTarget
                      ? 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)'
                      : 'linear-gradient(135deg, #3b82f6 0%, #1e40af 100%)'
                  }}
                >
                  💾 Save Changes
                </button>
              </>
            ) : (
              <button
                onClick={() => setIsEditing(true)}
                className="person-detail-action-btn"
                style={{
                  background: isTarget
                    ? 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)'
                    : 'linear-gradient(135deg, #3b82f6 0%, #1e40af 100%)'
                }}
              >
                ✏️ Edit
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AssetDetailModal;
