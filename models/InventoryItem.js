const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');

const InventoryItem = sequelize.define('InventoryItem', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },
  restaurantId: {
    type: DataTypes.UUID,
    allowNull: false,
    references: {
      model: 'restaurants',
      key: 'id'
    }
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  category: {
    type: DataTypes.ENUM('dry_goods', 'proteins', 'produce', 'liquids', 'spices', 'dairy', 'other'),
    allowNull: false
  },
  currentStock: {
    type: DataTypes.DECIMAL(10, 2),
    defaultValue: 0
  },
  unit: {
    type: DataTypes.STRING,
    allowNull: false,
    comment: 'kg, liters, grams, units, etc.'
  },
  minimumStock: {
    type: DataTypes.DECIMAL(10, 2),
    defaultValue: 0,
    comment: 'Reorder point'
  },
  costPerUnit: {
    type: DataTypes.DECIMAL(10, 2),
    defaultValue: 0
  },
  supplierId: {
    type: DataTypes.UUID,
    references: {
      model: 'suppliers',
      key: 'id'
    }
  },
  expirationDate: {
    type: DataTypes.DATE,
    allowNull: true
  },
  storageLocation: {
    type: DataTypes.STRING,
    comment: 'Dry Storage, Walk-in Fridge, Freezer, etc.'
  },
  lastRestocked: {
    type: DataTypes.DATE
  },
  status: {
    type: DataTypes.ENUM('in_stock', 'low_stock', 'out_of_stock'),
    defaultValue: 'in_stock'
  },
  createdAt: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  },
  updatedAt: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  }
}, {
  tableName: 'inventory_items',
  underscored: true,  timestamps: true
});

module.exports = InventoryItem;
