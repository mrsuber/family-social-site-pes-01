const { DataTypes, Model } = require('sequelize');
const { sequelize } = require('../config/db');

class ReligiousStudies extends Model {}

ReligiousStudies.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    }
  },
  {
    sequelize,
    modelName: 'ReligiousStudies',
    tableName: 'religious_studies',
    timestamps: true
  }
);

module.exports = ReligiousStudies;
