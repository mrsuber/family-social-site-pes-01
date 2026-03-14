const { DataTypes, Model } = require('sequelize');
const { sequelize } = require('../config/db');

class Family extends Model {}

Family.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    familyMemberId: {
      type: DataTypes.UUID,
      allowNull: true,
      field: 'family_member_id',
      references: {
        model: 'users',
        key: 'id'
      }
    },
    familyName: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      defaultValue: []
    }
  },
  {
    sequelize,
    modelName: 'Family',
    tableName: 'families',
    timestamps: true
  }
);

module.exports = Family;
