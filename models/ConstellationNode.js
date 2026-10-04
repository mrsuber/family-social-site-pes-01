const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const ConstellationNode = sequelize.define('ConstellationNode', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  type: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: 'Company',
  },
  sub: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  c: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: 'green',
    comment: 'Health color: red, amber, green, gray, blue'
  },
  r: {
    type: DataTypes.FLOAT,
    allowNull: false,
    defaultValue: 0.45,
    comment: 'Sphere radius'
  },
  p: {
    type: DataTypes.JSON,
    allowNull: false,
    comment: 'Position [x, y, z]'
  },
  connectTo: {
    type: DataTypes.STRING,
    allowNull: false,
    comment: 'ID of node to connect to'
  },
  connectToName: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  flowType: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: 'money',
    comment: 'money, time, people, tech, integration, future'
  },
  note: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  custom: {
    type: DataTypes.BOOLEAN,
    defaultValue: true,
  },
  userId: {
    type: DataTypes.STRING,
    allowNull: false,
  }
}, {
  tableName: 'constellation_nodes',
  timestamps: true,
});

module.exports = ConstellationNode;
