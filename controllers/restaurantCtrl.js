const Restaurant = require('../models/Restaurant');
const Department = require('../models/Department');
const Person = require('../models/Person');

const restaurantCtrl = {
  // Get all restaurants
  getRestaurants: async (req, res) => {
    try {
      const restaurants = await Restaurant.findAll({
        order: [['createdAt', 'DESC']]
      });

      res.json({
        success: true,
        data: restaurants
      });
    } catch (error) {
      console.error('Error fetching restaurants:', error);
      res.status(500).json({
        success: false,
        message: error.message
      });
    }
  },

  // Get single restaurant by ID
  getRestaurant: async (req, res) => {
    try {
      const { id } = req.params;
      const restaurant = await Restaurant.findByPk(id);

      if (!restaurant) {
        return res.status(404).json({
          success: false,
          message: 'Restaurant not found'
        });
      }

      res.json({
        success: true,
        data: restaurant
      });
    } catch (error) {
      console.error('Error fetching restaurant:', error);
      res.status(500).json({
        success: false,
        message: error.message
      });
    }
  },

  // Create new restaurant
  createRestaurant: async (req, res) => {
    try {
      const restaurantData = req.body;

      // Validate required fields
      if (!restaurantData.name) {
        return res.status(400).json({
          success: false,
          message: 'Restaurant name is required'
        });
      }

      // Verify department exists if provided
      if (restaurantData.departmentId) {
        const department = await Department.findByPk(restaurantData.departmentId);
        if (!department) {
          return res.status(404).json({
            success: false,
            message: 'Department not found'
          });
        }
      }

      // Verify manager exists if provided
      if (restaurantData.managerId) {
        const manager = await Person.findByPk(restaurantData.managerId);
        if (!manager) {
          return res.status(404).json({
            success: false,
            message: 'Manager not found'
          });
        }
      }

      const restaurant = await Restaurant.create(restaurantData);

      res.status(201).json({
        success: true,
        data: restaurant,
        message: 'Restaurant created successfully'
      });
    } catch (error) {
      console.error('Error creating restaurant:', error);
      res.status(500).json({
        success: false,
        message: error.message
      });
    }
  },

  // Update restaurant
  updateRestaurant: async (req, res) => {
    try {
      const { id } = req.params;
      const updates = req.body;

      const restaurant = await Restaurant.findByPk(id);

      if (!restaurant) {
        return res.status(404).json({
          success: false,
          message: 'Restaurant not found'
        });
      }

      // Verify department exists if being updated
      if (updates.departmentId && updates.departmentId !== restaurant.departmentId) {
        const department = await Department.findByPk(updates.departmentId);
        if (!department) {
          return res.status(404).json({
            success: false,
            message: 'Department not found'
          });
        }
      }

      // Verify manager exists if being updated
      if (updates.managerId && updates.managerId !== restaurant.managerId) {
        const manager = await Person.findByPk(updates.managerId);
        if (!manager) {
          return res.status(404).json({
            success: false,
            message: 'Manager not found'
          });
        }
      }

      await restaurant.update(updates);

      res.json({
        success: true,
        data: restaurant,
        message: 'Restaurant updated successfully'
      });
    } catch (error) {
      console.error('Error updating restaurant:', error);
      res.status(500).json({
        success: false,
        message: error.message
      });
    }
  },

  // Delete restaurant
  deleteRestaurant: async (req, res) => {
    try {
      const { id } = req.params;

      const restaurant = await Restaurant.findByPk(id);

      if (!restaurant) {
        return res.status(404).json({
          success: false,
          message: 'Restaurant not found'
        });
      }

      await restaurant.destroy();

      res.json({
        success: true,
        message: 'Restaurant deleted successfully'
      });
    } catch (error) {
      console.error('Error deleting restaurant:', error);
      res.status(500).json({
        success: false,
        message: error.message
      });
    }
  }
};

module.exports = restaurantCtrl;
