const { DataTypes, Model } = require('sequelize');
const { sequelize } = require('../config/db');

class CompanyDescription extends Model {}

CompanyDescription.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    userId: {
      type: DataTypes.UUID,
      allowNull: true,
      field: 'user_id',
      references: {
        model: 'users',
        key: 'id'
      }
    },
    companyName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    logo: {
      type: DataTypes.STRING,
      allowNull: true
    },
    about: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    aboutSource: {
      type: DataTypes.JSONB,
      defaultValue: []
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
    LocationSources: {
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
    Employee: {
      type: DataTypes.JSONB,
      defaultValue: []
    },
    EmployeeType: {
      type: DataTypes.STRING,
      allowNull: true
    },
    EmployeeSource: {
      type: DataTypes.JSONB,
      defaultValue: []
    },
    Revenue: {
      type: DataTypes.JSONB,
      defaultValue: []
    },
    RevenueType: {
      type: DataTypes.STRING,
      allowNull: true
    },
    RevenueSource: {
      type: DataTypes.JSONB,
      defaultValue: []
    },
    Departments: {
      type: DataTypes.JSONB,
      defaultValue: []
    },
    DepartmentSource: {
      type: DataTypes.JSONB,
      defaultValue: []
    }
  },
  {
    sequelize,
    modelName: 'CompanyDescription',
    tableName: 'company_descriptions',
    timestamps: true
  }
);

module.exports = CompanyDescription;
