const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');

const CustomerFeedback = sequelize.define('CustomerFeedback', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },
  orderId: {
    type: DataTypes.UUID,
    references: {
      model: 'restaurant_orders',
      key: 'id'
    }
  },
  restaurantId: {
    type: DataTypes.UUID,
    allowNull: false,
    references: {
      model: 'restaurants',
      key: 'id'
    }
  },
  menuItemId: {
    type: DataTypes.UUID,
    references: {
      model: 'menu_items',
      key: 'id'
    }
  },
  rating: {
    type: DataTypes.INTEGER,
    allowNull: false,
    comment: '1-5 stars'
  },
  foodQuality: {
    type: DataTypes.INTEGER,
    comment: '1-5 rating'
  },
  serviceQuality: {
    type: DataTypes.INTEGER,
    comment: '1-5 rating'
  },
  ambience: {
    type: DataTypes.INTEGER,
    comment: '1-5 rating'
  },
  valueForMoney: {
    type: DataTypes.INTEGER,
    comment: '1-5 rating'
  },
  comment: {
    type: DataTypes.TEXT
  },
  photos: {
    type: DataTypes.ARRAY(DataTypes.TEXT),
    defaultValue: []
  },
  wouldRecommend: {
    type: DataTypes.BOOLEAN,
    defaultValue: true
  },
  customerId: {
    type: DataTypes.UUID,
    references: {
      model: 'people',
      key: 'id'
    }
  },
  createdAt: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  }
}, {
  tableName: 'customer_feedback',
  timestamps: false,
  createdAt: true,
  updatedAt: false
});

module.exports = CustomerFeedback;
