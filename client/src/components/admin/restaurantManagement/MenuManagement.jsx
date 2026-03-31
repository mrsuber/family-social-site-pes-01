import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { getAPI, postAPI, putAPI, deleteAPI, patchAPI } from '../../../utils/fetchData';
import MenuItemModal from './MenuItemModal';
import './MenuManagement.css';

const MenuManagement = ({ restaurantId, restaurantName }) => {
  const { auth } = useSelector(state => state);
  const [menuItems, setMenuItems] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [filterCategory, setFilterCategory] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState('grid'); // 'grid' or 'list'

  const categories = [
    { value: 'all', label: 'All Categories' },
    { value: 'appetizer', label: 'Appetizers' },
    { value: 'main_course', label: 'Main Course' },
    { value: 'side', label: 'Sides' },
    { value: 'dessert', label: 'Desserts' },
    { value: 'drink', label: 'Drinks' },
    { value: 'special', label: 'Specials' }
  ];

  useEffect(() => {
    if (restaurantId) {
      fetchMenuItems();
    }
  }, [restaurantId, auth.token]);

  useEffect(() => {
    filterItems();
  }, [menuItems, filterCategory, filterStatus, searchQuery]);

  const fetchMenuItems = async () => {
    try {
      setLoading(true);
      const res = await getAPI(`restaurants/${restaurantId}/menu`, auth.token);
      if (res.data.success) {
        setMenuItems(res.data.data);
      }
    } catch (error) {
      console.error('Error fetching menu items:', error);
    } finally {
      setLoading(false);
    }
  };

  const filterItems = () => {
    let filtered = [...menuItems];

    if (filterCategory !== 'all') {
      filtered = filtered.filter(item => item.category === filterCategory);
    }

    if (filterStatus === 'available') {
      filtered = filtered.filter(item => item.is_available);
    } else if (filterStatus === 'unavailable') {
      filtered = filtered.filter(item => !item.is_available);
    }

    if (searchQuery) {
      filtered = filtered.filter(item =>
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (item.description && item.description.toLowerCase().includes(searchQuery.toLowerCase()))
      );
    }

    setFilteredItems(filtered);
  };

  const handleCreateItem = () => {
    setSelectedItem(null);
    setShowModal(true);
  };

  const handleEditItem = (item) => {
    setSelectedItem(item);
    setShowModal(true);
  };

  const handleDeleteItem = async (id) => {
    if (!window.confirm('Are you sure you want to delete this menu item?')) return;

    try {
      const res = await deleteAPI(`menu/${id}`, auth.token);
      if (res.data.success) {
        setMenuItems(menuItems.filter(item => item.id !== id));
        alert('Menu item deleted successfully');
      }
    } catch (error) {
      console.error('Error deleting menu item:', error);
      alert('Failed to delete menu item');
    }
  };

  const handleSaveItem = async (itemData) => {
    try {
      if (selectedItem) {
        const res = await putAPI(`menu/${selectedItem.id}`, itemData, auth.token);
        if (res.data.success) {
          setMenuItems(menuItems.map(item =>
            item.id === selectedItem.id ? res.data.data : item
          ));
          setShowModal(false);
          alert('Menu item updated successfully');
        }
      } else {
        const dataWithRestaurant = { ...itemData, restaurant_id: restaurantId };
        const res = await postAPI('menu', dataWithRestaurant, auth.token);
        if (res.data.success) {
          setMenuItems([...menuItems, res.data.data]);
          setShowModal(false);
          alert('Menu item created successfully');
        }
      }
    } catch (error) {
      console.error('Error saving menu item:', error);
      alert('Failed to save menu item');
    }
  };

  const handleToggleAvailability = async (itemId, currentStatus) => {
    try {
      const res = await patchAPI(`menu/${itemId}/availability`, {}, auth.token);
      if (res.data.success) {
        setMenuItems(menuItems.map(item =>
          item.id === itemId ? { ...item, is_available: !currentStatus } : item
        ));
      }
    } catch (error) {
      console.error('Error toggling availability:', error);
      alert('Failed to toggle availability');
    }
  };

  const getCategoryIcon = (category) => {
    const icons = {
      appetizer: '🥗',
      main_course: '🍽️',
      side: '🍟',
      dessert: '🍰',
      drink: '🥤',
      special: '⭐'
    };
    return icons[category] || '🍴';
  };

  const stats = {
    total: menuItems.length,
    available: menuItems.filter(i => i.is_available).length,
    unavailable: menuItems.filter(i => !i.is_available).length,
    popular: menuItems.filter(i => i.is_popular).length
  };

  if (loading) {
    return (
      <div className="menu-management">
        <div className="loading-spinner">Loading menu...</div>
      </div>
    );
  }

  return (
    <div className="menu-management">
      <div className="menu-header">
        <div className="header-top">
          <div>
            <h2>Menu Management</h2>
            <p className="restaurant-name">{restaurantName}</p>
          </div>
          <button className="btn-primary" onClick={handleCreateItem}>
            <span className="icon">+</span> Add Menu Item
          </button>
        </div>

        <div className="stats-row">
          <div className="stat-box">
            <div className="stat-value">{stats.total}</div>
            <div className="stat-label">Total Items</div>
          </div>
          <div className="stat-box" style={{ borderColor: '#10b981' }}>
            <div className="stat-value" style={{ color: '#10b981' }}>
              {stats.available}
            </div>
            <div className="stat-label">Available</div>
          </div>
          <div className="stat-box" style={{ borderColor: '#6b7280' }}>
            <div className="stat-value" style={{ color: '#6b7280' }}>
              {stats.unavailable}
            </div>
            <div className="stat-label">Unavailable</div>
          </div>
          <div className="stat-box" style={{ borderColor: '#f59e0b' }}>
            <div className="stat-value" style={{ color: '#f59e0b' }}>
              {stats.popular}
            </div>
            <div className="stat-label">Popular</div>
          </div>
        </div>

        <div className="filters-row">
          <input
            type="text"
            className="search-input"
            placeholder="Search menu items..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <select
            className="filter-select"
            value={filterCategory}
            onChange={(e) => setFilterCategory(e.target.value)}
          >
            {categories.map(cat => (
              <option key={cat.value} value={cat.value}>{cat.label}</option>
            ))}
          </select>
          <select
            className="filter-select"
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
          >
            <option value="all">All Status</option>
            <option value="available">Available</option>
            <option value="unavailable">Unavailable</option>
          </select>
          <div className="view-toggle">
            <button
              className={`view-btn ${viewMode === 'grid' ? 'active' : ''}`}
              onClick={() => setViewMode('grid')}
              title="Grid view"
            >
              ⊞
            </button>
            <button
              className={`view-btn ${viewMode === 'list' ? 'active' : ''}`}
              onClick={() => setViewMode('list')}
              title="List view"
            >
              ☰
            </button>
          </div>
        </div>
      </div>

      <div className={`menu-items-container ${viewMode}`}>
        {filteredItems.length === 0 ? (
          <div className="empty-state">
            <p>No menu items found.</p>
            <button className="btn-primary" onClick={handleCreateItem}>
              Add First Menu Item
            </button>
          </div>
        ) : viewMode === 'grid' ? (
          <div className="menu-grid">
            {filteredItems.map(item => (
              <div key={item.id} className="menu-card">
                <div className="menu-card-header">
                  <span className="category-icon">{getCategoryIcon(item.category)}</span>
                  <div className="card-badges">
                    {item.is_popular && <span className="badge-popular">⭐ Popular</span>}
                    {item.spicy_level > 0 && (
                      <span className="badge-spicy">
                        {'🌶️'.repeat(item.spicy_level)}
                      </span>
                    )}
                  </div>
                </div>

                <div className="menu-card-body">
                  <h3 className="item-name">{item.name}</h3>
                  <p className="item-description">{item.description || 'No description'}</p>

                  <div className="item-details">
                    <div className="detail-row">
                      <span className="detail-label">Category:</span>
                      <span className="detail-value">{item.category.replace('_', ' ')}</span>
                    </div>
                    {item.preparation_time && (
                      <div className="detail-row">
                        <span className="detail-label">Prep Time:</span>
                        <span className="detail-value">{item.preparation_time} min</span>
                      </div>
                    )}
                    {item.serving_size && (
                      <div className="detail-row">
                        <span className="detail-label">Serving:</span>
                        <span className="detail-value">{item.serving_size}</span>
                      </div>
                    )}
                  </div>

                  <div className="item-price">{item.price.toLocaleString()} {item.currency || 'XAF'}</div>
                </div>

                <div className="menu-card-footer">
                  <button
                    className={`btn-availability ${item.is_available ? 'available' : 'unavailable'}`}
                    onClick={() => handleToggleAvailability(item.id, item.is_available)}
                  >
                    {item.is_available ? '✓ Available' : '✗ Unavailable'}
                  </button>
                  <div className="card-actions">
                    <button
                      className="btn-action"
                      onClick={() => handleEditItem(item)}
                      title="Edit"
                    >
                      ✏️
                    </button>
                    <button
                      className="btn-action btn-delete"
                      onClick={() => handleDeleteItem(item.id)}
                      title="Delete"
                    >
                      🗑️
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="menu-list">
            <table className="menu-table">
              <thead>
                <tr>
                  <th>Item</th>
                  <th>Category</th>
                  <th>Price</th>
                  <th>Prep Time</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredItems.map(item => (
                  <tr key={item.id}>
                    <td>
                      <div className="item-cell">
                        <span className="item-icon">{getCategoryIcon(item.category)}</span>
                        <div>
                          <div className="item-name-small">{item.name}</div>
                          {item.is_popular && <span className="badge-popular-small">⭐</span>}
                        </div>
                      </div>
                    </td>
                    <td>
                      <span className="category-badge">{item.category.replace('_', ' ')}</span>
                    </td>
                    <td><strong>{item.price.toLocaleString()}</strong> {item.currency || 'XAF'}</td>
                    <td>{item.preparation_time ? `${item.preparation_time} min` : '-'}</td>
                    <td>
                      <button
                        className={`btn-availability-small ${item.is_available ? 'available' : 'unavailable'}`}
                        onClick={() => handleToggleAvailability(item.id, item.is_available)}
                      >
                        {item.is_available ? 'Available' : 'Unavailable'}
                      </button>
                    </td>
                    <td>
                      <div className="action-buttons">
                        <button
                          className="btn-action"
                          onClick={() => handleEditItem(item)}
                          title="Edit"
                        >
                          ✏️
                        </button>
                        <button
                          className="btn-action btn-delete"
                          onClick={() => handleDeleteItem(item.id)}
                          title="Delete"
                        >
                          🗑️
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {showModal && (
        <MenuItemModal
          item={selectedItem}
          restaurantId={restaurantId}
          onClose={() => setShowModal(false)}
          onSave={handleSaveItem}
        />
      )}
    </div>
  );
};

export default MenuManagement;
