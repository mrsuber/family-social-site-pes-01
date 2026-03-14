const { DataTypes, Model } = require('sequelize');
const { sequelize } = require('../config/db');

class School extends Model {}

School.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    learningTitle: {
      type: DataTypes.STRING,
      allowNull: false
    },
    logo: {
      type: DataTypes.STRING,
      defaultValue: 'https://github.com/mrsuber/family-social-site-pes-01/blob/master/client/src/images/suber_logo1.png?raw=true'
    },
    path: {
      type: DataTypes.STRING,
      allowNull: false
    },
    about: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    MainLocation: {
      type: DataTypes.STRING,
      allowNull: true
    },
    TotalNumberOfBranches: {
      type: DataTypes.STRING,
      allowNull: true
    },
    OtherLocations: {
      type: DataTypes.JSONB,
      defaultValue: []
    },
    JobPost: {
      type: DataTypes.JSONB,
      defaultValue: []
    },
    JobPostSources: {
      type: DataTypes.JSONB,
      defaultValue: []
    },
    courseLink: {
      type: DataTypes.STRING,
      allowNull: true
    }
  },
  {
    sequelize,
    modelName: 'School',
    tableName: 'schools',
    timestamps: true
  }
);

module.exports = School;
