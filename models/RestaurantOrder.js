const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');

const RestaurantOrder = sequelize.define('RestaurantOrder', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },
  orderNumber: {
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
  orderType: {
    type: DataTypes.ENUM('dine_in', 'takeout', 'delivery'),
    allowNull: false
  },
  tableNumber: {
    type: DataTypes.STRING
  },
  customerId: {
    type: DataTypes.UUID,
    references: {
      model: 'people',
      key: 'id'
    }
  },
  items: {
    type: DataTypes.JSONB,
    defaultValue: [],
    comment: 'Array of {menuItemId, quantity, specialInstructions, price}'
  },
  subtotal: {
    type: DataTypes.DECIMAL(10, 2),
    defaultValue: 0
  },
  tax: {
    type: DataTypes.DECIMAL(10, 2),
    defaultValue: 0
  },
  total: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false
  },
  paymentMethod: {
    type: DataTypes.ENUM('cash', 'card', 'mobile_money', 'account'),
    defaultValue: 'cash'
  },
  paymentStatus: {
    type: DataTypes.ENUM('pending', 'paid', 'refunded'),
    defaultValue: 'pending'
  },
  orderStatus: {
    type: DataTypes.ENUM('received', 'preparing', 'ready', 'served', 'completed', 'cancelled'),
    defaultValue: 'received'
  },
  servedBy: {
    type: DataTypes.UUID,
    references: {
      model: 'people',
      key: 'id'
    }
  },
  preparedBy: {
    type: DataTypes.UUID,
    references: {
      model: 'people',
      key: 'id'
    }
  },
  orderedAt: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  },
  preparedAt: {
    type: DataTypes.DATE
  },
  servedAt: {
    type: DataTypes.DATE
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
  tableName: 'restaurant_orders',
  underscored: true,  timestamps: true
});

module.exports = RestaurantOrder;
