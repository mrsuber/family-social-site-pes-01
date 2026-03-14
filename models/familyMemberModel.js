const { DataTypes, Model } = require('sequelize');
const { sequelize } = require('../config/db');

class FamilyMember extends Model {}

FamilyMember.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    familyName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    familyHead: {
      type: DataTypes.STRING,
      allowNull: false
    },
    familyMemberId: {
      type: DataTypes.UUID,
      allowNull: true,
      field: 'family_member_id',
      references: {
        model: 'users',
        key: 'id'
      }
    }
  },
  {
    sequelize,
    modelName: 'FamilyMember',
    tableName: 'family_members',
    timestamps: true
  }
);

module.exports = FamilyMember;
