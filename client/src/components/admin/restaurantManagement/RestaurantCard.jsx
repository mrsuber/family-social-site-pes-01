import React from 'react';
import './RestaurantCard.css';

const RestaurantCard = ({ restaurant, onEdit, onDelete, onViewDetails }) => {
  const getStatusBadge = (status) => {
    const badges = {
      active: { label: 'Active', class: 'status-active' },
      planning: { label: 'Planning', class: 'status-planning' },
      closed: { label: 'Closed', class: 'status-closed' }
    };
    return badges[status] || badges.planning;
  };

  const statusBadge = getStatusBadge(restaurant.status);

  const formatOperatingHours = () => {
    if (!restaurant.operating_hours || !restaurant.operating_hours.monday) {
      return 'Not set';
    }
    const hours = restaurant.operating_hours.monday;
    return `${hours.open} - ${hours.close}`;
  };

  return (
    <div className="restaurant-card">
      <div className="card-header">
        <div className="card-title">
          <h3>{restaurant.name}</h3>
          <span className={`status-badge ${statusBadge.class}`}>
            {statusBadge.label}
          </span>
        </div>
        <div className="card-actions">
          <button
            className="btn-icon"
            onClick={onEdit}
            title="Edit restaurant"
          >
            ✏️
          </button>
          <button
            className="btn-icon btn-danger"
            onClick={onDelete}
            title="Delete restaurant"
          >
            🗑️
          </button>
        </div>
      </div>

      <div className="card-content">
        <div className="info-row">
          <span className="info-label">📍 Location:</span>
          <span className="info-value">{restaurant.location || 'Not specified'}</span>
        </div>

        {restaurant.address && (
          <div className="info-row">
            <span className="info-label">🏠 Address:</span>
            <span className="info-value">{restaurant.address}</span>
          </div>
        )}

        <div className="info-row">
          <span className="info-label">📞 Phone:</span>
          <span className="info-value">{restaurant.phone || 'Not set'}</span>
        </div>

        <div className="info-row">
          <span className="info-label">👥 Capacity:</span>
          <span className="info-value">{restaurant.capacity ? `${restaurant.capacity} seats` : 'Not set'}</span>
        </div>

        <div className="info-row">
          <span className="info-label">🕐 Hours:</span>
          <span className="info-value">{formatOperatingHours()}</span>
        </div>
      </div>

      <div className="card-footer">
        <button
          className="btn-view btn-secondary"
          onClick={() => onViewDetails(restaurant, 'inventory')}
        >
          📦 Inventory
        </button>
        <button
          className="btn-view btn-secondary"
          onClick={() => onViewDetails(restaurant, 'menu')}
        >
          📋 Menu
        </button>
        <button
          className="btn-view btn-primary"
          onClick={() => onViewDetails(restaurant, 'orders')}
        >
          💳 POS
        </button>
      </div>
    </div>
  );
};

export default RestaurantCard;
