const { DataTypes, Model } = require('sequelize');
const { sequelize } = require('../config/db');

class WeeklyPlan extends Model {}

WeeklyPlan.init(
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
      comment: 'Person this weekly plan belongs to'
    },
    weekStartDate: {
      type: DataTypes.DATEONLY,
      allowNull: false,
      field: 'week_start_date',
      comment: 'Monday of this week'
    },
    mustDoSurvival: {
      type: DataTypes.ARRAY(DataTypes.JSONB),
      allowNull: true,
      field: 'must_do_survival',
      defaultValue: [],
      comment: 'Must-do survival tasks'
    },
    shouldDoGrowth: {
      type: DataTypes.ARRAY(DataTypes.JSONB),
      allowNull: true,
      field: 'should_do_growth',
      defaultValue: [],
      comment: 'Should-do growth tasks'
    },
    wantDoVision: {
      type: DataTypes.ARRAY(DataTypes.JSONB),
      allowNull: true,
      field: 'want_do_vision',
      defaultValue: [],
      comment: 'Want-do vision tasks'
    },
    incomeTarget: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: true,
      field: 'income_target',
      comment: 'Target income for the week'
    },
    actualIncome: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: true,
      field: 'actual_income',
      defaultValue: 0,
      comment: 'Actual income earned'
    },
    completionRate: {
      type: DataTypes.INTEGER,
      allowNull: true,
      field: 'completion_rate',
      defaultValue: 0,
      comment: 'Completion rate percentage (0-100)'
    },
    notes: {
      type: DataTypes.TEXT,
      allowNull: true,
      comment: 'Additional notes'
    }
  },
  {
    sequelize,
    modelName: 'WeeklyPlan',
    tableName: 'weekly_plans',
    timestamps: true,
    indexes: [
      {
        fields: ['week_start_date']
      },
      {
        fields: ['person_id']
      }
    ]
  }
);

module.exports = WeeklyPlan;
