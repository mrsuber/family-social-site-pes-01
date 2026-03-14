import React, { useState, useRef } from 'react';
import './PersonDetailModal.css';
import {
  Close,
  Person,
  Email,
  Phone,
  Home,
  Language,
  Facebook as FacebookIcon,
  Instagram,
  WhatsApp,
  School,
  Favorite,
  Group,
  Warning,
  AttachFile,
  Chat,
  PhotoLibrary,
  CloudUpload,
  Event,
  Book,
  Delete,
  AttachMoney,
  People,
  Dashboard,
  TrendingUp
} from '@material-ui/icons';
import CommanderCalendar from './CommanderCalendar';
import CommanderDiary from './CommanderDiary';
import FinancialDashboard from './FinancialDashboard';
import ConnectionManager from './ConnectionManager';
import DailyOperations from './DailyOperations';
import {
  uploadProfilePhoto,
  uploadGalleryPhoto,
  deleteGalleryPhoto,
  uploadDocument,
  deleteDocument
} from '../../../utils/uploadUtils';

const PersonDetailModal = ({ person, onClose, onUpdate }) => {
  const [activeTab, setActiveTab] = useState('overview');
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState(person?.fullData || {});
  const [uploading, setUploading] = useState(false);
  const [photoGallery, setPhotoGallery] = useState(person?.fullData?.photoGallery || []);
  const [documents, setDocuments] = useState(person?.fullData?.documents || []);
  const [currentPerson, setCurrentPerson] = useState(person);

  const photoInputRef = useRef(null);
  const galleryInputRef = useRef(null);
  const documentInputRef = useRef(null);

  if (!person) return null;

  const fullData = person.fullData || {};
  const isCommander = person.relationshipType === 'high_commander' || fullData.relationshipType === 'high_commander';

  const baseTabs = [
    { id: 'overview', label: 'Overview', icon: <Person /> },
    { id: 'contact', label: 'Contact', icon: <Phone /> },
    { id: 'relationships', label: 'Relationships', icon: <Group /> },
    { id: 'education', label: 'Education & Interests', icon: <School /> },
    { id: 'problems', label: 'Problems & Notes', icon: <Warning /> },
    { id: 'documents', label: 'Documents', icon: <AttachFile /> },
    { id: 'gallery', label: 'Gallery', icon: <PhotoLibrary /> },
  ];

  // Add commander-specific tabs
  const commanderTabs = isCommander ? [
    { id: 'calendar', label: 'Calendar', icon: <Event /> },
    { id: 'diary', label: 'Diary', icon: <Book /> },
    { id: 'financial', label: 'Financial Command', icon: <AttachMoney /> },
    { id: 'connections', label: 'Network', icon: <People /> },
    { id: 'operations', label: 'Daily Ops', icon: <Dashboard /> },
  ] : [];

  const tabs = [...baseTabs, ...commanderTabs];

  const handleSave = async () => {
    // API call to update person
    if (onUpdate) {
      await onUpdate(editData);
    }

    // Update local person state with new values
    setCurrentPerson({
      ...currentPerson,
      label: editData.fullName || currentPerson.label,
      title: editData.title || currentPerson.title,
      fullData: {
        ...currentPerson.fullData,
        ...editData
      }
    });

    setIsEditing(false);
  };

  const handlePhotoUpload = async (e, type = 'profile') => {
    const file = e.target.files[0];
    if (!file) return;

    setUploading(true);
    try {
      if (type === 'profile') {
        const result = await uploadProfilePhoto(fullData.id, file);
        alert('Profile photo uploaded successfully!');
        window.location.reload(); // Refresh to show new photo
      } else if (type === 'gallery') {
        const result = await uploadGalleryPhoto(fullData.id, file);
        setPhotoGallery(result.gallery);
        alert('Photo added to gallery!');
      }
    } catch (err) {
      alert('Upload failed: ' + (err.response?.data?.msg || err.message));
    } finally {
      setUploading(false);
      if (photoInputRef.current) photoInputRef.current.value = '';
      if (galleryInputRef.current) galleryInputRef.current.value = '';
    }
  };

  const handleDeleteGalleryPhoto = async (photoUrl) => {
    if (!window.confirm('Delete this photo?')) return;

    try {
      const result = await deleteGalleryPhoto(fullData.id, photoUrl);
      setPhotoGallery(result.gallery);
      alert('Photo deleted!');
    } catch (err) {
      alert('Delete failed: ' + (err.response?.data?.msg || err.message));
    }
  };

  const handleDocumentUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setUploading(true);
    try {
      const result = await uploadDocument(fullData.id, file);
      setDocuments(result.documents);
      alert('Document uploaded successfully!');
    } catch (err) {
      alert('Upload failed: ' + (err.response?.data?.msg || err.message));
    } finally {
      setUploading(false);
      if (documentInputRef.current) documentInputRef.current.value = '';
    }
  };

  const handleDeleteDocument = async (documentUrl) => {
    if (!window.confirm('Delete this document?')) return;

    try {
      const result = await deleteDocument(fullData.id, documentUrl);
      setDocuments(result.documents);
      alert('Document deleted!');
    } catch (err) {
      alert('Delete failed: ' + (err.response?.data?.msg || err.message));
    }
  };

  const formatRelationshipType = (type) => {
    if (!type) return 'Not specified';
    return type.replace(/_/g, ' ').toUpperCase();
  };

  const getStatusBadge = (status) => {
    switch(status) {
      case 'acquired':
        return <span className="status-badge acquired">✅ Acquired</span>;
      case 'target':
        return <span className="status-badge target">🎯 Target</span>;
      case 'evaluating':
        return <span className="status-badge evaluating">🔍 Evaluating</span>;
      default:
        return <span className="status-badge">{status}</span>;
    }
  };

  return (
    <div className="person-modal-overlay" onClick={onClose}>
      <div className="person-modal" onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className="person-modal-header">
          <div className="person-header-left">
            <div className="person-header-avatar">
              {person.photo ? (
                <img src={person.photo} alt={person.label} />
              ) : (
                <div className="avatar-placeholder-xl">{person.label?.charAt(0)}</div>
              )}
              <input
                type="file"
                ref={photoInputRef}
                style={{ display: 'none' }}
                accept="image/*"
                onChange={(e) => handlePhotoUpload(e, 'profile')}
              />
              <button
                className="avatar-upload-btn"
                title="Upload Photo"
                onClick={() => photoInputRef.current?.click()}
                disabled={uploading}
              >
                <CloudUpload />
              </button>
            </div>
            <div className="person-header-info">
              {isEditing ? (
                <>
                  <input
                    type="text"
                    className="edit-name-input"
                    value={editData.fullName || currentPerson.label}
                    onChange={(e) => setEditData({ ...editData, fullName: e.target.value })}
                    placeholder="Full Name"
                  />
                  <input
                    type="text"
                    className="edit-title-input"
                    value={editData.title || currentPerson.title || ''}
                    onChange={(e) => setEditData({ ...editData, title: e.target.value })}
                    placeholder="Title/Role"
                  />
                </>
              ) : (
                <>
                  <h2>{currentPerson.label}</h2>
                  <p className="person-header-title">{currentPerson.title || 'No title'}</p>
                </>
              )}
              <div className="person-header-meta">
                <span className="relationship-badge">
                  {formatRelationshipType(person.relationshipType)}
                </span>
                {getStatusBadge(fullData.status)}
                {fullData.assignmentStatus === 'personal_circle' && (
                  <span className="assignment-badge personal">👤 Personal Circle</span>
                )}
                {fullData.assignmentStatus === 'assigned' && fullData.generalId && (
                  <span className="assignment-badge assigned">📋 Assigned</span>
                )}
              </div>
            </div>
          </div>
          <div className="person-header-actions">
            {isEditing ? (
              <>
                <button className="btn-save" onClick={handleSave}>Save</button>
                <button className="btn-cancel" onClick={() => setIsEditing(false)}>Cancel</button>
              </>
            ) : (
              <button className="btn-edit" onClick={() => setIsEditing(true)}>Edit</button>
            )}
            <button className="btn-close" onClick={onClose}>
              <Close />
            </button>
          </div>
        </div>

        {/* Tabs */}
        <div className="person-modal-tabs">
          {tabs.map(tab => (
            <button
              key={tab.id}
              className={`tab-btn ${activeTab === tab.id ? 'active' : ''}`}
              onClick={() => setActiveTab(tab.id)}
            >
              {tab.icon}
              <span>{tab.label}</span>
            </button>
          ))}
        </div>

        {/* Content */}
        <div className="person-modal-content">
          {activeTab === 'overview' && (
            <div className="tab-content">
              <section className="content-section">
                <h3>Biography</h3>
                {isEditing ? (
                  <textarea
                    value={editData.bio || ''}
                    onChange={(e) => setEditData({...editData, bio: e.target.value})}
                    placeholder="Write biography..."
                    rows={4}
                  />
                ) : (
                  <p>{fullData.bio || 'No biography available'}</p>
                )}
              </section>

              <section className="content-section">
                <h3>Performance Rating</h3>
                {person.performanceRating ? (
                  <div className="performance-display">
                    <div className="performance-bar-xl">
                      <div
                        className="performance-fill-xl"
                        style={{
                          width: `${person.performanceRating}%`,
                          background: person.performanceRating >= 80 ? '#10b981'
                            : person.performanceRating >= 60 ? '#f59e0b' : '#ef4444',
                        }}
                      >
                        <span>{person.performanceRating}%</span>
                      </div>
                    </div>
                    <p className="performance-label">
                      {person.performanceRating >= 80 ? 'Excellent' :
                       person.performanceRating >= 60 ? 'Good' : 'Needs Improvement'}
                    </p>
                  </div>
                ) : (
                  <p>No rating yet</p>
                )}
              </section>

              <section className="content-section">
                <h3>Strategic Goal</h3>
                {isEditing ? (
                  <textarea
                    value={editData.strategicGoal || ''}
                    onChange={(e) => setEditData({...editData, strategicGoal: e.target.value})}
                    placeholder="How this person contributes to the mission..."
                    rows={3}
                  />
                ) : (
                  <p>{fullData.strategicGoal || 'Not defined'}</p>
                )}
              </section>

              <section className="content-section">
                <h3>Location</h3>
                <p>{fullData.location || 'Not specified'}</p>
                {fullData.physicalAddress && (
                  <p className="address-detail">{fullData.physicalAddress}</p>
                )}
              </section>
            </div>
          )}

          {activeTab === 'contact' && (
            <div className="tab-content">
              <section className="content-section">
                <h3><Email /> Email</h3>
                {isEditing ? (
                  <input
                    type="email"
                    value={editData.email || ''}
                    onChange={(e) => setEditData({...editData, email: e.target.value})}
                    placeholder="email@example.com"
                  />
                ) : (
                  <p>{fullData.email || 'Not available'}</p>
                )}
              </section>

              <section className="content-section">
                <h3><Phone /> Phone</h3>
                {isEditing ? (
                  <input
                    type="tel"
                    value={editData.phone || ''}
                    onChange={(e) => setEditData({...editData, phone: e.target.value})}
                    placeholder="+237 XXX XXX XXX"
                  />
                ) : (
                  <p>{fullData.phone || 'Not available'}</p>
                )}
              </section>

              <section className="content-section">
                <h3><WhatsApp /> WhatsApp</h3>
                {isEditing ? (
                  <input
                    type="tel"
                    value={editData.whatsapp || ''}
                    onChange={(e) => setEditData({...editData, whatsapp: e.target.value})}
                    placeholder="+237 XXX XXX XXX"
                  />
                ) : (
                  <p>{fullData.whatsapp || 'Not available'}</p>
                )}
              </section>

              <section className="content-section">
                <h3><Language /> Website</h3>
                {isEditing ? (
                  <input
                    type="url"
                    value={editData.website || ''}
                    onChange={(e) => setEditData({...editData, website: e.target.value})}
                    placeholder="https://"
                  />
                ) : (
                  <p>{fullData.website ? <a href={fullData.website} target="_blank" rel="noopener noreferrer">{fullData.website}</a> : 'Not available'}</p>
                )}
              </section>

              <section className="content-section">
                <h3>Social Media</h3>
                <div className="social-links">
                  <div className="social-link">
                    <FacebookIcon />
                    {isEditing ? (
                      <input
                        type="text"
                        value={editData.facebook || ''}
                        onChange={(e) => setEditData({...editData, facebook: e.target.value})}
                        placeholder="Facebook profile"
                      />
                    ) : (
                      <span>{fullData.facebook || 'Not linked'}</span>
                    )}
                  </div>
                  <div className="social-link">
                    <Instagram />
                    {isEditing ? (
                      <input
                        type="text"
                        value={editData.instagram || ''}
                        onChange={(e) => setEditData({...editData, instagram: e.target.value})}
                        placeholder="Instagram handle"
                      />
                    ) : (
                      <span>{fullData.instagram || 'Not linked'}</span>
                    )}
                  </div>
                  <div className="social-link">
                    <span>LinkedIn</span>
                    {isEditing ? (
                      <input
                        type="text"
                        value={editData.linkedin || ''}
                        onChange={(e) => setEditData({...editData, linkedin: e.target.value})}
                        placeholder="LinkedIn profile"
                      />
                    ) : (
                      <span>{fullData.linkedin || 'Not linked'}</span>
                    )}
                  </div>
                </div>
              </section>
            </div>
          )}

          {activeTab === 'relationships' && (
            <div className="tab-content">
              <section className="content-section">
                <h3><Favorite /> Marital Status</h3>
                <p>{fullData.maritalStatus || 'Not specified'}</p>
                {fullData.childrenCount > 0 && (
                  <p>Children: {fullData.childrenCount} {fullData.hasTwins && '(includes twins)'}</p>
                )}
              </section>

              <section className="content-section">
                <h3><Group /> Related People</h3>
                {fullData.relatedPeople && fullData.relatedPeople.length > 0 ? (
                  <ul className="related-people-list">
                    {fullData.relatedPeople.map((rel, idx) => (
                      <li key={idx}>
                        {rel.name} - {rel.relationship}
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p>No relationships documented</p>
                )}
              </section>

              <section className="content-section">
                <h3><Chat /> Chat History</h3>
                {fullData.chatTranscripts && fullData.chatTranscripts.length > 0 ? (
                  <div className="chat-list">
                    {fullData.chatTranscripts.map((chat, idx) => (
                      <div key={idx} className="chat-item">
                        <span>{chat.date}</span>
                        <a href={chat.url} target="_blank" rel="noopener noreferrer">View Transcript</a>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p>No chat history</p>
                )}
              </section>
            </div>
          )}

          {activeTab === 'education' && (
            <div className="tab-content">
              <section className="content-section">
                <h3><School /> Education Level</h3>
                {isEditing ? (
                  <select
                    value={editData.educationLevel || ''}
                    onChange={(e) => setEditData({...editData, educationLevel: e.target.value})}
                  >
                    <option value="">Select education level</option>
                    <option value="high_school">High School</option>
                    <option value="bachelors">Bachelor's Degree</option>
                    <option value="masters">Master's Degree</option>
                    <option value="phd">PhD/Doctorate</option>
                    <option value="other">Other</option>
                  </select>
                ) : (
                  <p>{fullData.educationLevel || 'Not specified'}</p>
                )}
              </section>

              <section className="content-section">
                <h3>Interests & Loves</h3>
                {isEditing ? (
                  <textarea
                    value={editData.interests || ''}
                    onChange={(e) => setEditData({...editData, interests: e.target.value})}
                    placeholder="What they love, hobbies, passions..."
                    rows={4}
                  />
                ) : (
                  <p>{fullData.interests || 'Not documented'}</p>
                )}
              </section>
            </div>
          )}

          {activeTab === 'problems' && (
            <div className="tab-content">
              <section className="content-section">
                <h3><Warning /> Problems & Challenges</h3>
                {isEditing ? (
                  <textarea
                    value={editData.problems || ''}
                    onChange={(e) => setEditData({...editData, problems: e.target.value})}
                    placeholder="Current problems, challenges they face..."
                    rows={4}
                  />
                ) : (
                  <p>{fullData.problems || 'No problems documented'}</p>
                )}
              </section>

              <section className="content-section">
                <h3>Private Notes</h3>
                {isEditing ? (
                  <textarea
                    value={editData.notes || ''}
                    onChange={(e) => setEditData({...editData, notes: e.target.value})}
                    placeholder="Private notes about this person..."
                    rows={4}
                  />
                ) : (
                  <p>{fullData.notes || 'No notes'}</p>
                )}
              </section>
            </div>
          )}

          {activeTab === 'documents' && (
            <div className="tab-content">
              <section className="content-section">
                <h3><AttachFile /> Documents & Contracts</h3>
                <input
                  type="file"
                  ref={documentInputRef}
                  style={{ display: 'none' }}
                  accept=".pdf,.doc,.docx"
                  onChange={handleDocumentUpload}
                />
                {documents && documents.length > 0 ? (
                  <>
                    <div className="documents-list">
                      {documents.map((doc, idx) => (
                        <div key={idx} className="document-item">
                          <AttachFile />
                          <a href={doc.url} target="_blank" rel="noopener noreferrer">
                            {doc.name}
                          </a>
                          <span className="doc-date">{new Date(doc.uploadedAt).toLocaleDateString()}</span>
                          <button
                            className="btn-delete-item"
                            onClick={() => handleDeleteDocument(doc.url)}
                            title="Delete document"
                          >
                            <Delete />
                          </button>
                        </div>
                      ))}
                    </div>
                    <button
                      className="btn-upload"
                      onClick={() => documentInputRef.current?.click()}
                      disabled={uploading}
                    >
                      <CloudUpload /> {uploading ? 'Uploading...' : 'Upload Another Document'}
                    </button>
                  </>
                ) : (
                  <div className="upload-area">
                    <CloudUpload />
                    <p>No documents uploaded</p>
                    <button
                      className="btn-upload"
                      onClick={() => documentInputRef.current?.click()}
                      disabled={uploading}
                    >
                      {uploading ? 'Uploading...' : 'Upload Document'}
                    </button>
                  </div>
                )}
              </section>
            </div>
          )}

          {activeTab === 'gallery' && (
            <div className="tab-content">
              <section className="content-section">
                <h3><PhotoLibrary /> Photo Gallery</h3>
                <input
                  type="file"
                  ref={galleryInputRef}
                  style={{ display: 'none' }}
                  accept="image/*"
                  onChange={(e) => handlePhotoUpload(e, 'gallery')}
                />
                {photoGallery && photoGallery.length > 0 ? (
                  <>
                    <div className="photo-gallery">
                      {photoGallery.map((photo, idx) => (
                        <div key={idx} className="gallery-item">
                          <img src={photo.url} alt={`Gallery ${idx + 1}`} />
                          <button
                            className="btn-delete-gallery"
                            onClick={() => handleDeleteGalleryPhoto(photo.url)}
                            title="Delete photo"
                          >
                            <Delete />
                          </button>
                        </div>
                      ))}
                    </div>
                    <button
                      className="btn-upload"
                      onClick={() => galleryInputRef.current?.click()}
                      disabled={uploading}
                    >
                      <CloudUpload /> {uploading ? 'Uploading...' : 'Upload More Photos'}
                    </button>
                  </>
                ) : (
                  <div className="upload-area">
                    <PhotoLibrary />
                    <p>No photos in gallery</p>
                    <button
                      className="btn-upload"
                      onClick={() => galleryInputRef.current?.click()}
                      disabled={uploading}
                    >
                      {uploading ? 'Uploading...' : 'Upload Photos'}
                    </button>
                  </div>
                )}
              </section>
            </div>
          )}

          {activeTab === 'calendar' && isCommander && (
            <div className="tab-content tab-fullheight">
              <CommanderCalendar personId={fullData.id} />
            </div>
          )}

          {activeTab === 'diary' && isCommander && (
            <div className="tab-content tab-fullheight">
              <CommanderDiary personId={fullData.id} />
            </div>
          )}

          {activeTab === 'financial' && isCommander && (
            <div className="tab-content tab-fullheight">
              <FinancialDashboard personId={fullData.id} />
            </div>
          )}

          {activeTab === 'connections' && isCommander && (
            <div className="tab-content tab-fullheight">
              <ConnectionManager personId={fullData.id} />
            </div>
          )}

          {activeTab === 'operations' && isCommander && (
            <div className="tab-content tab-fullheight">
              <DailyOperations personId={fullData.id} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PersonDetailModal;
