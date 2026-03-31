import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { getAPI } from '../../../utils/fetchData';
import './RestaurantModal.css';

const InventoryItemModal = ({ item, restaurantId, onClose, onSave }) => {
  const { auth } = useSelector(state => state);
  const [formData, setFormData] = useState({
    name: '',
    category: 'dry_goods',
    current_stock: '',
    unit: '',
    minimum_stock: '',
    cost_per_unit: '',
    supplier_id: '',
    expiration_date: '',
    storage_location: ''
  });

  const [suppliers, setSuppliers] = useState([]);
  const [loading, setLoading] = useState(false);

  const categories = [
    { value: 'dry_goods', label: 'Dry Goods' },
    { value: 'proteins', label: 'Proteins' },
    { value: 'produce', label: 'Produce' },
    { value: 'liquids', label: 'Liquids' },
    { value: 'spices', label: 'Spices' },
    { value: 'dairy', label: 'Dairy' },
    { value: 'other', label: 'Other' }
  ];

  const units = ['kg', 'g', 'liters', 'ml', 'pieces', 'bags', 'boxes', 'cans'];

  useEffect(() => {
    fetchSuppliers();

    if (item) {
      setFormData({
        name: item.name || '',
        category: item.category || 'dry_goods',
        current_stock: item.current_stock || '',
        unit: item.unit || '',
        minimum_stock: item.minimum_stock || '',
        cost_per_unit: item.cost_per_unit || '',
        supplier_id: item.supplier_id || '',
        expiration_date: item.expiration_date ? item.expiration_date.split('T')[0] : '',
        storage_location: item.storage_location || ''
      });
    }
  }, [item]);

  const fetchSuppliers = async () => {
    try {
      const res = await getAPI('suppliers/active', auth.token);
      if (res.data.success) {
        setSuppliers(res.data.data);
      }
    } catch (error) {
      console.error('Error fetching suppliers:', error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    // Sanitize data
    const sanitizedData = { ...formData };

    // Convert empty strings to null for numeric fields
    ['current_stock', 'minimum_stock', 'cost_per_unit'].forEach(field => {
      if (sanitizedData[field] === '') {
        sanitizedData[field] = null;
      } else {
        sanitizedData[field] = parseFloat(sanitizedData[field]) || null;
      }
    });

    if (sanitizedData.supplier_id === '') {
      sanitizedData.supplier_id = null;
    }

    if (sanitizedData.expiration_date === '') {
      sanitizedData.expiration_date = null;
    }

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
          <h2>{item ? 'Edit Inventory Item' : 'Add New Inventory Item'}</h2>
          <button className="close-btn" onClick={onClose}>&times;</button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="modal-body">
            <div className="form-section">
              <h3>Item Information</h3>

              <div className="form-group">
                <label htmlFor="name">Item Name *</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  placeholder="e.g., Rice (White)"
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
                  <label htmlFor="unit">Unit *</label>
                  <select
                    id="unit"
                    name="unit"
                    value={formData.unit}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Select unit</option>
                    {units.map(unit => (
                      <option key={unit} value={unit}>{unit}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="current_stock">Current Stock *</label>
                  <input
                    type="number"
                    id="current_stock"
                    name="current_stock"
                    value={formData.current_stock}
                    onChange={handleChange}
                    required
                    step="0.01"
                    min="0"
                    placeholder="0"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="minimum_stock">Minimum Stock *</label>
                  <input
                    type="number"
                    id="minimum_stock"
                    name="minimum_stock"
                    value={formData.minimum_stock}
                    onChange={handleChange}
                    required
                    step="0.01"
                    min="0"
                    placeholder="0"
                  />
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="cost_per_unit">Cost per Unit (XAF) *</label>
                <input
                  type="number"
                  id="cost_per_unit"
                  name="cost_per_unit"
                  value={formData.cost_per_unit}
                  onChange={handleChange}
                  required
                  step="0.01"
                  min="0"
                  placeholder="0"
                />
              </div>

              <div className="form-group">
                <label htmlFor="supplier_id">Supplier</label>
                <select
                  id="supplier_id"
                  name="supplier_id"
                  value={formData.supplier_id}
                  onChange={handleChange}
                >
                  <option value="">Select supplier</option>
                  {suppliers.map(supplier => (
                    <option key={supplier.id} value={supplier.id}>
                      {supplier.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="storage_location">Storage Location</label>
                  <input
                    type="text"
                    id="storage_location"
                    name="storage_location"
                    value={formData.storage_location}
                    onChange={handleChange}
                    placeholder="e.g., Main Storage, Walk-in Freezer"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="expiration_date">Expiration Date</label>
                  <input
                    type="date"
                    id="expiration_date"
                    name="expiration_date"
                    value={formData.expiration_date}
                    onChange={handleChange}
                  />
                </div>
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

export default InventoryItemModal;
