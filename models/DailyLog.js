const { DataTypes, Model } = require('sequelize');
const { sequelize } = require('../config/db');

class DailyLog extends Model {}

DailyLog.init(
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
    date: {
      type: DataTypes.DATEONLY,
      allowNull: false,
      unique: true
    },
    totalIncome: {
      type: DataTypes.DECIMAL(10, 2),
      defaultValue: 0,
      field: 'total_income'
    },
    totalExpenses: {
      type: DataTypes.DECIMAL(10, 2),
      defaultValue: 0,
      field: 'total_expenses'
    },
    netCashFlow: {
      type: DataTypes.DECIMAL(10, 2),
      defaultValue: 0,
      field: 'net_cash_flow'
    },
    hoursSubercraftex: {
      type: DataTypes.DECIMAL(4, 2),
      defaultValue: 0,
      field: 'hours_subercraftex'
    },
    hoursSideJobs: {
      type: DataTypes.DECIMAL(4, 2),
      defaultValue: 0,
      field: 'hours_side_jobs'
    },
    hoursLearning: {
      type: DataTypes.DECIMAL(4, 2),
      defaultValue: 0,
      field: 'hours_learning'
    },
    mood: {
      type: DataTypes.ENUM('excellent', 'good', 'neutral', 'low', 'terrible'),
      defaultValue: 'neutral'
    },
    wins: {
      type: DataTypes.ARRAY(DataTypes.TEXT),
      defaultValue: []
    },
    challenges: {
      type: DataTypes.ARRAY(DataTypes.TEXT),
      defaultValue: []
    },
    notes: {
      type: DataTypes.TEXT,
      allowNull: true
    }
  },
  {
    sequelize,
    modelName: 'DailyLog',
    tableName: 'daily_logs',
    timestamps: true,
    indexes: [
      {
        unique: true,
        fields: ['date']
      },
      {
        unique: true,
        fields: ['person_id', 'date']
      }
    ]
  }
);

module.exports = DailyLog;
