const { DataTypes, Model } = require('sequelize');
const { sequelize } = require('../config/db');

class ComputerEngineering extends Model {}

ComputerEngineering.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
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
    TotalNumberOfBranches: {
      type: DataTypes.STRING,
      allowNull: true
    },
    TotalNumberCompleted: {
      type: DataTypes.STRING,
      allowNull: true
    },
    LessonTittle: {
      type: DataTypes.JSONB,
      defaultValue: []
    },
    companyHeadOfficeLocation: {
      type: DataTypes.STRING,
      allowNull: true
    },
    companyLevel1: {
      type: DataTypes.JSONB,
      defaultValue: []
    },
    source: {
      type: DataTypes.JSONB,
      defaultValue: []
    },
    people: {
      type: DataTypes.JSONB,
      defaultValue: []
    }
  },
  {
    sequelize,
    modelName: 'ComputerEngineering',
    tableName: 'computer_engineering',
    timestamps: true
  }
);

module.exports = ComputerEngineering;
