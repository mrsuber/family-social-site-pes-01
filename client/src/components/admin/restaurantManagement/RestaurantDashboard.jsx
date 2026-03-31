import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { getAPI, postAPI, putAPI, deleteAPI } from '../../../utils/fetchData';
import RestaurantCard from './RestaurantCard';
import RestaurantModal from './RestaurantModal';
import './RestaurantDashboard.css';

const RestaurantDashboard = () => {
  const { auth } = useSelector(state => state);
  const [restaurants, setRestaurants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [selectedRestaurant, setSelectedRestaurant] = useState(null);
  const [activeTab, setActiveTab] = useState('overview');

  useEffect(() => {
    fetchRestaurants();
  }, [auth.token]);

  const fetchRestaurants = async () => {
    try {
      setLoading(true);
      const res = await getAPI('restaurants', auth.token);
      if (res.data.success) {
        setRestaurants(res.data.data);
      }
    } catch (error) {
      console.error('Error fetching restaurants:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateRestaurant = () => {
    setSelectedRestaurant(null);
    setShowModal(true);
  };

  const handleEditRestaurant = (restaurant) => {
    setSelectedRestaurant(restaurant);
    setShowModal(true);
  };

  const handleDeleteRestaurant = async (id) => {
    if (!window.confirm('Are you sure you want to delete this restaurant?')) return;

    try {
      const res = await deleteAPI(`restaurants/${id}`, auth.token);
      if (res.data.success) {
        setRestaurants(restaurants.filter(r => r.id !== id));
        alert('Restaurant deleted successfully');
      }
    } catch (error) {
      console.error('Error deleting restaurant:', error);
      alert('Failed to delete restaurant');
    }
  };

  const handleSaveRestaurant = async (restaurantData) => {
    try {
      if (selectedRestaurant) {
        // Update existing restaurant
        const res = await putAPI(`restaurants/${selectedRestaurant.id}`, restaurantData, auth.token);
        if (res.data.success) {
          setRestaurants(restaurants.map(r =>
            r.id === selectedRestaurant.id ? res.data.data : r
          ));
          setShowModal(false);
          alert('Restaurant updated successfully');
        }
      } else {
        // Create new restaurant
        const res = await postAPI('restaurants', restaurantData, auth.token);
        if (res.data.success) {
          setRestaurants([...restaurants, res.data.data]);
          setShowModal(false);
          alert('Restaurant created successfully');
        }
      }
    } catch (error) {
      console.error('Error saving restaurant:', error);
      alert('Failed to save restaurant');
    }
  };

  const handleViewDetails = (restaurant, tab = 'overview') => {
    setSelectedRestaurant(restaurant);
    setActiveTab(tab);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'active':
        return '#10b981';
      case 'planning':
        return '#f59e0b';
      case 'closed':
        return '#ef4444';
      default:
        return '#6b7280';
    }
  };

  const stats = {
    total: restaurants.length,
    active: restaurants.filter(r => r.status === 'active').length,
    planning: restaurants.filter(r => r.status === 'planning').length,
    closed: restaurants.filter(r => r.status === 'closed').length
  };

  if (loading) {
    return (
      <div className="restaurant-dashboard">
        <div className="loading-spinner">Loading restaurants...</div>
      </div>
    );
  }

  return (
    <div className="restaurant-dashboard">
      <div className="dashboard-header">
        <div className="header-top">
          <h1>Restaurant Management</h1>
          <button className="btn-primary" onClick={handleCreateRestaurant}>
            <span className="icon">+</span> New Restaurant
          </button>
        </div>

        <div className="stats-grid">
          <div className="stat-card">
            <div className="stat-value">{stats.total}</div>
            <div className="stat-label">Total Restaurants</div>
          </div>
          <div className="stat-card" style={{ borderColor: getStatusColor('active') }}>
            <div className="stat-value" style={{ color: getStatusColor('active') }}>
              {stats.active}
            </div>
            <div className="stat-label">Active</div>
          </div>
          <div className="stat-card" style={{ borderColor: getStatusColor('planning') }}>
            <div className="stat-value" style={{ color: getStatusColor('planning') }}>
              {stats.planning}
            </div>
            <div className="stat-label">Planning</div>
          </div>
          <div className="stat-card" style={{ borderColor: getStatusColor('closed') }}>
            <div className="stat-value" style={{ color: getStatusColor('closed') }}>
              {stats.closed}
            </div>
            <div className="stat-label">Closed</div>
          </div>
        </div>
      </div>

      <div className="restaurants-grid">
        {restaurants.length === 0 ? (
          <div className="empty-state">
            <p>No restaurants found. Create your first restaurant to get started!</p>
            <button className="btn-primary" onClick={handleCreateRestaurant}>
              Create Restaurant
            </button>
          </div>
        ) : (
          restaurants.map(restaurant => (
            <RestaurantCard
              key={restaurant.id}
              restaurant={restaurant}
              onEdit={() => handleEditRestaurant(restaurant)}
              onDelete={() => handleDeleteRestaurant(restaurant.id)}
              onViewDetails={handleViewDetails}
            />
          ))
        )}
      </div>

      {showModal && (
        <RestaurantModal
          restaurant={selectedRestaurant}
          onClose={() => setShowModal(false)}
          onSave={handleSaveRestaurant}
        />
      )}
    </div>
  );
};

export default RestaurantDashboard;
