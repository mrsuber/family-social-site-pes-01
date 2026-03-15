import React, { useState } from 'react';
import { Edit, Save, Close, Build, Person, LocationOn, AttachMoney, CalendarToday } from '@material-ui/icons';
import './PersonDetailModal.css';

const AssetDetailModal = ({ asset, onClose, onUpdate }) => {
  const [isEditing, setIsEditing] = useState(false);
  const assetData = asset?.fullData || asset || {};
  const [editData, setEditData] = useState({
    name: assetData.name || '',
    assetType: assetData.assetType || 'equipment',
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

  const handleSave = async () => {
    try {
      if (onUpdate) {
        await onUpdate(editData);
        onClose();
      }
    } catch (err) {
      console.error('Error in handleSave:', err);
      setIsEditing(false);
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'working':
        return '#10b981';
      case 'maintenance':
        return '#f59e0b';
      case 'broken':
        return '#ef4444';
      case 'decommissioned':
        return '#6b7280';
      default:
        return '#6b7280';
    }
  };

  const getConditionColor = (condition) => {
    if (condition >= 80) return '#10b981';
    if (condition >= 50) return '#f59e0b';
    return '#ef4444';
  };

  return (
    <div className="person-detail-overlay" onClick={onClose}>
      <div className="person-detail-modal asset-detail-modal" onClick={(e) => e.stopPropagation()} style={{ maxWidth: '900px', maxHeight: '90vh' }}>
        {/* Header */}
        <div className="person-detail-header" style={{ background: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)' }}>
          <div className="person-detail-header-content">
            <div className="person-detail-avatar asset-avatar">
              <Build style={{ fontSize: 40, color: '#fff' }} />
            </div>
            <div className="person-detail-title-section">
              {isEditing ? (
                <>
                  <input
                    type="text"
                    value={editData.name}
                    onChange={(e) => setEditData({ ...editData, name: e.target.value })}
                    className="person-detail-name-input"
                    placeholder="Asset Name"
                  />
                  <select
                    value={editData.assetType}
                    onChange={(e) => setEditData({ ...editData, assetType: e.target.value })}
                    className="person-detail-title-input"
                  >
                    <option value="car">Car</option>
                    <option value="computer">Computer</option>
                    <option value="machine">Machine</option>
                    <option value="equipment">Equipment</option>
                    <option value="tool">Tool</option>
                    <option value="furniture">Furniture</option>
                    <option value="other">Other</option>
                  </select>
                </>
              ) : (
                <>
                  <h2 className="person-detail-name">{assetData.name || 'Unnamed Asset'}</h2>
                  <p className="person-detail-title">{assetData.assetType || 'Equipment'}</p>
                </>
              )}
              <div className="person-detail-badges">
                <span
                  className="person-detail-badge"
                  style={{ background: getStatusColor(isEditing ? editData.status : assetData.status) }}
                >
                  {isEditing ? editData.status : assetData.status}
                </span>
                <span
                  className="person-detail-badge"
                  style={{ background: getConditionColor(isEditing ? editData.condition : assetData.condition) }}
                >
                  Condition: {isEditing ? editData.condition : assetData.condition}%
                </span>
              </div>
            </div>
          </div>
          <div className="person-detail-actions">
            {isEditing ? (
              <>
                <button className="person-detail-action-btn" onClick={handleSave}>
                  <Save /> Save
                </button>
                <button className="person-detail-action-btn" onClick={() => setIsEditing(false)}>
                  <Close /> Cancel
                </button>
              </>
            ) : (
              <>
                <button className="person-detail-action-btn" onClick={() => setIsEditing(true)}>
                  <Edit /> Edit
                </button>
                <button className="person-detail-action-btn" onClick={onClose}>
                  <Close /> Close
                </button>
              </>
            )}
          </div>
        </div>

        {/* Body */}
        <div className="person-detail-body" style={{ maxHeight: 'calc(90vh - 120px)', overflowY: 'auto' }}>
          <div className="asset-detail-grid">
            {/* Basic Information */}
            <div className="asset-detail-section">
              <h3><Build /> Basic Information</h3>
              <div className="asset-detail-field">
                <label>Serial Number</label>
                {isEditing ? (
                  <input
                    type="text"
                    value={editData.serialNumber}
                    onChange={(e) => setEditData({ ...editData, serialNumber: e.target.value })}
                    placeholder="Serial Number"
                  />
                ) : (
                  <p>{assetData.serialNumber || 'N/A'}</p>
                )}
              </div>

              <div className="asset-detail-field">
                <label>Status</label>
                {isEditing ? (
                  <select
                    value={editData.status}
                    onChange={(e) => setEditData({ ...editData, status: e.target.value })}
                  >
                    <option value="working">Working</option>
                    <option value="maintenance">Maintenance</option>
                    <option value="broken">Broken</option>
                    <option value="decommissioned">Decommissioned</option>
                  </select>
                ) : (
                  <p style={{ color: getStatusColor(assetData.status) }}>
                    {assetData.status || 'Unknown'}
                  </p>
                )}
              </div>

              <div className="asset-detail-field">
                <label>Condition</label>
                {isEditing ? (
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={editData.condition}
                    onChange={(e) => setEditData({ ...editData, condition: parseInt(e.target.value) })}
                  />
                ) : (
                  <div className="condition-bar">
                    <div
                      className="condition-fill"
                      style={{
                        width: `${assetData.condition || 0}%`,
                        background: getConditionColor(assetData.condition)
                      }}
                    ></div>
                  </div>
                )}
                {isEditing && <span>{editData.condition}%</span>}
              </div>
            </div>

            {/* Financial Information */}
            <div className="asset-detail-section">
              <h3><AttachMoney /> Financial</h3>
              <div className="asset-detail-field">
                <label>Purchase Cost</label>
                {isEditing ? (
                  <div style={{ display: 'flex', gap: '10px' }}>
                    <input
                      type="number"
                      value={editData.purchaseCost}
                      onChange={(e) => setEditData({ ...editData, purchaseCost: e.target.value })}
                      placeholder="0.00"
                      style={{ flex: 1 }}
                    />
                    <select
                      value={editData.currency}
                      onChange={(e) => setEditData({ ...editData, currency: e.target.value })}
                      style={{ width: '80px' }}
                    >
                      <option value="USD">USD</option>
                      <option value="EUR">EUR</option>
                      <option value="XAF">XAF</option>
                      <option value="GBP">GBP</option>
                    </select>
                  </div>
                ) : (
                  <p>
                    {assetData.purchaseCost
                      ? `${assetData.currency || 'USD'} ${parseFloat(assetData.purchaseCost).toLocaleString()}`
                      : 'N/A'}
                  </p>
                )}
              </div>

              <div className="asset-detail-field">
                <label>Purchase Date</label>
                {isEditing ? (
                  <input
                    type="date"
                    value={editData.purchaseDate}
                    onChange={(e) => setEditData({ ...editData, purchaseDate: e.target.value })}
                  />
                ) : (
                  <p>{assetData.purchaseDate ? new Date(assetData.purchaseDate).toLocaleDateString() : 'N/A'}</p>
                )}
              </div>
            </div>

            {/* Location */}
            <div className="asset-detail-section">
              <h3><LocationOn /> Location</h3>
              <div className="asset-detail-field">
                <label>Physical Location</label>
                {isEditing ? (
                  <input
                    type="text"
                    value={editData.location}
                    onChange={(e) => setEditData({ ...editData, location: e.target.value })}
                    placeholder="e.g., Office 2, Warehouse A"
                  />
                ) : (
                  <p>{assetData.location || 'N/A'}</p>
                )}
              </div>
            </div>

            {/* Maintenance */}
            <div className="asset-detail-section">
              <h3><CalendarToday /> Maintenance</h3>
              <div className="asset-detail-field">
                <label>Last Maintenance</label>
                {isEditing ? (
                  <input
                    type="date"
                    value={editData.lastMaintenanceDate}
                    onChange={(e) => setEditData({ ...editData, lastMaintenanceDate: e.target.value })}
                  />
                ) : (
                  <p>{assetData.lastMaintenanceDate ? new Date(assetData.lastMaintenanceDate).toLocaleDateString() : 'Never'}</p>
                )}
              </div>

              <div className="asset-detail-field">
                <label>Next Maintenance</label>
                {isEditing ? (
                  <input
                    type="date"
                    value={editData.nextMaintenanceDate}
                    onChange={(e) => setEditData({ ...editData, nextMaintenanceDate: e.target.value })}
                  />
                ) : (
                  <p>{assetData.nextMaintenanceDate ? new Date(assetData.nextMaintenanceDate).toLocaleDateString() : 'Not scheduled'}</p>
                )}
              </div>
            </div>

            {/* Notes */}
            <div className="asset-detail-section full-width">
              <h3>Notes</h3>
              <div className="asset-detail-field">
                {isEditing ? (
                  <textarea
                    value={editData.notes}
                    onChange={(e) => setEditData({ ...editData, notes: e.target.value })}
                    placeholder="Add notes about this asset..."
                    rows={4}
                  />
                ) : (
                  <p>{assetData.notes || 'No notes'}</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AssetDetailModal;
