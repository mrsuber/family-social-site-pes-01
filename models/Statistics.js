const { DataTypes, Model } = require('sequelize');
const { sequelize } = require('../config/db');

class Statistics extends Model {}

Statistics.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    }
  },
  {
    sequelize,
    modelName: 'Statistics',
    tableName: 'statistics',
    timestamps: true
  }
);

module.exports = Statistics;
