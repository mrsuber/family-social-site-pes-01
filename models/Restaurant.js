const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');

const Restaurant = sequelize.define('Restaurant', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  location: {
    type: DataTypes.STRING
  },
  address: {
    type: DataTypes.TEXT
  },
  phone: {
    type: DataTypes.STRING
  },
  email: {
    type: DataTypes.STRING
  },
  capacity: {
    type: DataTypes.INTEGER,
    comment: 'Number of seats'
  },
  operatingHours: {
    type: DataTypes.JSONB,
    defaultValue: {},
    comment: 'JSON object with opening hours per day'
  },
  status: {
    type: DataTypes.ENUM('active', 'planning', 'closed'),
    defaultValue: 'planning'
  },
  managerId: {
    type: DataTypes.UUID,
    references: {
      model: 'people',
      key: 'id'
    }
  },
  departmentId: {
    type: DataTypes.UUID,
    references: {
      model: 'departments',
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
  tableName: 'restaurants',
  underscored: true,  timestamps: true
});

module.exports = Restaurant;
