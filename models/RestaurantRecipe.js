const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');

const RestaurantRecipe = sequelize.define('RestaurantRecipe', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },
  menuItemId: {
    type: DataTypes.UUID,
    allowNull: false,
    references: {
      model: 'menu_items',
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
  title: {
    type: DataTypes.STRING,
    allowNull: false
  },
  description: {
    type: DataTypes.TEXT
  },
  servings: {
    type: DataTypes.INTEGER,
    defaultValue: 1
  },
  prepTime: {
    type: DataTypes.INTEGER,
    comment: 'Minutes'
  },
  cookTime: {
    type: DataTypes.INTEGER,
    comment: 'Minutes'
  },
  totalTime: {
    type: DataTypes.INTEGER,
    comment: 'Minutes'
  },
  difficulty: {
    type: DataTypes.ENUM('easy', 'medium', 'hard'),
    defaultValue: 'medium'
  },
  ingredients: {
    type: DataTypes.JSONB,
    defaultValue: [],
    comment: 'Array of {inventoryItemId, quantity, unit, notes}'
  },
  instructions: {
    type: DataTypes.JSONB,
    defaultValue: [],
    comment: 'Array of {step, instruction, duration, image}'
  },
  equipment: {
    type: DataTypes.ARRAY(DataTypes.STRING),
    defaultValue: []
  },
  tips: {
    type: DataTypes.TEXT
  },
  costPerServing: {
    type: DataTypes.DECIMAL(10, 2),
    defaultValue: 0,
    comment: 'Auto-calculated from ingredients'
  },
  profitMargin: {
    type: DataTypes.DECIMAL(5, 2),
    defaultValue: 0,
    comment: 'Percentage'
  },
  photos: {
    type: DataTypes.ARRAY(DataTypes.TEXT),
    defaultValue: []
  },
  videos: {
    type: DataTypes.ARRAY(DataTypes.TEXT),
    defaultValue: []
  },
  createdBy: {
    type: DataTypes.UUID,
    references: {
      model: 'people',
      key: 'id'
    }
  },
  lastTested: {
    type: DataTypes.DATE
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
  tableName: 'restaurant_recipes',
  timestamps: true
});

module.exports = RestaurantRecipe;
