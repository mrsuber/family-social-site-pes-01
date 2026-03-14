const { DataTypes, Model } = require('sequelize');
const { sequelize } = require('../config/db');

class Experience extends Model {}

Experience.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    personId: {
      type: DataTypes.UUID,
      allowNull: false,
      field: 'person_id',
      references: {
        model: 'people',
        key: 'id'
      }
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      comment: 'Job title'
    },
    organization: {
      type: DataTypes.STRING,
      allowNull: false,
      comment: 'Company or organization name'
    },
    location: {
      type: DataTypes.STRING,
      allowNull: true
    },
    startDate: {
      type: DataTypes.DATE,
      allowNull: false,
      field: 'start_date'
    },
    endDate: {
      type: DataTypes.DATE,
      allowNull: true,
      field: 'end_date',
      comment: 'Null if current position'
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
      comment: 'Work description and achievements'
    },
    areaOfExpertise: {
      type: DataTypes.STRING,
      allowNull: true,
      field: 'area_of_expertise'
    }
  },
  {
    sequelize,
    modelName: 'Experience',
    tableName: 'experiences',
    timestamps: true
  }
);

module.exports = Experience;
