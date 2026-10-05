const { DataTypes, Model } = require('sequelize');
const { sequelize } = require('../config/db');

class LearningInvestment extends Model {}

LearningInvestment.init(
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
      },
      comment: 'Person making this learning investment'
    },
    skillName: {
      type: DataTypes.STRING(255),
      allowNull: false,
      field: 'skill_name',
      comment: 'Name of the skill being learned'
    },
    resourceType: {
      type: DataTypes.ENUM('course', 'book', 'workshop', 'tutorial', 'certification', 'mentorship', 'other'),
      defaultValue: 'course',
      field: 'resource_type',
      comment: 'Type of learning resource'
    },
    resourceName: {
      type: DataTypes.STRING(255),
      allowNull: false,
      field: 'resource_name',
      comment: 'Name of the resource (course name, book title, etc.)'
    },
    moneyCost: {
      type: DataTypes.DECIMAL(10, 2),
      defaultValue: 0,
      field: 'money_cost',
      comment: 'Money invested in XAF'
    },
    timeInvested: {
      type: DataTypes.DECIMAL(10, 2),
      defaultValue: 0,
      field: 'time_invested',
      comment: 'Hours invested in learning'
    },
    startDate: {
      type: DataTypes.DATEONLY,
      allowNull: false,
      field: 'start_date',
      comment: 'When started learning'
    },
    completionDate: {
      type: DataTypes.DATEONLY,
      allowNull: true,
      field: 'completion_date',
      comment: 'When completed (if applicable)'
    },
    proficiencyBefore: {
      type: DataTypes.INTEGER,
      defaultValue: 1,
      field: 'proficiency_before',
      comment: 'Proficiency level before (1-10)'
    },
    proficiencyAfter: {
      type: DataTypes.INTEGER,
      allowNull: true,
      field: 'proficiency_after',
      comment: 'Proficiency level after (1-10)'
    },
    roi: {
      type: DataTypes.TEXT,
      allowNull: true,
      comment: 'Return on investment notes'
    },
    notes: {
      type: DataTypes.TEXT,
      allowNull: true,
      comment: 'Additional notes'
    }
  },
  {
    sequelize,
    modelName: 'LearningInvestment',
    tableName: 'learning_investments',
    timestamps: true,
    indexes: [
      {
        fields: ['person_id']
      },
      {
        fields: ['start_date']
      }
    ]
  }
);

module.exports = LearningInvestment;
