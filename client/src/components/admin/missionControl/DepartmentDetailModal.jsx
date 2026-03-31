import React, { useState, useEffect } from 'react';
import './PersonDetailModal.css';
import IslamicCourseModal from './IslamicCourseModal';

const DepartmentDetailModal = ({ department, onClose, onSave }) => {
  // State for Islamic course modal
  const [selectedObjective, setSelectedObjective] = useState(null);
  const [showIslamicCourseModal, setShowIslamicCourseModal] = useState(false);
  // Helper function to parse objectives from JSON string or return array
  const parseObjectives = (objectives) => {
    if (!objectives) return [];

    // If it's already an array, return it
    if (Array.isArray(objectives)) {
      return objectives;
    }

    // If it's a string, try to parse it
    if (typeof objectives === 'string') {
      try {
        const parsed = JSON.parse(objectives);
        return Array.isArray(parsed) ? parsed : [];
      } catch (e) {
        console.error('Failed to parse objectives:', e);
        return [];
      }
    }

    return [];
  };

  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState({
    name: department?.name || '',
    description: department?.description || '',
    status: department?.status || 'active',
    objectives: parseObjectives(department?.objectives),
    orderNumber: department?.orderNumber || 0
  });
  const [newObjective, setNewObjective] = useState('');

  useEffect(() => {
    if (department) {
      setEditData({
        name: department.name || '',
        description: department.description || '',
        status: department.status || 'active',
        objectives: parseObjectives(department.objectives),
        orderNumber: department.orderNumber || 0
      });
    }
  }, [department]);

  const handleSave = async () => {
    try {
      await onSave({ ...department, ...editData });
      setIsEditing(false);
    } catch (error) {
      console.error('Error saving department:', error);
      alert('Failed to save department details');
    }
  };

  const handleAddObjective = () => {
    if (newObjective.trim()) {
      setEditData({
        ...editData,
        objectives: [...editData.objectives, newObjective.trim()]
      });
      setNewObjective('');
    }
  };

  const handleRemoveObjective = (index) => {
    setEditData({
      ...editData,
      objectives: editData.objectives.filter((_, i) => i !== index)
    });
  };

  const handleObjectiveClick = (objective) => {
    // Only make objectives clickable for Islamic Governance & Studies (General 5)
    // General 5 ID: 68e878f0-b17a-4877-b161-4f430d392509
    const isIslamicDepartment = department?.generalId === '68e878f0-b17a-4877-b161-4f430d392509' ||
                                department?.general?.name === 'Islamic Governance & Studies' ||
                                department?.general?.id === '68e878f0-b17a-4877-b161-4f430d392509';

    if (isIslamicDepartment && !isEditing) {
      setSelectedObjective(objective);
      setShowIslamicCourseModal(true);
    }
  };

  if (!department) return null;

  // Check if this is an Islamic department (General 5)
  const isIslamicDepartment = department?.generalId === '68e878f0-b17a-4877-b161-4f430d392509' ||
                              department?.general?.name === 'Islamic Governance & Studies' ||
                              department?.general?.id === '68e878f0-b17a-4877-b161-4f430d392509';

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
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            padding: '24px',
            borderRadius: '12px 12px 0 0',
            color: 'white'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <div>
                <h2 style={{ margin: '0 0 8px 0', fontSize: '28px', fontWeight: '700' }}>
                  🏢 {department.name}
                </h2>
                <p style={{ margin: 0, opacity: 0.9, fontSize: '14px' }}>
                  Department Details
                </p>
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
                  <label>Department Name</label>
                  {isEditing ? (
                    <input
                      type="text"
                      value={editData.name}
                      onChange={(e) => setEditData({ ...editData, name: e.target.value })}
                      className="person-detail-input"
                    />
                  ) : (
                    <p>{department.name}</p>
                  )}
                </div>

                <div className="person-detail-field">
                  <label>Description</label>
                  {isEditing ? (
                    <textarea
                      value={editData.description}
                      onChange={(e) => setEditData({ ...editData, description: e.target.value })}
                      className="person-detail-textarea"
                      rows="4"
                    />
                  ) : (
                    <p>{department.description || 'No description provided'}</p>
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
                      <option value="active">Active</option>
                      <option value="inactive">Inactive</option>
                      <option value="planning">Planning</option>
                    </select>
                  ) : (
                    <p style={{
                      display: 'inline-block',
                      padding: '4px 12px',
                      borderRadius: '12px',
                      background: department.status === 'active' ? '#10b981' : '#6b7280',
                      color: 'white',
                      fontSize: '12px',
                      fontWeight: '600'
                    }}>
                      {department.status || 'active'}
                    </p>
                  )}
                </div>

                <div className="person-detail-field">
                  <label>Order Number</label>
                  {isEditing ? (
                    <input
                      type="number"
                      value={editData.orderNumber}
                      onChange={(e) => setEditData({ ...editData, orderNumber: parseInt(e.target.value) })}
                      className="person-detail-input"
                    />
                  ) : (
                    <p>{department.orderNumber || 0}</p>
                  )}
                </div>
              </div>
            </div>

            {/* Objectives */}
            <div className="person-detail-section">
              <h3 className="person-detail-section-title">
                <span className="person-detail-section-icon">🎯</span>
                Objectives
              </h3>
              <div className="person-detail-section-content">
                {isEditing && (
                  <div style={{ marginBottom: '16px', display: 'flex', gap: '8px' }}>
                    <input
                      type="text"
                      value={newObjective}
                      onChange={(e) => setNewObjective(e.target.value)}
                      placeholder="Add new objective..."
                      className="person-detail-input"
                      style={{ flex: 1 }}
                      onKeyPress={(e) => e.key === 'Enter' && handleAddObjective()}
                    />
                    <button
                      onClick={handleAddObjective}
                      className="person-detail-action-btn"
                      style={{ padding: '8px 16px' }}
                    >
                      Add
                    </button>
                  </div>
                )}

                {editData.objectives.length > 0 ? (
                  <ul style={{
                    listStyle: 'none',
                    padding: 0,
                    margin: 0,
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '8px'
                  }}>
                    {editData.objectives.map((objective, index) => (
                      <li
                        key={index}
                        onClick={() => handleObjectiveClick(objective)}
                        style={{
                          background: 'rgba(255, 255, 255, 0.05)',
                          padding: '12px',
                          borderRadius: '8px',
                          display: 'flex',
                          justifyContent: 'space-between',
                          alignItems: 'center',
                          cursor: isIslamicDepartment && !isEditing ? 'pointer' : 'default',
                          transition: 'all 0.2s ease',
                          ...(isIslamicDepartment && !isEditing && {
                            ':hover': {
                              background: 'rgba(102, 126, 234, 0.2)',
                              transform: 'translateX(4px)'
                            }
                          })
                        }}
                        onMouseEnter={(e) => {
                          if (isIslamicDepartment && !isEditing) {
                            e.currentTarget.style.background = 'rgba(102, 126, 234, 0.2)';
                            e.currentTarget.style.transform = 'translateX(4px)';
                          }
                        }}
                        onMouseLeave={(e) => {
                          if (isIslamicDepartment && !isEditing) {
                            e.currentTarget.style.background = 'rgba(255, 255, 255, 0.05)';
                            e.currentTarget.style.transform = 'translateX(0)';
                          }
                        }}
                      >
                        <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                          <span>• {objective}</span>
                          {isIslamicDepartment && !isEditing && (
                            <span style={{ fontSize: '12px', opacity: 0.6 }}>📚 Click to learn</span>
                          )}
                        </span>
                        {isEditing && (
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleRemoveObjective(index);
                            }}
                            style={{
                              background: 'rgba(239, 68, 68, 0.2)',
                              border: '1px solid rgba(239, 68, 68, 0.4)',
                              color: '#ef4444',
                              padding: '4px 12px',
                              borderRadius: '6px',
                              cursor: 'pointer',
                              fontSize: '12px'
                            }}
                          >
                            Remove
                          </button>
                        )}
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p style={{ color: '#9ca3af', fontStyle: 'italic' }}>
                    No objectives set
                  </p>
                )}
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
                    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
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
                  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
                }}
              >
                ✏️ Edit
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Islamic Course Modal */}
      {showIslamicCourseModal && (
        <IslamicCourseModal
          department={department}
          objectiveTitle={selectedObjective}
          onClose={() => {
            setShowIslamicCourseModal(false);
            setSelectedObjective(null);
          }}
        />
      )}
    </div>
  );
};

export default DepartmentDetailModal;
