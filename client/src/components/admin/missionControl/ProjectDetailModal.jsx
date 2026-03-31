import React, { useState, useEffect } from 'react';
import './PersonDetailModal.css';

const ProjectDetailModal = ({ project, onClose, onSave }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState({
    name: project?.name || '',
    description: project?.description || '',
    status: project?.status || 'planning',
    priority: project?.priority || 'medium',
    startDate: project?.startDate || '',
    endDate: project?.endDate || '',
    budget: project?.budget || '',
    currency: project?.currency || 'USD',
    completionPercentage: project?.completionPercentage || 0,
    objectives: project?.objectives || []
  });
  const [newObjective, setNewObjective] = useState('');

  useEffect(() => {
    if (project) {
      setEditData({
        name: project.name || '',
        description: project.description || '',
        status: project.status || 'planning',
        priority: project.priority || 'medium',
        startDate: project.startDate ? new Date(project.startDate).toISOString().split('T')[0] : '',
        endDate: project.endDate ? new Date(project.endDate).toISOString().split('T')[0] : '',
        budget: project.budget || '',
        currency: project.currency || 'USD',
        completionPercentage: project.completionPercentage || 0,
        objectives: project.objectives || []
      });
    }
  }, [project]);

  const handleSave = async () => {
    try {
      await onSave({ ...project, ...editData });
      setIsEditing(false);
    } catch (error) {
      console.error('Error saving project:', error);
      alert('Failed to save project details');
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

  const getStatusColor = (status) => {
    const colors = {
      planning: '#6b7280',
      active: '#10b981',
      'on-hold': '#f59e0b',
      completed: '#3b82f6',
      cancelled: '#ef4444'
    };
    return colors[status] || '#6b7280';
  };

  const getPriorityColor = (priority) => {
    const colors = {
      low: '#10b981',
      medium: '#f59e0b',
      high: '#f97316',
      critical: '#ef4444'
    };
    return colors[priority] || '#6b7280';
  };

  if (!project) return null;

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
            background: 'linear-gradient(135deg, #3b82f6 0%, #1e40af 100%)',
            padding: '24px',
            borderRadius: '12px 12px 0 0',
            color: 'white'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <div style={{ flex: 1 }}>
                <h2 style={{ margin: '0 0 8px 0', fontSize: '28px', fontWeight: '700' }}>
                  📁 {project.name}
                </h2>
                <div style={{ display: 'flex', gap: '12px', alignItems: 'center', flexWrap: 'wrap' }}>
                  <span style={{
                    padding: '4px 12px',
                    borderRadius: '12px',
                    background: getStatusColor(project.status),
                    fontSize: '12px',
                    fontWeight: '600'
                  }}>
                    {project.status}
                  </span>
                  <span style={{
                    padding: '4px 12px',
                    borderRadius: '12px',
                    background: getPriorityColor(project.priority),
                    fontSize: '12px',
                    fontWeight: '600'
                  }}>
                    {project.priority} priority
                  </span>
                  <span style={{ fontSize: '14px', opacity: 0.9 }}>
                    {project.completionPercentage}% Complete
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
                  <label>Project Name</label>
                  {isEditing ? (
                    <input
                      type="text"
                      value={editData.name}
                      onChange={(e) => setEditData({ ...editData, name: e.target.value })}
                      className="person-detail-input"
                    />
                  ) : (
                    <p>{project.name}</p>
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
                    <p>{project.description || 'No description provided'}</p>
                  )}
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                  <div className="person-detail-field">
                    <label>Status</label>
                    {isEditing ? (
                      <select
                        value={editData.status}
                        onChange={(e) => setEditData({ ...editData, status: e.target.value })}
                        className="person-detail-input"
                      >
                        <option value="planning">Planning</option>
                        <option value="active">Active</option>
                        <option value="on-hold">On Hold</option>
                        <option value="completed">Completed</option>
                        <option value="cancelled">Cancelled</option>
                      </select>
                    ) : (
                      <p style={{
                        display: 'inline-block',
                        padding: '4px 12px',
                        borderRadius: '12px',
                        background: getStatusColor(project.status),
                        color: 'white',
                        fontSize: '12px',
                        fontWeight: '600'
                      }}>
                        {project.status}
                      </p>
                    )}
                  </div>

                  <div className="person-detail-field">
                    <label>Priority</label>
                    {isEditing ? (
                      <select
                        value={editData.priority}
                        onChange={(e) => setEditData({ ...editData, priority: e.target.value })}
                        className="person-detail-input"
                      >
                        <option value="low">Low</option>
                        <option value="medium">Medium</option>
                        <option value="high">High</option>
                        <option value="critical">Critical</option>
                      </select>
                    ) : (
                      <p style={{
                        display: 'inline-block',
                        padding: '4px 12px',
                        borderRadius: '12px',
                        background: getPriorityColor(project.priority),
                        color: 'white',
                        fontSize: '12px',
                        fontWeight: '600'
                      }}>
                        {project.priority}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Timeline & Progress */}
            <div className="person-detail-section">
              <h3 className="person-detail-section-title">
                <span className="person-detail-section-icon">📅</span>
                Timeline & Progress
              </h3>
              <div className="person-detail-section-content">
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                  <div className="person-detail-field">
                    <label>Start Date</label>
                    {isEditing ? (
                      <input
                        type="date"
                        value={editData.startDate}
                        onChange={(e) => setEditData({ ...editData, startDate: e.target.value })}
                        className="person-detail-input"
                      />
                    ) : (
                      <p>{project.startDate ? new Date(project.startDate).toLocaleDateString() : 'Not set'}</p>
                    )}
                  </div>

                  <div className="person-detail-field">
                    <label>End Date</label>
                    {isEditing ? (
                      <input
                        type="date"
                        value={editData.endDate}
                        onChange={(e) => setEditData({ ...editData, endDate: e.target.value })}
                        className="person-detail-input"
                      />
                    ) : (
                      <p>{project.endDate ? new Date(project.endDate).toLocaleDateString() : 'Not set'}</p>
                    )}
                  </div>
                </div>

                <div className="person-detail-field">
                  <label>Completion Percentage</label>
                  {isEditing ? (
                    <div>
                      <input
                        type="range"
                        min="0"
                        max="100"
                        value={editData.completionPercentage}
                        onChange={(e) => setEditData({ ...editData, completionPercentage: parseInt(e.target.value) })}
                        style={{ width: '100%' }}
                      />
                      <div style={{ textAlign: 'center', marginTop: '8px', color: '#3b82f6', fontWeight: '600' }}>
                        {editData.completionPercentage}%
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
                          width: `${project.completionPercentage}%`,
                          height: '100%',
                          background: 'linear-gradient(90deg, #3b82f6 0%, #1e40af 100%)',
                          transition: 'width 0.3s ease'
                        }} />
                      </div>
                      <p style={{ marginTop: '8px', textAlign: 'center', color: '#3b82f6', fontWeight: '600' }}>
                        {project.completionPercentage}%
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Budget */}
            <div className="person-detail-section">
              <h3 className="person-detail-section-title">
                <span className="person-detail-section-icon">💰</span>
                Budget
              </h3>
              <div className="person-detail-section-content">
                <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '16px' }}>
                  <div className="person-detail-field">
                    <label>Budget Amount</label>
                    {isEditing ? (
                      <input
                        type="number"
                        step="0.01"
                        value={editData.budget}
                        onChange={(e) => setEditData({ ...editData, budget: e.target.value })}
                        className="person-detail-input"
                      />
                    ) : (
                      <p>{project.budget ? `${parseFloat(project.budget).toLocaleString()}` : 'Not set'}</p>
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
                        <option value="JPY">JPY</option>
                        <option value="CNY">CNY</option>
                      </select>
                    ) : (
                      <p>{project.currency}</p>
                    )}
                  </div>
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
                      <li key={index} style={{
                        background: 'rgba(255, 255, 255, 0.05)',
                        padding: '12px',
                        borderRadius: '8px',
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center'
                      }}>
                        <span>• {objective}</span>
                        {isEditing && (
                          <button
                            onClick={() => handleRemoveObjective(index)}
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
                    background: 'linear-gradient(135deg, #3b82f6 0%, #1e40af 100%)'
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
                  background: 'linear-gradient(135deg, #3b82f6 0%, #1e40af 100%)'
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

export default ProjectDetailModal;
