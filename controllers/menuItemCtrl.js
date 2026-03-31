const MenuItem = require('../models/MenuItem');
const Restaurant = require('../models/Restaurant');

const menuItemCtrl = {
  // Get all menu items for a restaurant
  getMenuItems: async (req, res) => {
    try {
      const { restaurantId } = req.params;

      const items = await MenuItem.findAll({
        where: { restaurantId },
        order: [['category', 'ASC'], ['name', 'ASC']]
      });

      res.json({
        success: true,
        data: items
      });
    } catch (error) {
      console.error('Error fetching menu items:', error);
      res.status(500).json({
        success: false,
        message: error.message
      });
    }
  },

  // Get menu items by category
  getMenuItemsByCategory: async (req, res) => {
    try {
      const { restaurantId, category } = req.params;

      const items = await MenuItem.findAll({
        where: {
          restaurantId,
          category
        },
        order: [['name', 'ASC']]
      });

      res.json({
        success: true,
        data: items
      });
    } catch (error) {
      console.error('Error fetching menu items by category:', error);
      res.status(500).json({
        success: false,
        message: error.message
      });
    }
  },

  // Get available menu items (for POS)
  getAvailableMenuItems: async (req, res) => {
    try {
      const { restaurantId } = req.params;

      const items = await MenuItem.findAll({
        where: {
          restaurantId,
          isAvailable: true,
          status: 'active'
        },
        order: [['category', 'ASC'], ['name', 'ASC']]
      });

      res.json({
        success: true,
        data: items
      });
    } catch (error) {
      console.error('Error fetching available menu items:', error);
      res.status(500).json({
        success: false,
        message: error.message
      });
    }
  },

  // Get popular menu items
  getPopularMenuItems: async (req, res) => {
    try {
      const { restaurantId } = req.params;

      const items = await MenuItem.findAll({
        where: {
          restaurantId,
          isPopular: true,
          isAvailable: true
        },
        order: [['name', 'ASC']]
      });

      res.json({
        success: true,
        data: items
      });
    } catch (error) {
      console.error('Error fetching popular menu items:', error);
      res.status(500).json({
        success: false,
        message: error.message
      });
    }
  },

  // Get single menu item by ID
  getMenuItem: async (req, res) => {
    try {
      const { id } = req.params;
      const item = await MenuItem.findByPk(id);

      if (!item) {
        return res.status(404).json({
          success: false,
          message: 'Menu item not found'
        });
      }

      res.json({
        success: true,
        data: item
      });
    } catch (error) {
      console.error('Error fetching menu item:', error);
      res.status(500).json({
        success: false,
        message: error.message
      });
    }
  },

  // Create new menu item
  createMenuItem: async (req, res) => {
    try {
      const itemData = req.body;

      // Validate required fields
      if (!itemData.restaurantId || !itemData.name || !itemData.category || !itemData.price) {
        return res.status(400).json({
          success: false,
          message: 'Restaurant ID, name, category, and price are required'
        });
      }

      // Verify restaurant exists
      const restaurant = await Restaurant.findByPk(itemData.restaurantId);
      if (!restaurant) {
        return res.status(404).json({
          success: false,
          message: 'Restaurant not found'
        });
      }

      // Validate price
      if (parseFloat(itemData.price) <= 0) {
        return res.status(400).json({
          success: false,
          message: 'Price must be greater than 0'
        });
      }

      const item = await MenuItem.create(itemData);

      res.status(201).json({
        success: true,
        data: item,
        message: 'Menu item created successfully'
      });
    } catch (error) {
      console.error('Error creating menu item:', error);
      res.status(500).json({
        success: false,
        message: error.message
      });
    }
  },

  // Update menu item
  updateMenuItem: async (req, res) => {
    try {
      const { id } = req.params;
      const updates = req.body;

      const item = await MenuItem.findByPk(id);

      if (!item) {
        return res.status(404).json({
          success: false,
          message: 'Menu item not found'
        });
      }

      // Validate price if being updated
      if (updates.price !== undefined && parseFloat(updates.price) <= 0) {
        return res.status(400).json({
          success: false,
          message: 'Price must be greater than 0'
        });
      }

      await item.update(updates);

      res.json({
        success: true,
        data: item,
        message: 'Menu item updated successfully'
      });
    } catch (error) {
      console.error('Error updating menu item:', error);
      res.status(500).json({
        success: false,
        message: error.message
      });
    }
  },

  // Toggle availability of menu item
  toggleAvailability: async (req, res) => {
    try {
      const { id } = req.params;

      const item = await MenuItem.findByPk(id);

      if (!item) {
        return res.status(404).json({
          success: false,
          message: 'Menu item not found'
        });
      }

      await item.update({
        isAvailable: !item.isAvailable
      });

      res.json({
        success: true,
        data: item,
        message: `Menu item ${item.isAvailable ? 'marked as available' : 'marked as unavailable'}`
      });
    } catch (error) {
      console.error('Error toggling availability:', error);
      res.status(500).json({
        success: false,
        message: error.message
      });
    }
  },

  // Delete menu item
  deleteMenuItem: async (req, res) => {
    try {
      const { id } = req.params;

      const item = await MenuItem.findByPk(id);

      if (!item) {
        return res.status(404).json({
          success: false,
          message: 'Menu item not found'
        });
      }

      await item.destroy();

      res.json({
        success: true,
        message: 'Menu item deleted successfully'
      });
    } catch (error) {
      console.error('Error deleting menu item:', error);
      res.status(500).json({
        success: false,
        message: error.message
      });
    }
  }
};

module.exports = menuItemCtrl;
