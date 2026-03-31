const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');

const Supplier = sequelize.define('Supplier', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  contactPerson: {
    type: DataTypes.STRING
  },
  phone: {
    type: DataTypes.STRING
  },
  email: {
    type: DataTypes.STRING
  },
  address: {
    type: DataTypes.TEXT
  },
  productsSupplied: {
    type: DataTypes.ARRAY(DataTypes.STRING),
    defaultValue: []
  },
  paymentTerms: {
    type: DataTypes.STRING
  },
  deliverySchedule: {
    type: DataTypes.STRING
  },
  rating: {
    type: DataTypes.DECIMAL(2, 1),
    defaultValue: 0,
    comment: '1-5 rating based on reliability'
  },
  status: {
    type: DataTypes.ENUM('active', 'inactive'),
    defaultValue: 'active'
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
  tableName: 'suppliers',
  underscored: true,  timestamps: true
});

module.exports = Supplier;
