const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const PurchaseOrder = sequelize.define('PurchaseOrder', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },
  poNumber: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false
  },
  restaurantId: {
    type: DataTypes.UUID,
    allowNull: false,
    references: {
      model: 'restaurants',
      key: 'id'
    }
  },
  supplierId: {
    type: DataTypes.UUID,
    allowNull: false,
    references: {
      model: 'suppliers',
      key: 'id'
    }
  },
  items: {
    type: DataTypes.JSONB,
    defaultValue: [],
    comment: 'Array of {inventoryItemId, quantity, unit, unitPrice, total}'
  },
  subtotal: {
    type: DataTypes.DECIMAL(10, 2),
    defaultValue: 0
  },
  total: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false
  },
  currency: {
    type: DataTypes.STRING,
    defaultValue: 'XAF'
  },
  orderDate: {
    type: DataTypes.DATE,
    allowNull: false
  },
  expectedDeliveryDate: {
    type: DataTypes.DATE
  },
  actualDeliveryDate: {
    type: DataTypes.DATE
  },
  status: {
    type: DataTypes.ENUM('draft', 'sent', 'confirmed', 'delivered', 'cancelled'),
    defaultValue: 'draft'
  },
  orderedBy: {
    type: DataTypes.UUID,
    references: {
      model: 'people',
      key: 'id'
    }
  },
  receivedBy: {
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
  },
  updatedAt: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  }
}, {
  tableName: 'purchase_orders',
  timestamps: true
});

module.exports = PurchaseOrder;
