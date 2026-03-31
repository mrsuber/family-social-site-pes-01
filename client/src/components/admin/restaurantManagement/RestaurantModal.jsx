import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { getAPI } from '../../../utils/fetchData';
import './RestaurantModal.css';

const RestaurantModal = ({ restaurant, onClose, onSave }) => {
  const { auth } = useSelector(state => state);
  const [formData, setFormData] = useState({
    name: '',
    location: '',
    address: '',
    phone: '',
    email: '',
    capacity: '',
    status: 'planning',
    manager_id: '',
    department_id: '',
    operating_hours: {
      monday: { open: '08:00', close: '22:00' },
      tuesday: { open: '08:00', close: '22:00' },
      wednesday: { open: '08:00', close: '22:00' },
      thursday: { open: '08:00', close: '22:00' },
      friday: { open: '08:00', close: '23:00' },
      saturday: { open: '08:00', close: '23:00' },
      sunday: { open: '10:00', close: '22:00' }
    }
  });

  const [departments, setDepartments] = useState([]);
  const [people, setPeople] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchDepartments();
    fetchPeople();

    if (restaurant) {
      setFormData({
        name: restaurant.name || '',
        location: restaurant.location || '',
        address: restaurant.address || '',
        phone: restaurant.phone || '',
        email: restaurant.email || '',
        capacity: restaurant.capacity || '',
        status: restaurant.status || 'planning',
        manager_id: restaurant.manager_id || '',
        department_id: restaurant.department_id || '',
        operating_hours: restaurant.operating_hours || formData.operating_hours
      });
    }
  }, [restaurant]);

  const fetchDepartments = async () => {
    try {
      const res = await getAPI('departments', auth.token);
      if (res.data.success) {
        setDepartments(res.data.data);
      }
    } catch (error) {
      console.error('Error fetching departments:', error);
    }
  };

  const fetchPeople = async () => {
    try {
      const res = await getAPI('people', auth.token);
      if (res.data.success) {
        setPeople(res.data.data);
      }
    } catch (error) {
      console.error('Error fetching people:', error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleOperatingHoursChange = (day, field, value) => {
    setFormData(prev => ({
      ...prev,
      operating_hours: {
        ...prev.operating_hours,
        [day]: {
          ...prev.operating_hours[day],
          [field]: value
        }
      }
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    // Sanitize data
    const sanitizedData = { ...formData };

    if (sanitizedData.capacity === '') {
      sanitizedData.capacity = null;
    } else {
      sanitizedData.capacity = parseInt(sanitizedData.capacity);
    }

    if (sanitizedData.manager_id === '') {
      sanitizedData.manager_id = null;
    }

    if (sanitizedData.department_id === '') {
      sanitizedData.department_id = null;
    }

    try {
      await onSave(sanitizedData);
    } finally {
      setLoading(false);
    }
  };

  const days = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content restaurant-modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>{restaurant ? 'Edit Restaurant' : 'Create New Restaurant'}</h2>
          <button className="close-btn" onClick={onClose}>&times;</button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="modal-body">
            <div className="form-section">
              <h3>Basic Information</h3>

              <div className="form-group">
                <label htmlFor="name">Restaurant Name *</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  placeholder="e.g., Classical Restaurant - Yaounde"
                />
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="location">Location *</label>
                  <input
                    type="text"
                    id="location"
                    name="location"
                    value={formData.location}
                    onChange={handleChange}
                    required
                    placeholder="e.g., Yaounde"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="status">Status</label>
                  <select
                    id="status"
                    name="status"
                    value={formData.status}
                    onChange={handleChange}
                  >
                    <option value="planning">Planning</option>
                    <option value="active">Active</option>
                    <option value="closed">Closed</option>
                  </select>
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="address">Address</label>
                <textarea
                  id="address"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  rows="2"
                  placeholder="Full address"
                />
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="phone">Phone</label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="+237 6XX XX XX XX"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="email">Email</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="restaurant@example.com"
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="capacity">Seating Capacity</label>
                  <input
                    type="number"
                    id="capacity"
                    name="capacity"
                    value={formData.capacity}
                    onChange={handleChange}
                    placeholder="e.g., 80"
                    min="0"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="department_id">Department</label>
                  <select
                    id="department_id"
                    name="department_id"
                    value={formData.department_id}
                    onChange={handleChange}
                  >
                    <option value="">Select department</option>
                    {departments.map(dept => (
                      <option key={dept.id} value={dept.id}>
                        {dept.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="manager_id">Manager</label>
                <select
                  id="manager_id"
                  name="manager_id"
                  value={formData.manager_id}
                  onChange={handleChange}
                >
                  <option value="">Select manager</option>
                  {people.map(person => (
                    <option key={person.id} value={person.id}>
                      {person.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="form-section">
              <h3>Operating Hours</h3>
              <div className="operating-hours-grid">
                {days.map(day => (
                  <div key={day} className="day-hours">
                    <label className="day-label">
                      {day.charAt(0).toUpperCase() + day.slice(1)}
                    </label>
                    <div className="time-inputs">
                      <input
                        type="time"
                        value={formData.operating_hours[day]?.open || '08:00'}
                        onChange={(e) => handleOperatingHoursChange(day, 'open', e.target.value)}
                      />
                      <span>to</span>
                      <input
                        type="time"
                        value={formData.operating_hours[day]?.close || '22:00'}
                        onChange={(e) => handleOperatingHoursChange(day, 'close', e.target.value)}
                      />
                    </div>
                  </div>
                ))}
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
              {loading ? 'Saving...' : (restaurant ? 'Update Restaurant' : 'Create Restaurant')}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RestaurantModal;
