const { DataTypes, Model } = require('sequelize');
const { sequelize } = require('../config/db');

class Department extends Model {}

Department.init(
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
    description: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    generalId: {
      type: DataTypes.UUID,
      allowNull: true,
      field: 'general_id',
      references: {
        model: 'generals',
        key: 'id'
      }
    },
    projectId: {
      type: DataTypes.UUID,
      allowNull: true,
      field: 'project_id',
      references: {
        model: 'projects',
        key: 'id'
      }
    },
    parentDepartmentId: {
      type: DataTypes.UUID,
      allowNull: true,
      field: 'parent_department_id',
      references: {
        model: 'departments',
        key: 'id'
      },
      comment: 'For hierarchical department structure - parent department ID'
    },
    orderNumber: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
      field: 'order_number'
    },
    status: {
      type: DataTypes.STRING,
      defaultValue: 'active',
      comment: 'active, inactive, restructuring'
    },
    objectives: {
      type: DataTypes.JSONB,
      defaultValue: [],
      comment: 'Array of department objectives'
    }
  },
  {
    sequelize,
    modelName: 'Department',
    tableName: 'departments',
    timestamps: true,
    underscored: true
  }
);

module.exports = Department;
