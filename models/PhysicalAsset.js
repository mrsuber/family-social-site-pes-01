const { DataTypes, Model } = require('sequelize');
const { sequelize } = require('../config/db');

class PhysicalAsset extends Model {}

PhysicalAsset.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    assetType: {
      type: DataTypes.STRING,
      allowNull: false,
      field: 'asset_type',
      comment: 'car, computer, machine, equipment, tool, etc.'
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      comment: 'Asset name or model'
    },
    serialNumber: {
      type: DataTypes.STRING,
      allowNull: true,
      unique: true,
      field: 'serial_number'
    },
    assignedTo: {
      type: DataTypes.UUID,
      allowNull: true,
      field: 'assigned_to',
      references: {
        model: 'people',
        key: 'id'
      },
      comment: 'Person currently using this asset'
    },
    generalId: {
      type: DataTypes.UUID,
      allowNull: true,
      field: 'general_id',
      references: {
        model: 'generals',
        key: 'id'
      },
      comment: 'Which general owns this asset'
    },
    status: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: 'working',
      comment: 'working, maintenance, broken, decommissioned'
    },
    purchaseDate: {
      type: DataTypes.DATE,
      allowNull: true,
      field: 'purchase_date'
    },
    purchaseCost: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: true,
      field: 'purchase_cost'
    },
    currency: {
      type: DataTypes.STRING,
      defaultValue: 'USD',
      comment: 'USD, EUR, XAF, etc.'
    },
    lastMaintenanceDate: {
      type: DataTypes.DATE,
      allowNull: true,
      field: 'last_maintenance_date'
    },
    nextMaintenanceDate: {
      type: DataTypes.DATE,
      allowNull: true,
      field: 'next_maintenance_date',
      comment: 'For predictive maintenance'
    },
    location: {
      type: DataTypes.STRING,
      allowNull: true,
      comment: 'Physical location of asset'
    },
    condition: {
      type: DataTypes.INTEGER,
      defaultValue: 100,
      comment: '0-100 condition rating',
      validate: {
        min: 0,
        max: 100
      }
    },
    notes: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    specifications: {
      type: DataTypes.JSONB,
      defaultValue: {},
      comment: 'Technical specs as JSON'
    }
  },
  {
    sequelize,
    modelName: 'PhysicalAsset',
    tableName: 'physical_assets',
    timestamps: true,
    indexes: [
      {
        fields: ['asset_type']
      },
      {
        fields: ['assigned_to']
      },
      {
        fields: ['status']
      }
    ]
  }
);

module.exports = PhysicalAsset;
