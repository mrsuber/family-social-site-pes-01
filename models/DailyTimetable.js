const { DataTypes, Model } = require('sequelize');
const { sequelize } = require('../config/db');

class DailyTimetable extends Model {}

DailyTimetable.init(
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
      comment: 'The person this timetable belongs to (High Commander)'
    },
    date: {
      type: DataTypes.DATEONLY,
      allowNull: false,
      comment: 'The date for this timetable (YYYY-MM-DD)'
    },
    dayType: {
      type: DataTypes.STRING,
      allowNull: false,
      field: 'day_type',
      comment: 'weekday or weekend',
      defaultValue: 'weekday'
    },
    timeBlocks: {
      type: DataTypes.JSONB,
      allowNull: false,
      field: 'time_blocks',
      defaultValue: [],
      comment: 'Array of time blocks with status, notes, etc.'
    },
    overallCompletion: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
      field: 'overall_completion',
      comment: 'Percentage of blocks completed (0-100)'
    },
    adherenceScore: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
      field: 'adherence_score',
      comment: 'How well did you stick to the schedule (0-100)'
    },
    energyLevel: {
      type: DataTypes.INTEGER,
      defaultValue: 3,
      field: 'energy_level',
      comment: 'Energy level for the day (1-5)'
    },
    accomplishments: {
      type: DataTypes.TEXT,
      allowNull: true,
      comment: 'What I accomplished today'
    },
    challenges: {
      type: DataTypes.TEXT,
      allowNull: true,
      comment: 'Challenges faced today'
    },
    tomorrowPriority: {
      type: DataTypes.TEXT,
      allowNull: true,
      field: 'tomorrow_priority',
      comment: 'Priority for tomorrow'
    },
    notes: {
      type: DataTypes.TEXT,
      allowNull: true,
      comment: 'Additional notes for the day'
    },
    isCompleted: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
      field: 'is_completed',
      comment: 'Whether this day is fully completed and reviewed'
    }
  },
  {
    sequelize,
    modelName: 'DailyTimetable',
    tableName: 'daily_timetables',
    timestamps: true,
    indexes: [
      {
        fields: ['person_id', 'date'],
        unique: true
      },
      {
        fields: ['date']
      },
      {
        fields: ['person_id']
      }
    ]
  }
);

module.exports = DailyTimetable;
