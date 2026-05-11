const { DataTypes, Model } = require('sequelize');
const { sequelize } = require('../config/db');

class GlobalAsset extends Model {}

GlobalAsset.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      comment: 'Name of the asset/location (e.g., Nigerian Textile Supplier, USA Machinery Dealer)'
    },
    type: {
      type: DataTypes.STRING,
      allowNull: false,
      comment: 'supplier, manufacturer, equipment, investor, market, logistics, facility, other'
    },
    country: {
      type: DataTypes.STRING,
      allowNull: false,
      comment: 'Country where this asset is located'
    },
    city: {
      type: DataTypes.STRING,
      allowNull: false,
      comment: 'City where this asset is located'
    },
    latitude: {
      type: DataTypes.DECIMAL(10, 7),
      allowNull: false,
      comment: 'Latitude coordinate for map positioning'
    },
    longitude: {
      type: DataTypes.DECIMAL(10, 7),
      allowNull: false,
      comment: 'Longitude coordinate for map positioning'
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
      comment: 'What you will source/do at this location'
    },
    contact: {
      type: DataTypes.STRING,
      allowNull: true,
      comment: 'Contact info (email, phone, key person)'
    },
    notes: {
      type: DataTypes.TEXT,
      allowNull: true,
      comment: 'Strategic notes and planning information'
    },
    status: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: 'potential',
      comment: 'potential, contacted, negotiating, active, completed, inactive'
    },
    userId: {
      type: DataTypes.UUID,
      allowNull: false,
      field: 'user_id',
      references: {
        model: 'users',
        key: 'id'
      },
      comment: 'Which user created this global asset marker'
    },
    generalId: {
      type: DataTypes.UUID,
      allowNull: true,
      field: 'general_id',
      references: {
        model: 'generals',
        key: 'id'
      },
      comment: 'Optionally associate with a general/division'
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
      field: 'created_at'
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
      field: 'updated_at'
    }
  },
  {
    sequelize,
    modelName: 'GlobalAsset',
    tableName: 'global_assets',
    timestamps: true,
    underscored: true,
    indexes: [
      {
        fields: ['user_id']
      },
      {
        fields: ['type']
      },
      {
        fields: ['status']
      },
      {
        fields: ['country']
      }
    ]
  }
);

module.exports = GlobalAsset;
