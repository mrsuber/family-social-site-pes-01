import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { getAPI, postAPI, putAPI, deleteAPI, patchAPI } from '../../../utils/fetchData';
import InventoryItemModal from './InventoryItemModal';
import './InventoryManagement.css';

const InventoryManagement = ({ restaurantId, restaurantName }) => {
  const { auth } = useSelector(state => state);
  const [inventoryItems, setInventoryItems] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [filterCategory, setFilterCategory] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const categories = [
    { value: 'all', label: 'All Categories' },
    { value: 'dry_goods', label: 'Dry Goods' },
    { value: 'proteins', label: 'Proteins' },
    { value: 'produce', label: 'Produce' },
    { value: 'liquids', label: 'Liquids' },
    { value: 'spices', label: 'Spices' },
    { value: 'dairy', label: 'Dairy' },
    { value: 'other', label: 'Other' }
  ];

  const statuses = [
    { value: 'all', label: 'All Status' },
    { value: 'in_stock', label: 'In Stock' },
    { value: 'low_stock', label: 'Low Stock' },
    { value: 'out_of_stock', label: 'Out of Stock' }
  ];

  useEffect(() => {
    if (restaurantId) {
      fetchInventoryItems();
    }
  }, [restaurantId, auth.token]);

  useEffect(() => {
    filterItems();
  }, [inventoryItems, filterCategory, filterStatus, searchQuery]);

  const fetchInventoryItems = async () => {
    try {
      setLoading(true);
      const res = await getAPI(`restaurants/${restaurantId}/inventory`, auth.token);
      if (res.data.success) {
        setInventoryItems(res.data.data);
      }
    } catch (error) {
      console.error('Error fetching inventory:', error);
    } finally {
      setLoading(false);
    }
  };

  const filterItems = () => {
    let filtered = [...inventoryItems];

    if (filterCategory !== 'all') {
      filtered = filtered.filter(item => item.category === filterCategory);
    }

    if (filterStatus !== 'all') {
      filtered = filtered.filter(item => item.status === filterStatus);
    }

    if (searchQuery) {
      filtered = filtered.filter(item =>
        item.name.toLowerCase().includes(searchQuery.toLowerCase())
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
    if (!window.confirm('Are you sure you want to delete this inventory item?')) return;

    try {
      const res = await deleteAPI(`inventory/${id}`, auth.token);
      if (res.data.success) {
        setInventoryItems(inventoryItems.filter(item => item.id !== id));
        alert('Inventory item deleted successfully');
      }
    } catch (error) {
      console.error('Error deleting inventory item:', error);
      alert('Failed to delete inventory item');
    }
  };

  const handleSaveItem = async (itemData) => {
    try {
      if (selectedItem) {
        const res = await putAPI(`inventory/${selectedItem.id}`, itemData, auth.token);
        if (res.data.success) {
          setInventoryItems(inventoryItems.map(item =>
            item.id === selectedItem.id ? res.data.data : item
          ));
          setShowModal(false);
          alert('Inventory item updated successfully');
        }
      } else {
        const dataWithRestaurant = { ...itemData, restaurant_id: restaurantId };
        const res = await postAPI('inventory', dataWithRestaurant, auth.token);
        if (res.data.success) {
          setInventoryItems([...inventoryItems, res.data.data]);
          setShowModal(false);
          alert('Inventory item created successfully');
        }
      }
    } catch (error) {
      console.error('Error saving inventory item:', error);
      alert('Failed to save inventory item');
    }
  };

  const handleUpdateStock = async (itemId, action) => {
    const quantity = prompt(`Enter quantity to ${action}:`);
    if (!quantity || isNaN(quantity)) return;

    try {
      const res = await patchAPI(`inventory/${itemId}/stock`, {
        quantity: parseFloat(quantity),
        action
      }, auth.token);

      if (res.data.success) {
        setInventoryItems(inventoryItems.map(item =>
          item.id === itemId ? res.data.data : item
        ));
        alert(`Stock ${action === 'add' ? 'added' : 'subtracted'} successfully`);
      }
    } catch (error) {
      console.error('Error updating stock:', error);
      alert('Failed to update stock');
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'in_stock':
        return '#10b981';
      case 'low_stock':
        return '#f59e0b';
      case 'out_of_stock':
        return '#ef4444';
      default:
        return '#6b7280';
    }
  };

  const getCategoryIcon = (category) => {
    const icons = {
      dry_goods: '🌾',
      proteins: '🥩',
      produce: '🥬',
      liquids: '🧃',
      spices: '🌶️',
      dairy: '🥛',
      other: '📦'
    };
    return icons[category] || '📦';
  };

  const stats = {
    total: inventoryItems.length,
    inStock: inventoryItems.filter(i => i.status === 'in_stock').length,
    lowStock: inventoryItems.filter(i => i.status === 'low_stock').length,
    outOfStock: inventoryItems.filter(i => i.status === 'out_of_stock').length
  };

  if (loading) {
    return (
      <div className="inventory-management">
        <div className="loading-spinner">Loading inventory...</div>
      </div>
    );
  }

  return (
    <div className="inventory-management">
      <div className="inventory-header">
        <div className="header-top">
          <div>
            <h2>Inventory Management</h2>
            <p className="restaurant-name">{restaurantName}</p>
          </div>
          <button className="btn-primary" onClick={handleCreateItem}>
            <span className="icon">+</span> Add Inventory Item
          </button>
        </div>

        <div className="stats-row">
          <div className="stat-box">
            <div className="stat-value">{stats.total}</div>
            <div className="stat-label">Total Items</div>
          </div>
          <div className="stat-box" style={{ borderColor: getStatusColor('in_stock') }}>
            <div className="stat-value" style={{ color: getStatusColor('in_stock') }}>
              {stats.inStock}
            </div>
            <div className="stat-label">In Stock</div>
          </div>
          <div className="stat-box" style={{ borderColor: getStatusColor('low_stock') }}>
            <div className="stat-value" style={{ color: getStatusColor('low_stock') }}>
              {stats.lowStock}
            </div>
            <div className="stat-label">Low Stock</div>
          </div>
          <div className="stat-box" style={{ borderColor: getStatusColor('out_of_stock') }}>
            <div className="stat-value" style={{ color: getStatusColor('out_of_stock') }}>
              {stats.outOfStock}
            </div>
            <div className="stat-label">Out of Stock</div>
          </div>
        </div>

        <div className="filters-row">
          <input
            type="text"
            className="search-input"
            placeholder="Search items..."
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
            {statuses.map(status => (
              <option key={status.value} value={status.value}>{status.label}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="inventory-table-container">
        {filteredItems.length === 0 ? (
          <div className="empty-state">
            <p>No inventory items found.</p>
            <button className="btn-primary" onClick={handleCreateItem}>
              Add First Item
            </button>
          </div>
        ) : (
          <table className="inventory-table">
            <thead>
              <tr>
                <th>Item</th>
                <th>Category</th>
                <th>Current Stock</th>
                <th>Min Stock</th>
                <th>Cost/Unit</th>
                <th>Total Value</th>
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
                      <span className="item-name">{item.name}</span>
                    </div>
                  </td>
                  <td>
                    <span className="category-badge">{item.category.replace('_', ' ')}</span>
                  </td>
                  <td>
                    <strong>{item.current_stock}</strong> {item.unit}
                  </td>
                  <td>{item.minimum_stock} {item.unit}</td>
                  <td>{item.cost_per_unit} XAF</td>
                  <td>
                    <strong>{(item.current_stock * item.cost_per_unit).toLocaleString()} XAF</strong>
                  </td>
                  <td>
                    <span
                      className="status-badge"
                      style={{
                        background: `${getStatusColor(item.status)}20`,
                        color: getStatusColor(item.status)
                      }}
                    >
                      {item.status.replace('_', ' ')}
                    </span>
                  </td>
                  <td>
                    <div className="action-buttons">
                      <button
                        className="btn-action btn-add"
                        onClick={() => handleUpdateStock(item.id, 'add')}
                        title="Add stock"
                      >
                        ➕
                      </button>
                      <button
                        className="btn-action btn-subtract"
                        onClick={() => handleUpdateStock(item.id, 'subtract')}
                        title="Subtract stock"
                      >
                        ➖
                      </button>
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
        )}
      </div>

      {showModal && (
        <InventoryItemModal
          item={selectedItem}
          restaurantId={restaurantId}
          onClose={() => setShowModal(false)}
          onSave={handleSaveItem}
        />
      )}
    </div>
  );
};

export default InventoryManagement;
