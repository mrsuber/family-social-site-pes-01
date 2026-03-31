const { DataTypes, Model } = require('sequelize');
const { sequelize } = require('../config/db');

class IslamicAssignment extends Model {}

IslamicAssignment.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    lessonId: {
      type: DataTypes.UUID,
      allowNull: false,
      field: 'lesson_id',
      references: {
        model: 'islamic_lessons',
        key: 'id'
      },
      comment: 'Lesson this assignment belongs to'
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      comment: 'Assignment title'
    },
    type: {
      type: DataTypes.STRING,
      allowNull: false,
      comment: 'reading, writing, reflection, memorization, research, practical'
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
      comment: 'Detailed instructions for the assignment'
    },
    completionCriteria: {
      type: DataTypes.TEXT,
      allowNull: true,
      field: 'completion_criteria',
      comment: 'How to know when this assignment is complete'
    },
    estimatedMinutes: {
      type: DataTypes.INTEGER,
      allowNull: true,
      field: 'estimated_minutes',
      comment: 'Estimated time to complete this assignment'
    },
    orderNumber: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
      field: 'order_number',
      comment: 'Display order within lesson'
    },
    submissionRequired: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
      field: 'submission_required',
      comment: 'Whether this assignment requires submission for review'
    }
  },
  {
    sequelize,
    modelName: 'IslamicAssignment',
    tableName: 'islamic_assignments',
    timestamps: true,
    underscored: true
  }
);

module.exports = IslamicAssignment;
