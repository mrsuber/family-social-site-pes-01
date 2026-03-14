import React, { useState, useEffect } from 'react';
import './ConnectionManager.css';
import { getAPI, postAPI, putAPI, deleteAPI } from '../../../utils/fetchData';
import {
  Add,
  Edit,
  Delete,
  PersonAdd,
  Chat,
  CardGiftcard,
  CalendarToday,
  Phone,
  Email,
  LinkedIn,
  Warning,
  TrendingUp,
  People as PeopleIcon
} from '@material-ui/icons';

const ConnectionManager = ({ personId }) => {
  const [connections, setConnections] = useState([]);
  const [selectedConnection, setSelectedConnection] = useState(null);
  const [conversations, setConversations] = useState([]);
  const [gifts, setGifts] = useState([]);
  const [loading, setLoading] = useState(true);

  // Form states
  const [showConnectionForm, setShowConnectionForm] = useState(false);
  const [showConversationForm, setShowConversationForm] = useState(false);
  const [showGiftForm, setShowGiftForm] = useState(false);
  const [editingConnection, setEditingConnection] = useState(null);
  const [editingConversation, setEditingConversation] = useState(null);
  const [editingGift, setEditingGift] = useState(null);

  // Connection form data
  const [connectionForm, setConnectionForm] = useState({
    contactName: '',
    email: '',
    phone: '',
    linkedIn: '',
    relationshipType: 'professional',
    relationshipStrength: 'weak',
    tags: '',
    lastContactDate: '',
    outreachFrequency: 'monthly',
    notes: ''
  });

  // Conversation form data
  const [conversationForm, setConversationForm] = useState({
    date: '',
    channel: 'in_person',
    summary: '',
    actionItems: '',
    sentiment: 'positive'
  });

  // Gift form data
  const [giftForm, setGiftForm] = useState({
    giftType: 'given',
    giftName: '',
    date: '',
    estimatedValue: '',
    occasion: '',
    notes: ''
  });

  useEffect(() => {
    fetchConnections();
  }, [personId]);

  useEffect(() => {
    if (selectedConnection) {
      fetchConversationsAndGifts(selectedConnection.id);
    }
  }, [selectedConnection]);

  const fetchConnections = async () => {
    try {
      setLoading(true);
      const res = await getAPI(`connections/connections/${personId}`);
      // Ensure we always set an array, even if the response is an error
      if (res.data && res.data.success && Array.isArray(res.data.data)) {
        setConnections(res.data.data);
      } else {
        setConnections([]);
      }
    } catch (err) {
      console.error('Error fetching connections:', err);
      setConnections([]);
    } finally {
      setLoading(false);
    }
  };

  const fetchConversationsAndGifts = async (connectionId) => {
    try {
      const [convRes, giftRes] = await Promise.all([
        getAPI(`connections/conversations/${connectionId}`),
        getAPI(`connections/gifts/${connectionId}`)
      ]);
      // Ensure we always set arrays
      setConversations(convRes.data && convRes.data.success && Array.isArray(convRes.data.data) ? convRes.data.data : []);
      setGifts(giftRes.data && giftRes.data.success && Array.isArray(giftRes.data.data) ? giftRes.data.data : []);
    } catch (err) {
      console.error('Error fetching conversations/gifts:', err);
      setConversations([]);
      setGifts([]);
    }
  };

  // Connection CRUD
  const handleCreateConnection = async () => {
    try {
      const payload = {
        ...connectionForm,
        personId,
        tags: connectionForm.tags.split(',').map(t => t.trim()).filter(Boolean)
      };
      await postAPI('connections/connections', payload);
      setShowConnectionForm(false);
      resetConnectionForm();
      fetchConnections();
    } catch (err) {
      alert('Failed to create connection: ' + (err.response?.data?.msg || err.message));
    }
  };

  const handleUpdateConnection = async () => {
    try {
      const payload = {
        ...connectionForm,
        tags: connectionForm.tags.split(',').map(t => t.trim()).filter(Boolean)
      };
      await putAPI(`connections/connections/${editingConnection.id}`, payload);
      setShowConnectionForm(false);
      setEditingConnection(null);
      resetConnectionForm();
      fetchConnections();
      if (selectedConnection && selectedConnection.id === editingConnection.id) {
        setSelectedConnection(null);
      }
    } catch (err) {
      alert('Failed to update connection: ' + (err.response?.data?.msg || err.message));
    }
  };

  const handleDeleteConnection = async (id) => {
    if (!window.confirm('Delete this connection? This will also delete all conversations and gifts.')) return;
    try {
      await deleteAPI(`connections/connections/${id}`);
      fetchConnections();
      if (selectedConnection && selectedConnection.id === id) {
        setSelectedConnection(null);
      }
    } catch (err) {
      alert('Failed to delete: ' + (err.response?.data?.msg || err.message));
    }
  };

  // Conversation CRUD
  const handleCreateConversation = async () => {
    try {
      const payload = {
        ...conversationForm,
        connectionId: selectedConnection.id,
        actionItems: conversationForm.actionItems.split('\n').filter(Boolean)
      };
      await postAPI('connections/conversations', payload);
      setShowConversationForm(false);
      resetConversationForm();
      fetchConversationsAndGifts(selectedConnection.id);
    } catch (err) {
      alert('Failed to create conversation: ' + (err.response?.data?.msg || err.message));
    }
  };

  const handleUpdateConversation = async () => {
    try {
      const payload = {
        ...conversationForm,
        actionItems: conversationForm.actionItems.split('\n').filter(Boolean)
      };
      await putAPI(`connections/conversations/${editingConversation.id}`, payload);
      setShowConversationForm(false);
      setEditingConversation(null);
      resetConversationForm();
      fetchConversationsAndGifts(selectedConnection.id);
    } catch (err) {
      alert('Failed to update conversation: ' + (err.response?.data?.msg || err.message));
    }
  };

  const handleDeleteConversation = async (id) => {
    if (!window.confirm('Delete this conversation?')) return;
    try {
      await deleteAPI(`connections/conversations/${id}`);
      fetchConversationsAndGifts(selectedConnection.id);
    } catch (err) {
      alert('Failed to delete: ' + (err.response?.data?.msg || err.message));
    }
  };

  // Gift CRUD
  const handleCreateGift = async () => {
    try {
      const payload = {
        ...giftForm,
        connectionId: selectedConnection.id
      };
      await postAPI('connections/gifts', payload);
      setShowGiftForm(false);
      resetGiftForm();
      fetchConversationsAndGifts(selectedConnection.id);
    } catch (err) {
      alert('Failed to create gift: ' + (err.response?.data?.msg || err.message));
    }
  };

  const handleUpdateGift = async () => {
    try {
      await putAPI(`connections/gifts/${editingGift.id}`, giftForm);
      setShowGiftForm(false);
      setEditingGift(null);
      resetGiftForm();
      fetchConversationsAndGifts(selectedConnection.id);
    } catch (err) {
      alert('Failed to update gift: ' + (err.response?.data?.msg || err.message));
    }
  };

  const handleDeleteGift = async (id) => {
    if (!window.confirm('Delete this gift record?')) return;
    try {
      await deleteAPI(`connections/gifts/${id}`);
      fetchConversationsAndGifts(selectedConnection.id);
    } catch (err) {
      alert('Failed to delete: ' + (err.response?.data?.msg || err.message));
    }
  };

  // Form helpers
  const resetConnectionForm = () => {
    setConnectionForm({
      contactName: '',
      email: '',
      phone: '',
      linkedIn: '',
      relationshipType: 'professional',
      relationshipStrength: 'weak',
      tags: '',
      lastContactDate: '',
      outreachFrequency: 'monthly',
      notes: ''
    });
  };

  const resetConversationForm = () => {
    setConversationForm({
      date: '',
      channel: 'in_person',
      summary: '',
      actionItems: '',
      sentiment: 'positive'
    });
  };

  const resetGiftForm = () => {
    setGiftForm({
      giftType: 'given',
      giftName: '',
      date: '',
      estimatedValue: '',
      occasion: '',
      notes: ''
    });
  };

  const openEditConnection = (conn) => {
    setEditingConnection(conn);
    setConnectionForm({
      contactName: conn.contactName || '',
      email: conn.email || '',
      phone: conn.phone || '',
      linkedIn: conn.linkedIn || '',
      relationshipType: conn.relationshipType || 'professional',
      relationshipStrength: conn.relationshipStrength || 'weak',
      tags: (conn.tags || []).join(', '),
      lastContactDate: conn.lastContactDate || '',
      outreachFrequency: conn.outreachFrequency || 'monthly',
      notes: conn.notes || ''
    });
    setShowConnectionForm(true);
  };

  const openEditConversation = (conv) => {
    setEditingConversation(conv);
    setConversationForm({
      date: conv.date || '',
      channel: conv.channel || 'in_person',
      summary: conv.summary || '',
      actionItems: (conv.actionItems || []).join('\n'),
      sentiment: conv.sentiment || 'positive'
    });
    setShowConversationForm(true);
  };

  const openEditGift = (gift) => {
    setEditingGift(gift);
    setGiftForm({
      giftType: gift.giftType || 'given',
      giftName: gift.giftName || '',
      date: gift.date || '',
      estimatedValue: gift.estimatedValue || '',
      occasion: gift.occasion || '',
      notes: gift.notes || ''
    });
    setShowGiftForm(true);
  };

  // Get connections needing outreach
  const needsOutreach = connections.filter(conn => {
    if (!conn.nextOutreachDate) return false;
    return new Date(conn.nextOutreachDate) <= new Date();
  });

  const getStrengthColor = (strength) => {
    switch (strength) {
      case 'very_strong': return '#10b981';
      case 'strong': return '#3b82f6';
      case 'moderate': return '#f59e0b';
      case 'weak': return '#6b7280';
      default: return '#6b7280';
    }
  };

  if (loading) {
    return <div className="connection-manager"><p>Loading connections...</p></div>;
  }

  return (
    <div className="connection-manager">
      {/* Header */}
      <div className="manager-header">
        <div>
          <h2>Network Manager</h2>
          <p className="header-subtitle">
            {connections.length} connections
            {needsOutreach.length > 0 && (
              <span className="outreach-badge">
                <Warning /> {needsOutreach.length} need outreach
              </span>
            )}
          </p>
        </div>
        <button className="btn-add" onClick={() => setShowConnectionForm(true)}>
          <PersonAdd /> Add Connection
        </button>
      </div>

      <div className="manager-layout">
        {/* Connections List */}
        <div className="connections-panel">
          <h3>Connections</h3>
          <div className="connections-list">
            {connections.map(conn => {
              const needsOutreachNow = conn.nextOutreachDate && new Date(conn.nextOutreachDate) <= new Date();
              return (
                <div
                  key={conn.id}
                  className={`connection-item ${selectedConnection?.id === conn.id ? 'active' : ''} ${needsOutreachNow ? 'needs-outreach' : ''}`}
                  onClick={() => setSelectedConnection(conn)}
                >
                  <div className="connection-main">
                    <h4>{conn.contactName}</h4>
                    <div className="connection-meta">
                      <span
                        className="strength-indicator"
                        style={{ backgroundColor: getStrengthColor(conn.relationshipStrength) }}
                      >
                        {conn.relationshipStrength?.replace('_', ' ')}
                      </span>
                      <span className="relationship-type">{conn.relationshipType}</span>
                    </div>
                    {conn.tags && conn.tags.length > 0 && (
                      <div className="connection-tags">
                        {conn.tags.map((tag, idx) => (
                          <span key={idx} className="tag">{tag}</span>
                        ))}
                      </div>
                    )}
                    {needsOutreachNow && (
                      <div className="outreach-warning">
                        <Warning /> Outreach due {new Date(conn.nextOutreachDate).toLocaleDateString()}
                      </div>
                    )}
                  </div>
                  <div className="connection-actions">
                    <button className="btn-icon" onClick={(e) => { e.stopPropagation(); openEditConnection(conn); }}>
                      <Edit />
                    </button>
                    <button className="btn-icon btn-delete" onClick={(e) => { e.stopPropagation(); handleDeleteConnection(conn.id); }}>
                      <Delete />
                    </button>
                  </div>
                </div>
              );
            })}
            {connections.length === 0 && (
              <div className="empty-state">
                <PeopleIcon style={{ fontSize: 48, opacity: 0.3 }} />
                <p>No connections yet</p>
                <button className="btn-add" onClick={() => setShowConnectionForm(true)}>
                  <PersonAdd /> Add Your First Connection
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Details Panel */}
        {selectedConnection && (
          <div className="details-panel">
            <div className="details-header">
              <h3>{selectedConnection.contactName}</h3>
              <div className="contact-links">
                {selectedConnection.email && (
                  <a href={`mailto:${selectedConnection.email}`} className="contact-link">
                    <Email /> Email
                  </a>
                )}
                {selectedConnection.phone && (
                  <a href={`tel:${selectedConnection.phone}`} className="contact-link">
                    <Phone /> Call
                  </a>
                )}
                {selectedConnection.linkedIn && (
                  <a href={selectedConnection.linkedIn} target="_blank" rel="noopener noreferrer" className="contact-link">
                    <LinkedIn /> LinkedIn
                  </a>
                )}
              </div>
            </div>

            {selectedConnection.notes && (
              <div className="notes-section">
                <strong>Notes:</strong>
                <p>{selectedConnection.notes}</p>
              </div>
            )}

            {/* Conversations */}
            <div className="detail-section">
              <div className="section-header">
                <h4><Chat /> Conversations</h4>
                <button className="btn-add-small" onClick={() => setShowConversationForm(true)}>
                  <Add /> Add
                </button>
              </div>
              <div className="items-list">
                {conversations.map(conv => (
                  <div key={conv.id} className={`conversation-card sentiment-${conv.sentiment}`}>
                    <div className="conversation-header">
                      <span className="conv-date">{new Date(conv.date).toLocaleDateString()}</span>
                      <span className={`conv-channel channel-${conv.channel}`}>{conv.channel.replace('_', ' ')}</span>
                    </div>
                    <p className="conv-summary">{conv.summary}</p>
                    {conv.actionItems && conv.actionItems.length > 0 && (
                      <ul className="action-items">
                        {conv.actionItems.map((item, idx) => (
                          <li key={idx}>{item}</li>
                        ))}
                      </ul>
                    )}
                    <div className="conversation-actions">
                      <button className="btn-icon" onClick={() => openEditConversation(conv)}>
                        <Edit />
                      </button>
                      <button className="btn-icon btn-delete" onClick={() => handleDeleteConversation(conv.id)}>
                        <Delete />
                      </button>
                    </div>
                  </div>
                ))}
                {conversations.length === 0 && (
                  <p className="empty-message">No conversations logged yet</p>
                )}
              </div>
            </div>

            {/* Gifts */}
            <div className="detail-section">
              <div className="section-header">
                <h4><CardGiftcard /> Gifts</h4>
                <button className="btn-add-small" onClick={() => setShowGiftForm(true)}>
                  <Add /> Add
                </button>
              </div>
              <div className="items-list">
                {gifts.map(gift => (
                  <div key={gift.id} className={`gift-card gift-${gift.giftType}`}>
                    <div className="gift-header">
                      <strong>{gift.giftName}</strong>
                      <span className="gift-type">{gift.giftType}</span>
                    </div>
                    <div className="gift-meta">
                      <span>{new Date(gift.date).toLocaleDateString()}</span>
                      {gift.estimatedValue && <span>${parseFloat(gift.estimatedValue).toFixed(2)}</span>}
                      {gift.occasion && <span>{gift.occasion}</span>}
                    </div>
                    {gift.notes && <p className="gift-notes">{gift.notes}</p>}
                    <div className="gift-actions">
                      <button className="btn-icon" onClick={() => openEditGift(gift)}>
                        <Edit />
                      </button>
                      <button className="btn-icon btn-delete" onClick={() => handleDeleteGift(gift.id)}>
                        <Delete />
                      </button>
                    </div>
                  </div>
                ))}
                {gifts.length === 0 && (
                  <p className="empty-message">No gifts tracked yet</p>
                )}
              </div>
            </div>
          </div>
        )}

        {!selectedConnection && connections.length > 0 && (
          <div className="details-panel empty-details">
            <PeopleIcon style={{ fontSize: 64, opacity: 0.2, marginBottom: 16 }} />
            <p>Select a connection to view details</p>
          </div>
        )}
      </div>

      {/* Connection Form */}
      {showConnectionForm && (
        <div className="form-overlay" onClick={() => { setShowConnectionForm(false); setEditingConnection(null); resetConnectionForm(); }}>
          <div className="connection-form" onClick={(e) => e.stopPropagation()}>
            <h4>{editingConnection ? 'Edit Connection' : 'New Connection'}</h4>

            <input
              type="text"
              placeholder="Contact Name *"
              value={connectionForm.contactName}
              onChange={(e) => setConnectionForm({ ...connectionForm, contactName: e.target.value })}
            />

            <div className="form-row">
              <input
                type="email"
                placeholder="Email"
                value={connectionForm.email}
                onChange={(e) => setConnectionForm({ ...connectionForm, email: e.target.value })}
              />
              <input
                type="tel"
                placeholder="Phone"
                value={connectionForm.phone}
                onChange={(e) => setConnectionForm({ ...connectionForm, phone: e.target.value })}
              />
            </div>

            <input
              type="url"
              placeholder="LinkedIn URL"
              value={connectionForm.linkedIn}
              onChange={(e) => setConnectionForm({ ...connectionForm, linkedIn: e.target.value })}
            />

            <div className="form-row">
              <select
                value={connectionForm.relationshipType}
                onChange={(e) => setConnectionForm({ ...connectionForm, relationshipType: e.target.value })}
              >
                <option value="professional">Professional</option>
                <option value="personal">Personal</option>
                <option value="mentor">Mentor</option>
                <option value="mentee">Mentee</option>
                <option value="client">Client</option>
                <option value="partner">Partner</option>
              </select>

              <select
                value={connectionForm.relationshipStrength}
                onChange={(e) => setConnectionForm({ ...connectionForm, relationshipStrength: e.target.value })}
              >
                <option value="weak">Weak</option>
                <option value="moderate">Moderate</option>
                <option value="strong">Strong</option>
                <option value="very_strong">Very Strong</option>
              </select>
            </div>

            <input
              type="text"
              placeholder="Tags (comma separated)"
              value={connectionForm.tags}
              onChange={(e) => setConnectionForm({ ...connectionForm, tags: e.target.value })}
            />

            <div className="form-row">
              <div>
                <label>Last Contact Date</label>
                <input
                  type="date"
                  value={connectionForm.lastContactDate}
                  onChange={(e) => setConnectionForm({ ...connectionForm, lastContactDate: e.target.value })}
                />
              </div>
              <div>
                <label>Outreach Frequency</label>
                <select
                  value={connectionForm.outreachFrequency}
                  onChange={(e) => setConnectionForm({ ...connectionForm, outreachFrequency: e.target.value })}
                >
                  <option value="weekly">Weekly</option>
                  <option value="biweekly">Bi-weekly</option>
                  <option value="monthly">Monthly</option>
                  <option value="quarterly">Quarterly</option>
                  <option value="biannually">Bi-annually</option>
                  <option value="yearly">Yearly</option>
                </select>
              </div>
            </div>

            <textarea
              placeholder="Notes"
              value={connectionForm.notes}
              onChange={(e) => setConnectionForm({ ...connectionForm, notes: e.target.value })}
              rows={3}
            />

            <div className="form-actions">
              <button className="btn-cancel" onClick={() => { setShowConnectionForm(false); setEditingConnection(null); resetConnectionForm(); }}>
                Cancel
              </button>
              <button className="btn-save" onClick={editingConnection ? handleUpdateConnection : handleCreateConnection}>
                {editingConnection ? 'Update' : 'Create'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Conversation Form */}
      {showConversationForm && (
        <div className="form-overlay" onClick={() => { setShowConversationForm(false); setEditingConversation(null); resetConversationForm(); }}>
          <div className="connection-form" onClick={(e) => e.stopPropagation()}>
            <h4>{editingConversation ? 'Edit Conversation' : 'Log Conversation'}</h4>

            <div className="form-row">
              <div>
                <label>Date *</label>
                <input
                  type="date"
                  value={conversationForm.date}
                  onChange={(e) => setConversationForm({ ...conversationForm, date: e.target.value })}
                />
              </div>
              <div>
                <label>Channel</label>
                <select
                  value={conversationForm.channel}
                  onChange={(e) => setConversationForm({ ...conversationForm, channel: e.target.value })}
                >
                  <option value="in_person">In Person</option>
                  <option value="phone">Phone</option>
                  <option value="email">Email</option>
                  <option value="video_call">Video Call</option>
                  <option value="text">Text/WhatsApp</option>
                  <option value="social_media">Social Media</option>
                </select>
              </div>
            </div>

            <textarea
              placeholder="Conversation Summary *"
              value={conversationForm.summary}
              onChange={(e) => setConversationForm({ ...conversationForm, summary: e.target.value })}
              rows={4}
            />

            <textarea
              placeholder="Action Items (one per line)"
              value={conversationForm.actionItems}
              onChange={(e) => setConversationForm({ ...conversationForm, actionItems: e.target.value })}
              rows={3}
            />

            <div>
              <label>Sentiment</label>
              <select
                value={conversationForm.sentiment}
                onChange={(e) => setConversationForm({ ...conversationForm, sentiment: e.target.value })}
              >
                <option value="very_positive">Very Positive</option>
                <option value="positive">Positive</option>
                <option value="neutral">Neutral</option>
                <option value="negative">Negative</option>
              </select>
            </div>

            <div className="form-actions">
              <button className="btn-cancel" onClick={() => { setShowConversationForm(false); setEditingConversation(null); resetConversationForm(); }}>
                Cancel
              </button>
              <button className="btn-save" onClick={editingConversation ? handleUpdateConversation : handleCreateConversation}>
                {editingConversation ? 'Update' : 'Save'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Gift Form */}
      {showGiftForm && (
        <div className="form-overlay" onClick={() => { setShowGiftForm(false); setEditingGift(null); resetGiftForm(); }}>
          <div className="connection-form" onClick={(e) => e.stopPropagation()}>
            <h4>{editingGift ? 'Edit Gift' : 'Track Gift'}</h4>

            <div className="form-row">
              <div>
                <label>Type</label>
                <select
                  value={giftForm.giftType}
                  onChange={(e) => setGiftForm({ ...giftForm, giftType: e.target.value })}
                >
                  <option value="given">Given</option>
                  <option value="received">Received</option>
                </select>
              </div>
              <div>
                <label>Date *</label>
                <input
                  type="date"
                  value={giftForm.date}
                  onChange={(e) => setGiftForm({ ...giftForm, date: e.target.value })}
                />
              </div>
            </div>

            <input
              type="text"
              placeholder="Gift Name/Description *"
              value={giftForm.giftName}
              onChange={(e) => setGiftForm({ ...giftForm, giftName: e.target.value })}
            />

            <div className="form-row">
              <input
                type="number"
                placeholder="Estimated Value"
                value={giftForm.estimatedValue}
                onChange={(e) => setGiftForm({ ...giftForm, estimatedValue: e.target.value })}
              />
              <input
                type="text"
                placeholder="Occasion"
                value={giftForm.occasion}
                onChange={(e) => setGiftForm({ ...giftForm, occasion: e.target.value })}
              />
            </div>

            <textarea
              placeholder="Notes"
              value={giftForm.notes}
              onChange={(e) => setGiftForm({ ...giftForm, notes: e.target.value })}
              rows={3}
            />

            <div className="form-actions">
              <button className="btn-cancel" onClick={() => { setShowGiftForm(false); setEditingGift(null); resetGiftForm(); }}>
                Cancel
              </button>
              <button className="btn-save" onClick={editingGift ? handleUpdateGift : handleCreateGift}>
                {editingGift ? 'Update' : 'Save'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ConnectionManager;
