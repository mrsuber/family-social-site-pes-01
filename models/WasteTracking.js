const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');

const WasteTracking = sequelize.define('WasteTracking', {
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
  inventoryItemId: {
    type: DataTypes.UUID,
    references: {
      model: 'inventory_items',
      key: 'id'
    }
  },
  quantity: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false
  },
  unit: {
    type: DataTypes.STRING,
    allowNull: false
  },
  reason: {
    type: DataTypes.ENUM('spoilage', 'over_prep', 'customer_return', 'damaged', 'expired', 'other'),
    allowNull: false
  },
  cost: {
    type: DataTypes.DECIMAL(10, 2),
    defaultValue: 0
  },
  date: {
    type: DataTypes.DATE,
    allowNull: false
  },
  reportedBy: {
    type: DataTypes.UUID,
    references: {
      model: 'people',
      key: 'id'
    }
  },
  notes: {
    type: DataTypes.TEXT
  },
  createdAt: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  }
}, {
  tableName: 'waste_tracking',
  timestamps: false,
  createdAt: true,
  updatedAt: false
});

module.exports = WasteTracking;
