const InventoryItem = require('../models/InventoryItem');
const Restaurant = require('../models/Restaurant');
const Supplier = require('../models/Supplier');

const inventoryCtrl = {
  // Get all inventory items for a restaurant
  getInventoryItems: async (req, res) => {
    try {
      const { restaurantId } = req.params;

      const items = await InventoryItem.findAll({
        where: { restaurantId },
        order: [['createdAt', 'DESC']]
      });

      res.json({
        success: true,
        data: items
      });
    } catch (error) {
      console.error('Error fetching inventory items:', error);
      res.status(500).json({
        success: false,
        message: error.message
      });
    }
  },

  // Get single inventory item by ID
  getInventoryItem: async (req, res) => {
    try {
      const { id } = req.params;
      const item = await InventoryItem.findByPk(id);

      if (!item) {
        return res.status(404).json({
          success: false,
          message: 'Inventory item not found'
        });
      }

      res.json({
        success: true,
        data: item
      });
    } catch (error) {
      console.error('Error fetching inventory item:', error);
      res.status(500).json({
        success: false,
        message: error.message
      });
    }
  },

  // Get low stock items for a restaurant
  getLowStockItems: async (req, res) => {
    try {
      const { restaurantId } = req.params;
      const { Sequelize } = require('sequelize');

      const items = await InventoryItem.findAll({
        where: {
          restaurantId,
          [Sequelize.Op.or]: [
            { status: 'low_stock' },
            { status: 'out_of_stock' },
            {
              [Sequelize.Op.and]: [
                Sequelize.where(
                  Sequelize.col('current_stock'),
                  '<=',
                  Sequelize.col('minimum_stock')
                )
              ]
            }
          ]
        },
        order: [['currentStock', 'ASC']]
      });

      res.json({
        success: true,
        data: items
      });
    } catch (error) {
      console.error('Error fetching low stock items:', error);
      res.status(500).json({
        success: false,
        message: error.message
      });
    }
  },

  // Create new inventory item
  createInventoryItem: async (req, res) => {
    try {
      const itemData = req.body;

      // Validate required fields
      if (!itemData.restaurantId || !itemData.name || !itemData.category || !itemData.unit) {
        return res.status(400).json({
          success: false,
          message: 'Restaurant ID, name, category, and unit are required'
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

      // Verify supplier exists if provided
      if (itemData.supplierId) {
        const supplier = await Supplier.findByPk(itemData.supplierId);
        if (!supplier) {
          return res.status(404).json({
            success: false,
            message: 'Supplier not found'
          });
        }
      }

      // Auto-set status based on stock levels
      if (itemData.currentStock !== undefined && itemData.minimumStock !== undefined) {
        if (itemData.currentStock <= 0) {
          itemData.status = 'out_of_stock';
        } else if (itemData.currentStock <= itemData.minimumStock) {
          itemData.status = 'low_stock';
        } else {
          itemData.status = 'in_stock';
        }
      }

      const item = await InventoryItem.create(itemData);

      res.status(201).json({
        success: true,
        data: item,
        message: 'Inventory item created successfully'
      });
    } catch (error) {
      console.error('Error creating inventory item:', error);
      res.status(500).json({
        success: false,
        message: error.message
      });
    }
  },

  // Update inventory item
  updateInventoryItem: async (req, res) => {
    try {
      const { id } = req.params;
      const updates = req.body;

      const item = await InventoryItem.findByPk(id);

      if (!item) {
        return res.status(404).json({
          success: false,
          message: 'Inventory item not found'
        });
      }

      // Verify supplier exists if being updated
      if (updates.supplierId && updates.supplierId !== item.supplierId) {
        const supplier = await Supplier.findByPk(updates.supplierId);
        if (!supplier) {
          return res.status(404).json({
            success: false,
            message: 'Supplier not found'
          });
        }
      }

      // Auto-update status based on stock levels
      const currentStock = updates.currentStock !== undefined ? updates.currentStock : item.currentStock;
      const minimumStock = updates.minimumStock !== undefined ? updates.minimumStock : item.minimumStock;

      if (currentStock <= 0) {
        updates.status = 'out_of_stock';
      } else if (currentStock <= minimumStock) {
        updates.status = 'low_stock';
      } else {
        updates.status = 'in_stock';
      }

      await item.update(updates);

      res.json({
        success: true,
        data: item,
        message: 'Inventory item updated successfully'
      });
    } catch (error) {
      console.error('Error updating inventory item:', error);
      res.status(500).json({
        success: false,
        message: error.message
      });
    }
  },

  // Update stock quantity (for restocking or usage)
  updateStock: async (req, res) => {
    try {
      const { id } = req.params;
      const { quantity, action } = req.body; // action: 'add' or 'subtract'

      if (!quantity || !action) {
        return res.status(400).json({
          success: false,
          message: 'Quantity and action (add/subtract) are required'
        });
      }

      const item = await InventoryItem.findByPk(id);

      if (!item) {
        return res.status(404).json({
          success: false,
          message: 'Inventory item not found'
        });
      }

      let newStock = parseFloat(item.currentStock);

      if (action === 'add') {
        newStock += parseFloat(quantity);
      } else if (action === 'subtract') {
        newStock -= parseFloat(quantity);
        if (newStock < 0) newStock = 0;
      } else {
        return res.status(400).json({
          success: false,
          message: 'Action must be either "add" or "subtract"'
        });
      }

      // Auto-update status based on new stock level
      let status = 'in_stock';
      if (newStock <= 0) {
        status = 'out_of_stock';
      } else if (newStock <= item.minimumStock) {
        status = 'low_stock';
      }

      const updates = {
        currentStock: newStock,
        status: status
      };

      // Update lastRestocked if adding stock
      if (action === 'add') {
        updates.lastRestocked = new Date();
      }

      await item.update(updates);

      res.json({
        success: true,
        data: item,
        message: `Stock ${action === 'add' ? 'added' : 'subtracted'} successfully`
      });
    } catch (error) {
      console.error('Error updating stock:', error);
      res.status(500).json({
        success: false,
        message: error.message
      });
    }
  },

  // Delete inventory item
  deleteInventoryItem: async (req, res) => {
    try {
      const { id } = req.params;

      const item = await InventoryItem.findByPk(id);

      if (!item) {
        return res.status(404).json({
          success: false,
          message: 'Inventory item not found'
        });
      }

      await item.destroy();

      res.json({
        success: true,
        message: 'Inventory item deleted successfully'
      });
    } catch (error) {
      console.error('Error deleting inventory item:', error);
      res.status(500).json({
        success: false,
        message: error.message
      });
    }
  }
};

module.exports = inventoryCtrl;
