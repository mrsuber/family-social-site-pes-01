const { DataTypes, Model } = require('sequelize');
const { sequelize } = require('../config/db');

class CommanderCalendar extends Model {}

CommanderCalendar.init(
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
    title: {
      type: DataTypes.STRING,
      allowNull: false
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    eventType: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: 'task',
      field: 'event_type',
      comment: 'task, appointment, meeting, deadline, reminder'
    },
    startDate: {
      type: DataTypes.DATE,
      allowNull: false,
      field: 'start_date'
    },
    endDate: {
      type: DataTypes.DATE,
      allowNull: true,
      field: 'end_date'
    },
    allDay: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
      field: 'all_day'
    },
    priority: {
      type: DataTypes.STRING,
      defaultValue: 'medium',
      comment: 'low, medium, high, critical'
    },
    status: {
      type: DataTypes.STRING,
      defaultValue: 'pending',
      comment: 'pending, in-progress, completed, cancelled'
    },
    location: {
      type: DataTypes.STRING,
      allowNull: true
    },
    attendees: {
      type: DataTypes.JSONB,
      defaultValue: [],
      comment: 'Array of person IDs'
    },
    reminders: {
      type: DataTypes.JSONB,
      defaultValue: [],
      comment: 'Array of reminder settings'
    },
    tags: {
      type: DataTypes.JSONB,
      defaultValue: []
    }
  },
  {
    sequelize,
    modelName: 'CommanderCalendar',
    tableName: 'commander_calendar',
    timestamps: true,
    underscored: true
  }
);

module.exports = CommanderCalendar;
