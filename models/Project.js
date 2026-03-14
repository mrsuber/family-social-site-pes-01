const { DataTypes, Model } = require('sequelize');
const { sequelize } = require('../config/db');

class Project extends Model {}

Project.init(
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
    generalId: {
      type: DataTypes.UUID,
      allowNull: false,
      field: 'general_id',
      references: {
        model: 'generals',
        key: 'id'
      }
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    status: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: 'planning',
      comment: 'planning, active, on-hold, completed, cancelled'
    },
    priority: {
      type: DataTypes.STRING,
      defaultValue: 'medium',
      comment: 'low, medium, high, critical'
    },
    startDate: {
      type: DataTypes.DATE,
      allowNull: true,
      field: 'start_date'
    },
    endDate: {
      type: DataTypes.DATE,
      allowNull: true,
      field: 'end_date'
    },
    budget: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: true
    },
    currency: {
      type: DataTypes.STRING,
      defaultValue: 'USD'
    },
    completionPercentage: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
      field: 'completion_percentage',
      validate: {
        min: 0,
        max: 100
      }
    },
    objectives: {
      type: DataTypes.JSONB,
      defaultValue: [],
      comment: 'Array of project objectives'
    }
  },
  {
    sequelize,
    modelName: 'Project',
    tableName: 'projects',
    timestamps: true
  }
);

module.exports = Project;
