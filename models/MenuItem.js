const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');

const MenuItem = sequelize.define('MenuItem', {
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
  description: {
    type: DataTypes.TEXT
  },
  category: {
    type: DataTypes.ENUM('appetizer', 'main_course', 'side', 'dessert', 'drink', 'special'),
    allowNull: false
  },
  price: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false
  },
  currency: {
    type: DataTypes.STRING,
    defaultValue: 'XAF'
  },
  photos: {
    type: DataTypes.ARRAY(DataTypes.TEXT),
    defaultValue: []
  },
  preparationTime: {
    type: DataTypes.INTEGER,
    comment: 'Time in minutes'
  },
  servingSize: {
    type: DataTypes.STRING
  },
  isAvailable: {
    type: DataTypes.BOOLEAN,
    defaultValue: true
  },
  isPopular: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  },
  dietaryInfo: {
    type: DataTypes.JSONB,
    defaultValue: {},
    comment: 'vegetarian, vegan, glutenFree, allergens, etc.'
  },
  nutritionalInfo: {
    type: DataTypes.JSONB,
    defaultValue: {},
    comment: 'calories, protein, carbs, fat, etc.'
  },
  spicyLevel: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
    comment: '0-5 scale'
  },
  status: {
    type: DataTypes.ENUM('active', 'seasonal', 'discontinued'),
    defaultValue: 'active'
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
  tableName: 'menu_items',
  underscored: true,  timestamps: true
});

module.exports = MenuItem;
