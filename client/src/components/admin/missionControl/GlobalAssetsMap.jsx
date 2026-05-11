import React, { useState, useEffect, useRef } from 'react';
import { getAPI, postAPI, putAPI, deleteAPI } from '../../../utils/fetchData';
import { useSelector } from 'react-redux';
import { Add, Edit, Delete, ZoomIn, ZoomOut, MyLocation, Search, Close, Save } from '@material-ui/icons';
import './GlobalAssetsMap.css';

const GlobalAssetsMap = () => {
  const { auth } = useSelector(state => state);
  const [markers, setMarkers] = useState([]);
  const [selectedMarker, setSelectedMarker] = useState(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [zoom, setZoom] = useState(1);
  const [panPosition, setPanPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [searchQuery, setSearchQuery] = useState('');
  const svgRef = useRef(null);

  const [formData, setFormData] = useState({
    name: '',
    type: 'supplier',
    country: '',
    city: '',
    latitude: '',
    longitude: '',
    description: '',
    contact: '',
    notes: '',
    status: 'potential'
  });

  // Asset types for strategic tracking
  const assetTypes = [
    { value: 'supplier', label: 'Raw Material Supplier', color: '#3b82f6' },
    { value: 'manufacturer', label: 'Manufacturing Partner', color: '#10b981' },
    { value: 'equipment', label: 'Equipment Source', color: '#f59e0b' },
    { value: 'investor', label: 'Business Partner/Investor', color: '#8b5cf6' },
    { value: 'market', label: 'Target Market', color: '#ef4444' },
    { value: 'logistics', label: 'Logistics Hub', color: '#06b6d4' },
    { value: 'facility', label: 'Facility/Office Location', color: '#6366f1' },
    { value: 'other', label: 'Other Strategic Asset', color: '#64748b' }
  ];

  const statusOptions = [
    { value: 'potential', label: 'Potential', color: '#94a3b8' },
    { value: 'contacted', label: 'Contacted', color: '#60a5fa' },
    { value: 'negotiating', label: 'Negotiating', color: '#fbbf24' },
    { value: 'active', label: 'Active', color: '#34d399' },
    { value: 'completed', label: 'Completed', color: '#a78bfa' },
    { value: 'inactive', label: 'Inactive', color: '#ef4444' }
  ];

  // Load markers from backend
  useEffect(() => {
    loadMarkers();
  }, []);

  const loadMarkers = async () => {
    try {
      const res = await getAPI('global-assets', auth.token);
      setMarkers(res.data.data || []);
    } catch (err) {
      console.error('Error loading global assets:', err);
      // If endpoint doesn't exist yet, start with empty array
      setMarkers([]);
    }
  };

  // Mouse/touch handlers for pan and zoom
  const handleMouseDown = (e) => {
    if (e.target === svgRef.current || e.target.tagName === 'path') {
      setIsDragging(true);
      setDragStart({ x: e.clientX - panPosition.x, y: e.clientY - panPosition.y });
    }
  };

  const handleMouseMove = (e) => {
    if (isDragging) {
      setPanPosition({
        x: e.clientX - dragStart.x,
        y: e.clientY - dragStart.y
      });
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleWheel = (e) => {
    e.preventDefault();
    const delta = e.deltaY > 0 ? 0.9 : 1.1;
    setZoom(prev => Math.min(Math.max(prev * delta, 0.5), 10));
  };

  // Add marker on map click
  const handleMapClick = (e) => {
    if (e.target.tagName === 'path' || e.target === svgRef.current) {
      const rect = svgRef.current.getBoundingClientRect();
      const x = ((e.clientX - rect.left - panPosition.x) / zoom);
      const y = ((e.clientY - rect.top - panPosition.y) / zoom);

      // Convert SVG coordinates to approximate lat/long
      // World map is roughly 1000x500 viewBox
      const longitude = (x / 1000) * 360 - 180;
      const latitude = 90 - (y / 500) * 180;

      setFormData({
        ...formData,
        latitude: latitude.toFixed(4),
        longitude: longitude.toFixed(4)
      });
      setShowAddModal(true);
    }
  };

  const handleAddMarker = async () => {
    try {
      const res = await postAPI('global-assets', formData, auth.token);
      setMarkers([...markers, res.data.data]);
      setShowAddModal(false);
      resetForm();
    } catch (err) {
      alert('Error adding marker: ' + (err.response?.data?.msg || err.message));
    }
  };

  const handleUpdateMarker = async () => {
    try {
      const res = await putAPI(`global-assets/${selectedMarker.id}`, formData, auth.token);
      setMarkers(markers.map(m => m.id === selectedMarker.id ? res.data.data : m));
      setShowEditModal(false);
      setSelectedMarker(null);
      resetForm();
    } catch (err) {
      alert('Error updating marker: ' + (err.response?.data?.msg || err.message));
    }
  };

  const handleDeleteMarker = async (id) => {
    if (!window.confirm('Delete this global asset marker?')) return;
    try {
      await deleteAPI(`global-assets/${id}`, auth.token);
      setMarkers(markers.filter(m => m.id !== id));
      setSelectedMarker(null);
    } catch (err) {
      alert('Error deleting marker: ' + (err.response?.data?.msg || err.message));
    }
  };

  const resetForm = () => {
    setFormData({
      name: '',
      type: 'supplier',
      country: '',
      city: '',
      latitude: '',
      longitude: '',
      description: '',
      contact: '',
      notes: '',
      status: 'potential'
    });
  };

  const openEditModal = (marker) => {
    setSelectedMarker(marker);
    setFormData({
      name: marker.name,
      type: marker.type,
      country: marker.country,
      city: marker.city,
      latitude: marker.latitude,
      longitude: marker.longitude,
      description: marker.description || '',
      contact: marker.contact || '',
      notes: marker.notes || '',
      status: marker.status
    });
    setShowEditModal(true);
  };

  const filteredMarkers = markers.filter(marker =>
    marker.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    marker.country.toLowerCase().includes(searchQuery.toLowerCase()) ||
    marker.type.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Convert lat/long to SVG coordinates (1000x500 viewBox)
  const latLongToSVG = (lat, lng) => {
    const x = ((parseFloat(lng) + 180) / 360) * 1000;
    const y = ((90 - parseFloat(lat)) / 180) * 500;
    return { x, y };
  };

  return (
    <div className="global-assets-container">
      {/* Controls Panel */}
      <div className="global-assets-controls">
        <div className="controls-header">
          <h2>Global Assets & Resources</h2>
          <div className="control-buttons">
            <button onClick={() => setZoom(z => Math.min(z * 1.2, 10))} title="Zoom In">
              <ZoomIn />
            </button>
            <button onClick={() => setZoom(z => Math.max(z * 0.8, 0.5))} title="Zoom Out">
              <ZoomOut />
            </button>
            <button onClick={() => { setZoom(1); setPanPosition({ x: 0, y: 0 }); }} title="Reset View">
              <MyLocation />
            </button>
          </div>
        </div>

        <div className="search-box">
          <Search />
          <input
            type="text"
            placeholder="Search assets..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <div className="markers-list">
          <h3>Assets ({filteredMarkers.length})</h3>
          {filteredMarkers.map(marker => {
            const typeInfo = assetTypes.find(t => t.value === marker.type);
            const statusInfo = statusOptions.find(s => s.value === marker.status);
            return (
              <div
                key={marker.id}
                className={`marker-list-item ${selectedMarker?.id === marker.id ? 'selected' : ''}`}
                onClick={() => setSelectedMarker(marker)}
              >
                <div className="marker-icon" style={{ backgroundColor: typeInfo?.color }}>
                  <MyLocation />
                </div>
                <div className="marker-info">
                  <strong>{marker.name}</strong>
                  <span>{marker.city}, {marker.country}</span>
                  <div className="marker-meta">
                    <span className="marker-type">{typeInfo?.label}</span>
                    <span className="marker-status" style={{ color: statusInfo?.color }}>
                      {statusInfo?.label}
                    </span>
                  </div>
                </div>
                <div className="marker-actions">
                  <button onClick={(e) => { e.stopPropagation(); openEditModal(marker); }}>
                    <Edit />
                  </button>
                  <button onClick={(e) => { e.stopPropagation(); handleDeleteMarker(marker.id); }}>
                    <Delete />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Map Canvas */}
      <div
        className="global-assets-map"
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        onWheel={handleWheel}
      >
        <svg
          ref={svgRef}
          viewBox="0 0 1000 500"
          className="world-map-svg"
          style={{
            transform: `translate(${panPosition.x}px, ${panPosition.y}px) scale(${zoom})`,
            cursor: isDragging ? 'grabbing' : 'grab'
          }}
          onClick={handleMapClick}
        >
          {/* Simplified World Map - Replace with detailed SVG map */}
          <rect width="1000" height="500" fill="#0f172a" />

          {/* Ocean */}
          <rect width="1000" height="500" fill="#1e3a8a" opacity="0.3" />

          {/* Continents (simplified shapes - replace with actual world map SVG) */}
          <g className="continents">
            {/* Africa */}
            <path d="M 520 200 L 580 200 L 600 280 L 580 350 L 520 340 L 500 250 Z" fill="#334155" stroke="#475569" strokeWidth="1" />
            {/* Europe */}
            <path d="M 480 150 L 560 140 L 580 180 L 520 200 L 480 180 Z" fill="#334155" stroke="#475569" strokeWidth="1" />
            {/* Asia */}
            <path d="M 580 140 L 800 120 L 850 200 L 820 280 L 700 250 L 600 280 L 580 180 Z" fill="#334155" stroke="#475569" strokeWidth="1" />
            {/* North America */}
            <path d="M 150 100 L 300 90 L 350 150 L 320 250 L 200 280 L 120 200 Z" fill="#334155" stroke="#475569" strokeWidth="1" />
            {/* South America */}
            <path d="M 250 280 L 320 280 L 340 360 L 300 420 L 240 400 L 230 320 Z" fill="#334155" stroke="#475569" strokeWidth="1" />
            {/* Australia */}
            <path d="M 750 320 L 820 330 L 840 380 L 800 400 L 740 390 L 730 340 Z" fill="#334155" stroke="#475569" strokeWidth="1" />
          </g>

          {/* Markers */}
          {filteredMarkers.map(marker => {
            const pos = latLongToSVG(marker.latitude, marker.longitude);
            const typeInfo = assetTypes.find(t => t.value === marker.type);
            const isSelected = selectedMarker?.id === marker.id;

            return (
              <g
                key={marker.id}
                className={`map-marker ${isSelected ? 'selected' : ''}`}
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedMarker(marker);
                }}
              >
                {/* Marker pin */}
                <circle
                  cx={pos.x}
                  cy={pos.y}
                  r={isSelected ? 8 : 5}
                  fill={typeInfo?.color || '#64748b'}
                  stroke="#fff"
                  strokeWidth={isSelected ? 3 : 2}
                  className="marker-dot"
                />
                {isSelected && (
                  <circle
                    cx={pos.x}
                    cy={pos.y}
                    r={20}
                    fill="none"
                    stroke={typeInfo?.color || '#64748b'}
                    strokeWidth={2}
                    opacity={0.5}
                    className="marker-pulse"
                  />
                )}
                {/* Label */}
                <text
                  x={pos.x}
                  y={pos.y - 10}
                  textAnchor="middle"
                  fill="#fff"
                  fontSize={isSelected ? 14 : 10}
                  fontWeight={isSelected ? 'bold' : 'normal'}
                  className="marker-label"
                >
                  {marker.name}
                </text>
              </g>
            );
          })}
        </svg>

        {/* Selected Marker Info Panel */}
        {selectedMarker && (
          <div className="marker-info-panel">
            <div className="info-header">
              <h3>{selectedMarker.name}</h3>
              <button onClick={() => setSelectedMarker(null)}>
                <Close />
              </button>
            </div>
            <div className="info-body">
              <div className="info-row">
                <strong>Type:</strong>
                <span>{assetTypes.find(t => t.value === selectedMarker.type)?.label}</span>
              </div>
              <div className="info-row">
                <strong>Location:</strong>
                <span>{selectedMarker.city}, {selectedMarker.country}</span>
              </div>
              <div className="info-row">
                <strong>Status:</strong>
                <span style={{ color: statusOptions.find(s => s.value === selectedMarker.status)?.color }}>
                  {statusOptions.find(s => s.value === selectedMarker.status)?.label}
                </span>
              </div>
              <div className="info-row">
                <strong>Coordinates:</strong>
                <span>{selectedMarker.latitude}, {selectedMarker.longitude}</span>
              </div>
              {selectedMarker.description && (
                <div className="info-row">
                  <strong>Description:</strong>
                  <p>{selectedMarker.description}</p>
                </div>
              )}
              {selectedMarker.contact && (
                <div className="info-row">
                  <strong>Contact:</strong>
                  <span>{selectedMarker.contact}</span>
                </div>
              )}
              {selectedMarker.notes && (
                <div className="info-row">
                  <strong>Notes:</strong>
                  <p>{selectedMarker.notes}</p>
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Add/Edit Modal */}
      {(showAddModal || showEditModal) && (
        <div className="modal-overlay">
          <div className="modal-content">
            <div className="modal-header">
              <h2>{showEditModal ? 'Edit' : 'Add'} Global Asset</h2>
              <button onClick={() => { setShowAddModal(false); setShowEditModal(false); resetForm(); }}>
                <Close />
              </button>
            </div>
            <div className="modal-body">
              <div className="form-group">
                <label>Asset Name *</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="e.g., Nigerian Textile Supplier"
                />
              </div>

              <div className="form-group">
                <label>Type *</label>
                <select value={formData.type} onChange={(e) => setFormData({ ...formData, type: e.target.value })}>
                  {assetTypes.map(type => (
                    <option key={type.value} value={type.value}>{type.label}</option>
                  ))}
                </select>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Country *</label>
                  <input
                    type="text"
                    value={formData.country}
                    onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                    placeholder="e.g., Nigeria"
                  />
                </div>
                <div className="form-group">
                  <label>City *</label>
                  <input
                    type="text"
                    value={formData.city}
                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                    placeholder="e.g., Lagos"
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Latitude *</label>
                  <input
                    type="number"
                    step="0.0001"
                    value={formData.latitude}
                    onChange={(e) => setFormData({ ...formData, latitude: e.target.value })}
                    placeholder="e.g., 6.5244"
                  />
                </div>
                <div className="form-group">
                  <label>Longitude *</label>
                  <input
                    type="number"
                    step="0.0001"
                    value={formData.longitude}
                    onChange={(e) => setFormData({ ...formData, longitude: e.target.value })}
                    placeholder="e.g., 3.3792"
                  />
                </div>
              </div>

              <div className="form-group">
                <label>Status *</label>
                <select value={formData.status} onChange={(e) => setFormData({ ...formData, status: e.target.value })}>
                  {statusOptions.map(status => (
                    <option key={status.value} value={status.value}>{status.label}</option>
                  ))}
                </select>
              </div>

              <div className="form-group">
                <label>Description</label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="What will you source/do here?"
                  rows="3"
                />
              </div>

              <div className="form-group">
                <label>Contact Info</label>
                <input
                  type="text"
                  value={formData.contact}
                  onChange={(e) => setFormData({ ...formData, contact: e.target.value })}
                  placeholder="Email, phone, or key contact person"
                />
              </div>

              <div className="form-group">
                <label>Notes</label>
                <textarea
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  placeholder="Additional strategic notes..."
                  rows="3"
                />
              </div>
            </div>
            <div className="modal-footer">
              <button className="btn-secondary" onClick={() => { setShowAddModal(false); setShowEditModal(false); resetForm(); }}>
                Cancel
              </button>
              <button
                className="btn-primary"
                onClick={showEditModal ? handleUpdateMarker : handleAddMarker}
                disabled={!formData.name || !formData.country || !formData.city || !formData.latitude || !formData.longitude}
              >
                <Save /> {showEditModal ? 'Update' : 'Add'} Asset
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default GlobalAssetsMap;
