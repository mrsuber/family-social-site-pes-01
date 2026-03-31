import React, { useState, useEffect } from 'react';
import './PersonDetailModal.css';
import { getDataAPI, postDataAPI, putDataAPI } from '../../../utils/fetchData';
import { uploadLandmarkPhoto, deleteLandmarkPhoto } from '../../../utils/uploadUtils';

const LandmarkDetailModal = ({ landmark, onClose, onSave }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState({
    title: landmark?.title || '',
    description: landmark?.description || '',
    startDate: landmark?.startDate ? new Date(landmark.startDate).toISOString().slice(0, 16) : '',
    endDate: landmark?.endDate ? new Date(landmark.endDate).toISOString().slice(0, 16) : '',
    amount: landmark?.amount || '',
    currency: landmark?.currency || 'XAF',
    paymentStatus: landmark?.paymentStatus || 'pending',
    amountPaid: landmark?.amountPaid || 0,
    status: landmark?.status || 'pending',
    priority: landmark?.priority || 'medium',
    progress: landmark?.progress || 0,
    category: landmark?.category || '',
    tags: landmark?.tags || [],
    checklist: landmark?.checklist || [],
    notes: landmark?.notes || '',
    reminderDays: landmark?.reminderDays || 7,
    photos: landmark?.photos || []
  });

  const [newChecklistItem, setNewChecklistItem] = useState('');
  const [newTag, setNewTag] = useState('');
  const [uploadingPhoto, setUploadingPhoto] = useState(false);

  useEffect(() => {
    if (landmark) {
      setEditData({
        title: landmark.title || '',
        description: landmark.description || '',
        startDate: landmark.startDate ? new Date(landmark.startDate).toISOString().slice(0, 16) : '',
        endDate: landmark.endDate ? new Date(landmark.endDate).toISOString().slice(0, 16) : '',
        amount: landmark.amount || '',
        currency: landmark.currency || 'XAF',
        paymentStatus: landmark.paymentStatus || 'pending',
        amountPaid: landmark.amountPaid || 0,
        status: landmark.status || 'pending',
        priority: landmark.priority || 'medium',
        progress: landmark.progress || 0,
        category: landmark.category || '',
        tags: landmark.tags || [],
        checklist: landmark.checklist || [],
        notes: landmark.notes || '',
        reminderDays: landmark.reminderDays || 7,
        photos: landmark.photos || []
      });
    }
  }, [landmark]);

  const handleSave = async () => {
    try {
      // Sanitize data - convert empty strings to null for numeric fields
      const sanitizedData = { ...editData };

      // Handle numeric fields - convert empty strings to null
      if (sanitizedData.amount === '' || sanitizedData.amount === undefined) {
        sanitizedData.amount = null;
      } else if (typeof sanitizedData.amount === 'string') {
        sanitizedData.amount = parseFloat(sanitizedData.amount) || null;
      }

      if (sanitizedData.amountPaid === '' || sanitizedData.amountPaid === undefined) {
        sanitizedData.amountPaid = null;
      } else if (typeof sanitizedData.amountPaid === 'string') {
        sanitizedData.amountPaid = parseFloat(sanitizedData.amountPaid) || null;
      }

      // Recalculate progress based on checklist completion
      if (sanitizedData.checklist && sanitizedData.checklist.length > 0) {
        const totalTasks = sanitizedData.checklist.length;
        const completedTasks = sanitizedData.checklist.filter(item => item.completed).length;
        sanitizedData.progress = Math.round((completedTasks / totalTasks) * 100);
      } else if (sanitizedData.progress === '' || sanitizedData.progress === undefined) {
        sanitizedData.progress = 0;
      } else if (typeof sanitizedData.progress === 'string') {
        sanitizedData.progress = parseInt(sanitizedData.progress) || 0;
      }

      if (sanitizedData.reminderDays === '' || sanitizedData.reminderDays === undefined) {
        sanitizedData.reminderDays = 7;
      } else if (typeof sanitizedData.reminderDays === 'string') {
        sanitizedData.reminderDays = parseInt(sanitizedData.reminderDays) || 7;
      }

      await onSave({ ...landmark, ...sanitizedData });
      setIsEditing(false);
    } catch (error) {
      console.error('Error saving landmark:', error);
      alert('Failed to save landmark details');
    }
  };

  const handleAddChecklistItem = () => {
    if (newChecklistItem.trim()) {
      const newItem = {
        id: Date.now().toString(),
        title: newChecklistItem.trim(),
        completed: false,
        completedAt: null,
        completedBy: null
      };
      setEditData({
        ...editData,
        checklist: [...editData.checklist, newItem]
      });
      setNewChecklistItem('');
    }
  };

  const handleToggleChecklistItem = (itemId) => {
    const updatedChecklist = editData.checklist.map(item =>
      item.id === itemId
        ? {
            ...item,
            completed: !item.completed,
            completedAt: !item.completed ? new Date().toISOString() : null
          }
        : item
    );

    // Calculate new progress
    const totalTasks = updatedChecklist.length;
    const completedTasks = updatedChecklist.filter(item => item.completed).length;
    const newProgress = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

    setEditData({
      ...editData,
      checklist: updatedChecklist,
      progress: newProgress
    });
  };

  const handleRemoveChecklistItem = (itemId) => {
    const updatedChecklist = editData.checklist.filter(item => item.id !== itemId);

    // Calculate new progress
    const totalTasks = updatedChecklist.length;
    const completedTasks = updatedChecklist.filter(item => item.completed).length;
    const newProgress = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

    setEditData({
      ...editData,
      checklist: updatedChecklist,
      progress: newProgress
    });
  };

  const handleAddTag = () => {
    if (newTag.trim() && !editData.tags.includes(newTag.trim())) {
      setEditData({
        ...editData,
        tags: [...editData.tags, newTag.trim()]
      });
      setNewTag('');
    }
  };

  const handleRemoveTag = (tag) => {
    setEditData({
      ...editData,
      tags: editData.tags.filter(t => t !== tag)
    });
  };

  const handlePhotoUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadingPhoto(true);
    try {
      const result = await uploadLandmarkPhoto(file);

      if (result.success) {
        const newPhoto = {
          url: result.url,
          filename: result.filename || file.name,
          uploadedAt: new Date().toISOString(),
          caption: `Uploaded on ${new Date().toLocaleString()}`
        };

        // Add photo to editData
        const updatedPhotos = [...(editData.photos || []), newPhoto];
        setEditData({
          ...editData,
          photos: updatedPhotos
        });

        // Save immediately to persist the photo
        await onSave({
          ...landmark,
          ...editData,
          photos: updatedPhotos
        });

        alert('Photo uploaded successfully!');
      } else {
        alert('Failed to upload photo: ' + (result.msg || 'Unknown error'));
      }
    } catch (error) {
      console.error('Error uploading photo:', error);
      alert('Failed to upload photo: ' + (error.response?.data?.msg || error.message));
    } finally {
      setUploadingPhoto(false);
    }
  };

  const getUrgencyColor = () => {
    const now = new Date();
    const endDate = new Date(editData.endDate);
    const daysUntilDeadline = Math.ceil((endDate - now) / (1000 * 60 * 60 * 24));

    if (editData.status === 'done') return '#10b981';
    if (daysUntilDeadline < 0) return '#dc2626';
    if (daysUntilDeadline <= editData.reminderDays) return '#f59e0b';
    if (editData.status === 'processing') return '#3b82f6';
    return '#6b7280';
  };

  if (!landmark) return null;

  return (
    <div className="person-detail-modal-overlay" onClick={onClose}>
      <div
        className="person-detail-modal-wrapper"
        onClick={(e) => e.stopPropagation()}
        style={{ maxWidth: '1000px', maxHeight: '90vh' }}
      >
        <div className="person-detail-modal">
          {/* Header */}
          <div className="person-detail-header" style={{
            background: `linear-gradient(135deg, ${getUrgencyColor()} 0%, ${getUrgencyColor()}dd 100%)`,
            padding: '24px',
            borderRadius: '12px 12px 0 0',
            color: 'white'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <div>
                <h2 style={{ margin: '0 0 8px 0', fontSize: '28px', fontWeight: '700' }}>
                  🚩 {landmark.title}
                </h2>
                <p style={{ margin: 0, opacity: 0.9, fontSize: '14px' }}>
                  Landmark Details
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
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
              {/* Left Column */}
              <div>
                {/* Basic Info */}
                <div className="person-detail-section">
                  <h3 className="person-detail-section-title">
                    <span className="person-detail-section-icon">ℹ️</span>
                    Basic Information
                  </h3>
                  <div className="person-detail-section-content">
                    <div className="person-detail-field">
                      <label>Title</label>
                      {isEditing ? (
                        <input
                          type="text"
                          value={editData.title}
                          onChange={(e) => setEditData({ ...editData, title: e.target.value })}
                          className="person-detail-input"
                        />
                      ) : (
                        <p>{landmark.title}</p>
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
                        <p>{landmark.description || 'No description provided'}</p>
                      )}
                    </div>

                    <div className="person-detail-field">
                      <label>Category</label>
                      {isEditing ? (
                        <select
                          value={editData.category}
                          onChange={(e) => setEditData({ ...editData, category: e.target.value })}
                          className="person-detail-input"
                        >
                          <option value="">Select Category</option>
                          <option value="Business">Business</option>
                          <option value="Personal">Personal</option>
                          <option value="Family">Family</option>
                          <option value="Spiritual">Spiritual</option>
                          <option value="Financial">Financial</option>
                          <option value="Infrastructure">Infrastructure</option>
                          <option value="Education">Education</option>
                          <option value="Health">Health</option>
                        </select>
                      ) : (
                        <p>{landmark.category || 'Not specified'}</p>
                      )}
                    </div>
                  </div>
                </div>

                {/* Timeline */}
                <div className="person-detail-section">
                  <h3 className="person-detail-section-title">
                    <span className="person-detail-section-icon">📅</span>
                    Timeline
                  </h3>
                  <div className="person-detail-section-content">
                    <div className="person-detail-field">
                      <label>Start Date & Time</label>
                      {isEditing ? (
                        <input
                          type="datetime-local"
                          value={editData.startDate}
                          onChange={(e) => setEditData({ ...editData, startDate: e.target.value })}
                          className="person-detail-input"
                        />
                      ) : (
                        <p>{new Date(landmark.startDate).toLocaleString()}</p>
                      )}
                    </div>

                    <div className="person-detail-field">
                      <label>End Date & Time (Deadline)</label>
                      {isEditing ? (
                        <input
                          type="datetime-local"
                          value={editData.endDate}
                          onChange={(e) => setEditData({ ...editData, endDate: e.target.value })}
                          className="person-detail-input"
                        />
                      ) : (
                        <p>{new Date(landmark.endDate).toLocaleString()}</p>
                      )}
                    </div>

                    <div className="person-detail-field">
                      <label>Reminder (Days Before Deadline)</label>
                      {isEditing ? (
                        <input
                          type="number"
                          value={editData.reminderDays}
                          onChange={(e) => setEditData({ ...editData, reminderDays: parseInt(e.target.value) })}
                          className="person-detail-input"
                          min="1"
                        />
                      ) : (
                        <p>{landmark.reminderDays || 7} days</p>
                      )}
                    </div>
                  </div>
                </div>

                {/* Budget & Payment */}
                <div className="person-detail-section">
                  <h3 className="person-detail-section-title">
                    <span className="person-detail-section-icon">💰</span>
                    Budget & Payment
                  </h3>
                  <div className="person-detail-section-content">
                    <div className="person-detail-field">
                      <label>Total Amount</label>
                      {isEditing ? (
                        <div style={{ display: 'flex', gap: '8px' }}>
                          <input
                            type="number"
                            value={editData.amount}
                            onChange={(e) => setEditData({ ...editData, amount: e.target.value })}
                            className="person-detail-input"
                            style={{ flex: 1 }}
                          />
                          <select
                            value={editData.currency}
                            onChange={(e) => setEditData({ ...editData, currency: e.target.value })}
                            className="person-detail-input"
                            style={{ width: '100px' }}
                          >
                            <option value="XAF">XAF</option>
                            <option value="USD">USD</option>
                            <option value="EUR">EUR</option>
                          </select>
                        </div>
                      ) : (
                        <p>{landmark.amount ? `${landmark.amount.toLocaleString()} ${landmark.currency}` : 'Not specified'}</p>
                      )}
                    </div>

                    <div className="person-detail-field">
                      <label>Amount Paid</label>
                      {isEditing ? (
                        <input
                          type="number"
                          value={editData.amountPaid}
                          onChange={(e) => setEditData({ ...editData, amountPaid: e.target.value })}
                          className="person-detail-input"
                        />
                      ) : (
                        <p>{landmark.amountPaid ? `${landmark.amountPaid.toLocaleString()} ${landmark.currency}` : '0'}</p>
                      )}
                    </div>

                    <div className="person-detail-field">
                      <label>Payment Status</label>
                      {isEditing ? (
                        <select
                          value={editData.paymentStatus}
                          onChange={(e) => setEditData({ ...editData, paymentStatus: e.target.value })}
                          className="person-detail-input"
                        >
                          <option value="pending">Pending</option>
                          <option value="paid">Paid</option>
                        </select>
                      ) : (
                        <p style={{
                          display: 'inline-block',
                          padding: '4px 12px',
                          borderRadius: '12px',
                          background: landmark.paymentStatus === 'paid' ? '#10b981' : '#f59e0b',
                          color: 'white',
                          fontSize: '12px',
                          fontWeight: '600'
                        }}>
                          {landmark.paymentStatus || 'pending'}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Column */}
              <div>
                {/* Status & Progress */}
                <div className="person-detail-section">
                  <h3 className="person-detail-section-title">
                    <span className="person-detail-section-icon">📊</span>
                    Status & Progress
                  </h3>
                  <div className="person-detail-section-content">
                    <div className="person-detail-field">
                      <label>Status</label>
                      {isEditing ? (
                        <select
                          value={editData.status}
                          onChange={(e) => setEditData({ ...editData, status: e.target.value })}
                          className="person-detail-input"
                        >
                          <option value="pending">Pending (Not Started)</option>
                          <option value="processing">Processing (In Progress)</option>
                          <option value="done">Done (Completed)</option>
                        </select>
                      ) : (
                        <p style={{
                          display: 'inline-block',
                          padding: '4px 12px',
                          borderRadius: '12px',
                          background: getUrgencyColor(),
                          color: 'white',
                          fontSize: '12px',
                          fontWeight: '600'
                        }}>
                          {landmark.status || 'pending'}
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
                        <p>{landmark.priority || 'medium'}</p>
                      )}
                    </div>

                    <div className="person-detail-field">
                      <label>Progress: {editData.progress}%</label>
                      {isEditing ? (
                        <input
                          type="range"
                          min="0"
                          max="100"
                          value={editData.progress}
                          onChange={(e) => setEditData({ ...editData, progress: parseInt(e.target.value) })}
                          style={{ width: '100%' }}
                        />
                      ) : (
                        <div style={{
                          width: '100%',
                          height: '8px',
                          background: '#374151',
                          borderRadius: '4px',
                          overflow: 'hidden'
                        }}>
                          <div
                            style={{
                              width: `${landmark.progress}%`,
                              height: '100%',
                              background: getUrgencyColor(),
                              transition: 'width 0.3s ease'
                            }}
                          ></div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Checklist */}
                <div className="person-detail-section">
                  <h3 className="person-detail-section-title">
                    <span className="person-detail-section-icon">✓</span>
                    Checklist ({editData.checklist.filter(item => item.completed).length}/{editData.checklist.length})
                  </h3>
                  <div className="person-detail-section-content">
                    {isEditing && (
                      <div style={{ marginBottom: '16px', display: 'flex', gap: '8px' }}>
                        <input
                          type="text"
                          value={newChecklistItem}
                          onChange={(e) => setNewChecklistItem(e.target.value)}
                          placeholder="Add new task..."
                          className="person-detail-input"
                          style={{ flex: 1 }}
                          onKeyPress={(e) => e.key === 'Enter' && handleAddChecklistItem()}
                        />
                        <button
                          onClick={handleAddChecklistItem}
                          className="person-detail-action-btn"
                          style={{ padding: '8px 16px' }}
                        >
                          Add
                        </button>
                      </div>
                    )}

                    {editData.checklist.length > 0 ? (
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                        {editData.checklist.map((item) => (
                          <div
                            key={item.id}
                            style={{
                              background: 'rgba(255, 255, 255, 0.05)',
                              padding: '12px',
                              borderRadius: '8px',
                              display: 'flex',
                              alignItems: 'center',
                              gap: '12px'
                            }}
                          >
                            <input
                              type="checkbox"
                              checked={item.completed}
                              onChange={() => handleToggleChecklistItem(item.id)}
                              disabled={!isEditing}
                              style={{ width: '18px', height: '18px', cursor: 'pointer' }}
                            />
                            <span style={{
                              flex: 1,
                              textDecoration: item.completed ? 'line-through' : 'none',
                              opacity: item.completed ? 0.6 : 1
                            }}>
                              {item.text || item.title}
                            </span>
                            {isEditing && (
                              <button
                                onClick={() => handleRemoveChecklistItem(item.id)}
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
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p style={{ color: '#9ca3af', fontStyle: 'italic' }}>
                        No tasks in checklist
                      </p>
                    )}
                  </div>
                </div>

                {/* Tags */}
                <div className="person-detail-section">
                  <h3 className="person-detail-section-title">
                    <span className="person-detail-section-icon">🏷️</span>
                    Tags
                  </h3>
                  <div className="person-detail-section-content">
                    {isEditing && (
                      <div style={{ marginBottom: '16px', display: 'flex', gap: '8px' }}>
                        <input
                          type="text"
                          value={newTag}
                          onChange={(e) => setNewTag(e.target.value)}
                          placeholder="Add tag..."
                          className="person-detail-input"
                          style={{ flex: 1 }}
                          onKeyPress={(e) => e.key === 'Enter' && handleAddTag()}
                        />
                        <button
                          onClick={handleAddTag}
                          className="person-detail-action-btn"
                          style={{ padding: '8px 16px' }}
                        >
                          Add
                        </button>
                      </div>
                    )}

                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                      {editData.tags.map((tag, index) => (
                        <div
                          key={index}
                          style={{
                            background: 'rgba(59, 130, 246, 0.2)',
                            color: '#60a5fa',
                            padding: '4px 12px',
                            borderRadius: '12px',
                            fontSize: '12px',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '6px'
                          }}
                        >
                          <span>{tag}</span>
                          {isEditing && (
                            <button
                              onClick={() => handleRemoveTag(tag)}
                              style={{
                                background: 'none',
                                border: 'none',
                                color: '#ef4444',
                                cursor: 'pointer',
                                fontSize: '16px',
                                padding: 0,
                                lineHeight: 1
                              }}
                            >
                              ×
                            </button>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Photos */}
                <div className="person-detail-section">
                  <h3 className="person-detail-section-title">
                    <span className="person-detail-section-icon">📷</span>
                    Photos
                  </h3>
                  <div className="person-detail-section-content">
                    {isEditing && (
                      <div style={{ marginBottom: '16px' }}>
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handlePhotoUpload}
                          disabled={uploadingPhoto}
                          style={{ display: 'none' }}
                          id="photo-upload"
                        />
                        <label
                          htmlFor="photo-upload"
                          className="person-detail-action-btn"
                          style={{
                            display: 'inline-block',
                            padding: '8px 16px',
                            cursor: uploadingPhoto ? 'not-allowed' : 'pointer',
                            opacity: uploadingPhoto ? 0.6 : 1
                          }}
                        >
                          {uploadingPhoto ? 'Uploading...' : '📤 Upload Photo'}
                        </label>
                      </div>
                    )}

                    {landmark.photos && landmark.photos.length > 0 ? (
                      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                        {landmark.photos.map((photo, index) => (
                          <div
                            key={index}
                            style={{
                              position: 'relative',
                              borderRadius: '8px',
                              overflow: 'hidden',
                              background: '#374151'
                            }}
                          >
                            <img
                              src={photo.url}
                              alt={photo.caption || 'Landmark photo'}
                              style={{
                                width: '100%',
                                height: '150px',
                                objectFit: 'cover'
                              }}
                            />
                            {photo.caption && (
                              <div style={{
                                position: 'absolute',
                                bottom: 0,
                                left: 0,
                                right: 0,
                                background: 'rgba(0, 0, 0, 0.7)',
                                color: 'white',
                                padding: '8px',
                                fontSize: '11px'
                              }}>
                                {photo.caption}
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p style={{ color: '#9ca3af', fontStyle: 'italic' }}>
                        No photos uploaded
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Notes - Full Width */}
            <div className="person-detail-section">
              <h3 className="person-detail-section-title">
                <span className="person-detail-section-icon">📝</span>
                Notes
              </h3>
              <div className="person-detail-section-content">
                {isEditing ? (
                  <textarea
                    value={editData.notes}
                    onChange={(e) => setEditData({ ...editData, notes: e.target.value })}
                    className="person-detail-textarea"
                    rows="6"
                    placeholder="Add any additional notes..."
                  />
                ) : (
                  <p>{landmark.notes || 'No notes'}</p>
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
                    background: `linear-gradient(135deg, ${getUrgencyColor()} 0%, ${getUrgencyColor()}dd 100%)`
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
                  background: `linear-gradient(135deg, ${getUrgencyColor()} 0%, ${getUrgencyColor()}dd 100%)`
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

export default LandmarkDetailModal;
