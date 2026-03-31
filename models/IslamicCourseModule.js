const { DataTypes, Model } = require('sequelize');
const { sequelize } = require('../config/db');

class IslamicCourseModule extends Model {}

IslamicCourseModule.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    departmentId: {
      type: DataTypes.UUID,
      allowNull: false,
      field: 'department_id',
      references: {
        model: 'departments',
        key: 'id'
      },
      comment: 'Department (e.g., Introduction & Foundation, Quranic Studies)'
    },
    objectiveTitle: {
      type: DataTypes.STRING,
      allowNull: false,
      field: 'objective_title',
      comment: 'Title from department objectives array'
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
      comment: 'Overview of what this module covers'
    },
    orderNumber: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
      field: 'order_number',
      comment: 'Display order within department'
    },
    status: {
      type: DataTypes.STRING,
      defaultValue: 'draft',
      comment: 'draft, published, archived'
    },
    estimatedHours: {
      type: DataTypes.INTEGER,
      allowNull: true,
      field: 'estimated_hours',
      comment: 'Estimated time to complete this module'
    }
  },
  {
    sequelize,
    modelName: 'IslamicCourseModule',
    tableName: 'islamic_course_modules',
    timestamps: true,
    underscored: true
  }
);

module.exports = IslamicCourseModule;
