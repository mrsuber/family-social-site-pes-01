const { DataTypes, Model } = require('sequelize');
const { sequelize } = require('../config/db');

class Education extends Model {}

Education.init(
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
    degree: {
      type: DataTypes.STRING,
      allowNull: false,
      comment: 'Degree or certificate name'
    },
    institution: {
      type: DataTypes.STRING,
      allowNull: false,
      comment: 'School or institution name'
    },
    yearObtained: {
      type: DataTypes.INTEGER,
      allowNull: true,
      field: 'year_obtained'
    },
    grade: {
      type: DataTypes.STRING,
      allowNull: true,
      comment: 'GPA, grade, or honors'
    },
    certificateUrl: {
      type: DataTypes.TEXT,
      allowNull: true,
      field: 'certificate_url'
    }
  },
  {
    sequelize,
    modelName: 'Education',
    tableName: 'education',
    timestamps: true
  }
);

module.exports = Education;
