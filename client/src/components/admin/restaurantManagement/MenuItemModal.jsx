import React, { useState, useEffect } from 'react';
import './RestaurantModal.css';

const MenuItemModal = ({ item, restaurantId, onClose, onSave }) => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    category: 'main_course',
    price: '',
    currency: 'XAF',
    preparation_time: '',
    serving_size: '',
    is_available: true,
    is_popular: false,
    spicy_level: 0,
    status: 'active'
  });

  const [loading, setLoading] = useState(false);

  const categories = [
    { value: 'appetizer', label: 'Appetizer' },
    { value: 'main_course', label: 'Main Course' },
    { value: 'side', label: 'Side' },
    { value: 'dessert', label: 'Dessert' },
    { value: 'drink', label: 'Drink' },
    { value: 'special', label: 'Special' }
  ];

  const spicyLevels = [
    { value: 0, label: 'Not Spicy' },
    { value: 1, label: 'Mild 🌶️' },
    { value: 2, label: 'Medium 🌶️🌶️' },
    { value: 3, label: 'Hot 🌶️🌶️🌶️' },
    { value: 4, label: 'Very Hot 🌶️🌶️🌶️🌶️' }
  ];

  useEffect(() => {
    if (item) {
      setFormData({
        name: item.name || '',
        description: item.description || '',
        category: item.category || 'main_course',
        price: item.price || '',
        currency: item.currency || 'XAF',
        preparation_time: item.preparation_time || '',
        serving_size: item.serving_size || '',
        is_available: item.is_available !== undefined ? item.is_available : true,
        is_popular: item.is_popular || false,
        spicy_level: item.spicy_level || 0,
        status: item.status || 'active'
      });
    }
  }, [item]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    // Sanitize data
    const sanitizedData = { ...formData };

    // Convert empty strings to null or appropriate values
    if (sanitizedData.price === '') {
      alert('Price is required');
      setLoading(false);
      return;
    } else {
      sanitizedData.price = parseFloat(sanitizedData.price);
    }

    if (sanitizedData.preparation_time === '') {
      sanitizedData.preparation_time = null;
    } else {
      sanitizedData.preparation_time = parseInt(sanitizedData.preparation_time);
    }

    sanitizedData.spicy_level = parseInt(sanitizedData.spicy_level);

    try {
      await onSave(sanitizedData);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content restaurant-modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>{item ? 'Edit Menu Item' : 'Add New Menu Item'}</h2>
          <button className="close-btn" onClick={onClose}>&times;</button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="modal-body">
            <div className="form-section">
              <h3>Basic Information</h3>

              <div className="form-group">
                <label htmlFor="name">Item Name *</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  placeholder="e.g., Jollof Rice with Chicken"
                />
              </div>

              <div className="form-group">
                <label htmlFor="description">Description</label>
                <textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  rows="3"
                  placeholder="Brief description of the dish"
                />
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="category">Category *</label>
                  <select
                    id="category"
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    required
                  >
                    {categories.map(cat => (
                      <option key={cat.value} value={cat.value}>{cat.label}</option>
                    ))}
                  </select>
                </div>

                <div className="form-group">
                  <label htmlFor="status">Status</label>
                  <select
                    id="status"
                    name="status"
                    value={formData.status}
                    onChange={handleChange}
                  >
                    <option value="active">Active</option>
                    <option value="seasonal">Seasonal</option>
                    <option value="discontinued">Discontinued</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="form-section">
              <h3>Pricing & Details</h3>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="price">Price *</label>
                  <input
                    type="number"
                    id="price"
                    name="price"
                    value={formData.price}
                    onChange={handleChange}
                    required
                    step="0.01"
                    min="0"
                    placeholder="0"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="currency">Currency</label>
                  <select
                    id="currency"
                    name="currency"
                    value={formData.currency}
                    onChange={handleChange}
                  >
                    <option value="XAF">XAF</option>
                    <option value="USD">USD</option>
                    <option value="EUR">EUR</option>
                  </select>
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="preparation_time">Preparation Time (minutes)</label>
                  <input
                    type="number"
                    id="preparation_time"
                    name="preparation_time"
                    value={formData.preparation_time}
                    onChange={handleChange}
                    min="0"
                    placeholder="e.g., 25"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="serving_size">Serving Size</label>
                  <input
                    type="text"
                    id="serving_size"
                    name="serving_size"
                    value={formData.serving_size}
                    onChange={handleChange}
                    placeholder="e.g., 1 plate, 6 pieces"
                  />
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="spicy_level">Spicy Level</label>
                <select
                  id="spicy_level"
                  name="spicy_level"
                  value={formData.spicy_level}
                  onChange={handleChange}
                >
                  {spicyLevels.map(level => (
                    <option key={level.value} value={level.value}>{level.label}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="form-section">
              <h3>Availability & Features</h3>

              <div className="checkbox-group">
                <label className="checkbox-label">
                  <input
                    type="checkbox"
                    name="is_available"
                    checked={formData.is_available}
                    onChange={handleChange}
                  />
                  <span>Available for ordering</span>
                </label>
              </div>

              <div className="checkbox-group">
                <label className="checkbox-label">
                  <input
                    type="checkbox"
                    name="is_popular"
                    checked={formData.is_popular}
                    onChange={handleChange}
                  />
                  <span>Mark as popular item ⭐</span>
                </label>
              </div>
            </div>
          </div>

          <div className="modal-footer">
            <button
              type="button"
              className="btn-secondary"
              onClick={onClose}
              disabled={loading}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="btn-primary"
              disabled={loading}
            >
              {loading ? 'Saving...' : (item ? 'Update Item' : 'Add Item')}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default MenuItemModal;
