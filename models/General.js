const { DataTypes, Model } = require('sequelize');
const { sequelize } = require('../config/db');

class General extends Model {}

General.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      comment: 'SuberCraftex, Government & Finance, Farm, Research & Development'
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    commanderId: {
      type: DataTypes.UUID,
      allowNull: true,
      field: 'commander_id',
      comment: 'Person who leads this general'
    },
    objectives: {
      type: DataTypes.JSONB,
      defaultValue: [],
      comment: '5 objectives the general must achieve'
    },
    status: {
      type: DataTypes.STRING,
      defaultValue: 'active',
      comment: 'active, planning, operational'
    },
    orderNumber: {
      type: DataTypes.INTEGER,
      allowNull: false,
      comment: '1-4 for the 4 generals'
    }
  },
  {
    sequelize,
    modelName: 'General',
    tableName: 'generals',
    timestamps: true
  }
);

module.exports = General;
