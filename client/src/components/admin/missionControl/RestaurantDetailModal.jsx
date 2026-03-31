import React, { useState, useEffect } from 'react';
import './PersonDetailModal.css';
import {
  Close,
  MenuBook,
  Storage,
  Receipt,
  LocalShipping,
  People,
  Add,
  Edit,
  Delete,
  Save,
  Cancel,
  Star,
  Warning,
  CheckCircle,
  TrendingUp,
  AttachMoney
} from '@material-ui/icons';
import { fetchData } from '../../../utils/fetchData';

const RestaurantDetailModal = ({ node, onClose, onUpdate }) => {
  const [activeTab, setActiveTab] = useState('overview');
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editItem, setEditItem] = useState(null);

  const nodeType = node?.data?.restaurantNodeType || 'menu';
  const restaurantId = node?.data?.restaurantId;

  useEffect(() => {
    if (restaurantId) {
      loadData();
    }
  }, [restaurantId, nodeType]);

  const loadData = async () => {
    setLoading(true);
    try {
      let endpoint = '';
      switch (nodeType) {
        case 'menu':
          endpoint = `/api/restaurants/${restaurantId}/menu`;
          break;
        case 'inventory':
          endpoint = `/api/restaurants/${restaurantId}/inventory`;
          break;
        case 'orders':
          endpoint = `/api/restaurants/${restaurantId}/orders`;
          break;
        case 'suppliers':
          endpoint = `/api/suppliers`;
          break;
        case 'staff':
          endpoint = `/api/restaurants/${restaurantId}/staff`;
          break;
        default:
          endpoint = `/api/restaurants/${restaurantId}/menu`;
      }

      const response = await fetchData(endpoint);
      setData(response || []);
    } catch (error) {
      console.error('Error loading restaurant data:', error);
    } finally {
      setLoading(false);
    }
  };

  const getIcon = () => {
    switch (nodeType) {
      case 'menu': return <MenuBook style={{ fontSize: 28, color: '#10b981' }} />;
      case 'inventory': return <Storage style={{ fontSize: 28, color: '#3b82f6' }} />;
      case 'orders': return <Receipt style={{ fontSize: 28, color: '#f59e0b' }} />;
      case 'suppliers': return <LocalShipping style={{ fontSize: 28, color: '#8b5cf6' }} />;
      case 'staff': return <People style={{ fontSize: 28, color: '#ec4899' }} />;
      default: return <MenuBook style={{ fontSize: 28 }} />;
    }
  };

  const getColor = () => {
    switch (nodeType) {
      case 'menu': return '#10b981';
      case 'inventory': return '#3b82f6';
      case 'orders': return '#f59e0b';
      case 'suppliers': return '#8b5cf6';
      case 'staff': return '#ec4899';
      default: return '#6b7280';
    }
  };

  const getTitle = () => {
    switch (nodeType) {
      case 'menu': return 'Menu Management';
      case 'inventory': return 'Inventory Management';
      case 'orders': return 'Orders & POS';
      case 'suppliers': return 'Supplier Network';
      case 'staff': return 'Staff Schedule';
      default: return 'Restaurant Management';
    }
  };

  const renderMenuItems = () => {
    if (loading) return <div className="loading-state">Loading menu items...</div>;
    if (!data || data.length === 0) return <div className="empty-state">No menu items found</div>;

    return (
      <div className="restaurant-items-grid">
        {data.map(item => (
          <div key={item.id} className="restaurant-item-card" style={{ borderLeft: `4px solid ${getColor()}` }}>
            <div className="item-header">
              <h4>{item.name}</h4>
              <span className={`item-badge ${item.isAvailable ? 'available' : 'unavailable'}`}>
                {item.isAvailable ? 'Available' : 'Unavailable'}
              </span>
            </div>
            {item.description && <p className="item-description">{item.description}</p>}
            <div className="item-details">
              <div className="item-price">
                <AttachMoney style={{ fontSize: 16 }} />
                <span>{item.currency} {parseFloat(item.price).toLocaleString()}</span>
              </div>
              <span className="item-category">{item.category}</span>
              {item.isPopular && (
                <span className="popular-badge">
                  <Star style={{ fontSize: 14 }} /> Popular
                </span>
              )}
            </div>
            {item.preparationTime && (
              <div className="item-meta">Prep time: {item.preparationTime} min</div>
            )}
          </div>
        ))}
      </div>
    );
  };

  const renderInventoryItems = () => {
    if (loading) return <div className="loading-state">Loading inventory...</div>;
    if (!data || data.length === 0) return <div className="empty-state">No inventory items found</div>;

    return (
      <div className="restaurant-items-grid">
        {data.map(item => (
          <div key={item.id} className="restaurant-item-card" style={{ borderLeft: `4px solid ${getColor()}` }}>
            <div className="item-header">
              <h4>{item.name}</h4>
              <span className={`item-badge status-${item.status}`}>
                {item.status === 'in_stock' && <CheckCircle style={{ fontSize: 14 }} />}
                {item.status === 'low_stock' && <Warning style={{ fontSize: 14 }} />}
                {item.status === 'out_of_stock' && <Warning style={{ fontSize: 14 }} />}
                {item.status.replace('_', ' ')}
              </span>
            </div>
            <div className="item-details">
              <div className="stock-info">
                <span className="stock-label">Current Stock:</span>
                <span className="stock-value">{parseFloat(item.currentStock).toFixed(2)} {item.unit}</span>
              </div>
              {item.minimumStock > 0 && (
                <div className="stock-info">
                  <span className="stock-label">Min Stock:</span>
                  <span className="stock-value">{parseFloat(item.minimumStock).toFixed(2)} {item.unit}</span>
                </div>
              )}
              <span className="item-category">{item.category}</span>
            </div>
            {item.costPerUnit > 0 && (
              <div className="item-meta">
                Cost: {parseFloat(item.costPerUnit).toFixed(2)}/unit
              </div>
            )}
            {item.expirationDate && (
              <div className="item-meta expiry">
                Expires: {new Date(item.expirationDate).toLocaleDateString()}
              </div>
            )}
          </div>
        ))}
      </div>
    );
  };

  const renderOrders = () => {
    if (loading) return <div className="loading-state">Loading orders...</div>;
    if (!data || data.length === 0) return <div className="empty-state">No orders found</div>;

    return (
      <div className="restaurant-items-grid">
        {data.map(order => (
          <div key={order.id} className="restaurant-item-card" style={{ borderLeft: `4px solid ${getColor()}` }}>
            <div className="item-header">
              <h4>Order #{order.orderNumber}</h4>
              <span className={`item-badge status-${order.orderStatus}`}>
                {order.orderStatus}
              </span>
            </div>
            <div className="item-details">
              <div className="order-type">{order.orderType.replace('_', ' ')}</div>
              {order.tableNumber && <div className="table-number">Table: {order.tableNumber}</div>}
              <div className="order-total">
                <AttachMoney style={{ fontSize: 18 }} />
                <span style={{ fontSize: 18, fontWeight: 700 }}>{parseFloat(order.total).toLocaleString()}</span>
              </div>
              <div className="order-payment">
                <span className={`payment-badge status-${order.paymentStatus}`}>
                  {order.paymentStatus}
                </span>
                <span className="payment-method">{order.paymentMethod.replace('_', ' ')}</span>
              </div>
            </div>
            <div className="item-meta">
              Ordered: {new Date(order.orderedAt).toLocaleTimeString()}
            </div>
            {order.items && order.items.length > 0 && (
              <div className="order-items-count">{order.items.length} item(s)</div>
            )}
          </div>
        ))}
      </div>
    );
  };

  const renderSuppliers = () => {
    if (loading) return <div className="loading-state">Loading suppliers...</div>;
    if (!data || data.length === 0) return <div className="empty-state">No suppliers found</div>;

    return (
      <div className="restaurant-items-grid">
        {data.map(supplier => (
          <div key={supplier.id} className="restaurant-item-card" style={{ borderLeft: `4px solid ${getColor()}` }}>
            <div className="item-header">
              <h4>{supplier.name}</h4>
              <span className={`item-badge status-${supplier.status}`}>
                {supplier.status}
              </span>
            </div>
            {supplier.contactPerson && (
              <div className="supplier-contact">Contact: {supplier.contactPerson}</div>
            )}
            <div className="item-details">
              {supplier.phone && <div className="contact-info">📞 {supplier.phone}</div>}
              {supplier.email && <div className="contact-info">✉️ {supplier.email}</div>}
              {supplier.rating > 0 && (
                <div className="supplier-rating">
                  <Star style={{ fontSize: 16, color: '#fbbf24' }} />
                  <span>{parseFloat(supplier.rating).toFixed(1)}</span>
                </div>
              )}
            </div>
            {supplier.productsSupplied && supplier.productsSupplied.length > 0 && (
              <div className="supplier-products">
                <span className="products-label">Supplies:</span>
                <span className="products-list">{supplier.productsSupplied.slice(0, 3).join(', ')}</span>
                {supplier.productsSupplied.length > 3 && <span> +{supplier.productsSupplied.length - 3} more</span>}
              </div>
            )}
            {supplier.deliverySchedule && (
              <div className="item-meta">Delivery: {supplier.deliverySchedule}</div>
            )}
          </div>
        ))}
      </div>
    );
  };

  const renderContent = () => {
    switch (nodeType) {
      case 'menu': return renderMenuItems();
      case 'inventory': return renderInventoryItems();
      case 'orders': return renderOrders();
      case 'suppliers': return renderSuppliers();
      case 'staff': return <div className="empty-state">Staff scheduling feature coming soon...</div>;
      default: return <div className="empty-state">Select a category to view details</div>;
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content person-detail-modal" onClick={e => e.stopPropagation()} style={{ maxWidth: 900 }}>
        {/* Header */}
        <div className="modal-header" style={{ background: `linear-gradient(135deg, ${getColor()} 0%, ${getColor()}dd 100%)` }}>
          <div className="header-left">
            {getIcon()}
            <div>
              <h2>{getTitle()}</h2>
              <p style={{ margin: '4px 0 0 0', fontSize: 13, opacity: 0.9 }}>{node?.data?.label || 'Restaurant Operations'}</p>
            </div>
          </div>
          <button className="close-button" onClick={onClose}>
            <Close />
          </button>
        </div>

        {/* Tabs */}
        <div className="modal-tabs">
          <button
            className={`tab ${activeTab === 'overview' ? 'active' : ''}`}
            onClick={() => setActiveTab('overview')}
          >
            Overview
          </button>
          <button
            className={`tab ${activeTab === 'manage' ? 'active' : ''}`}
            onClick={() => setActiveTab('manage')}
          >
            Manage
          </button>
          <button
            className={`tab ${activeTab === 'analytics' ? 'active' : ''}`}
            onClick={() => setActiveTab('analytics')}
          >
            <TrendingUp style={{ fontSize: 16 }} /> Analytics
          </button>
        </div>

        {/* Content */}
        <div className="modal-body" style={{ maxHeight: '600px', overflowY: 'auto' }}>
          {activeTab === 'overview' && (
            <div className="tab-content">
              <div className="overview-stats" style={{ marginBottom: 20 }}>
                <div className="stat-card" style={{ borderColor: getColor() }}>
                  <div className="stat-icon" style={{ background: `${getColor()}22`, color: getColor() }}>
                    {getIcon()}
                  </div>
                  <div className="stat-info">
                    <div className="stat-value">{data.length}</div>
                    <div className="stat-label">Total Items</div>
                  </div>
                </div>
              </div>
              {renderContent()}
            </div>
          )}

          {activeTab === 'manage' && (
            <div className="tab-content">
              <div className="manage-header">
                <h3>Manage {getTitle()}</h3>
                <button className="btn-primary" style={{ background: getColor() }}>
                  <Add style={{ fontSize: 18 }} /> Add New
                </button>
              </div>
              {renderContent()}
            </div>
          )}

          {activeTab === 'analytics' && (
            <div className="tab-content">
              <div className="empty-state">
                <TrendingUp style={{ fontSize: 48, color: '#6b7280' }} />
                <p>Analytics dashboard coming soon</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default RestaurantDetailModal;
