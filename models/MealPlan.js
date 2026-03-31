const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const MealPlan = sequelize.define('MealPlan', {
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
  startDate: {
    type: DataTypes.DATE,
    allowNull: false
  },
  endDate: {
    type: DataTypes.DATE,
    allowNull: false
  },
  schedule: {
    type: DataTypes.JSONB,
    defaultValue: {},
    comment: 'Daily schedule with meal times and menu items'
  },
  plannedQuantities: {
    type: DataTypes.JSONB,
    defaultValue: {},
    comment: 'Expected quantities for each menu item'
  },
  specialEvents: {
    type: DataTypes.JSONB,
    defaultValue: [],
    comment: 'Array of special events during this period'
  },
  prepSchedule: {
    type: DataTypes.JSONB,
    defaultValue: {},
    comment: 'What to prep in advance'
  },
  status: {
    type: DataTypes.ENUM('draft', 'active', 'completed'),
    defaultValue: 'draft'
  },
  notes: {
    type: DataTypes.TEXT
  },
  createdBy: {
    type: DataTypes.UUID,
    references: {
      model: 'people',
      key: 'id'
    }
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
  tableName: 'meal_plans',
  timestamps: true
});

module.exports = MealPlan;
